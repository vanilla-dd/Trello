// Error handling
import { stripe } from '$lib/server/stripe';
import type Stripe from 'stripe';
import { upsertProductRecord } from '$lib/server/upsertProductsRecord';
import { upsertProductPrice } from '$lib/server/upsertProductPrices';
import { updateCustomerSubscription } from '$lib/server/updateUserSubscription';
import type { RequestHandler } from '@sveltejs/kit';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';

const webhookSecret = STRIPE_WEBHOOK_SECRET;
export const POST: RequestHandler = async ({ request }) => {
	const payload = await request.text();
	const signature = request.headers.get('Stripe-Signature') ?? '';
	try {
		if (!signature || !webhookSecret) throw new Error('no sig');
		const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
		switch (event.type) {
			case 'product.created':
			case 'product.updated':
				await upsertProductRecord(event.data.object as Stripe.Product);
				break;
			case 'price.created':
			case 'price.updated':
				await upsertProductPrice(event.data.object as Stripe.Price);
				break;
			case 'customer.subscription.created':
			case 'customer.subscription.updated':
			case 'customer.subscription.deleted':
				await updateCustomerSubscription(
					event.data.object.id,
					event.data.object.customer as string,
					event.data.object.metadata?.userId
				);
				break;
			case 'checkout.session.completed':
				if (event.data.object.mode === 'subscription') {
					await updateCustomerSubscription(
						typeof event.data.object.subscription === 'string'
							? event.data.object.subscription
							: event.data.object.subscription?.id || '',
						typeof event.data.object.customer === 'string'
							? event.data.object.customer
							: event.data.object.customer?.id || '',
						event.data.object.metadata?.userId || ''
					);
				}
				break;
			default:
				console.log('We cannot handle that request');
		}
	} catch (error: unknown) {
		const message = `webhook error: ${error instanceof Error ? error.message : ''}`;
		return new Response(message, { status: 401 });
	}

	return new Response('recevied', { status: 200 });
};
