import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { stripe } from '$lib/server/stripe';
import { json, type RequestHandler } from '@sveltejs/kit';
import type Stripe from 'stripe';
import { upsertProductRecord } from '$lib/server/upsertProductsRecord';

const webhookSecret = 'whsec_f6c95e08203bcb2457a409fdbae660137ffc9b06f3ca58ed47153e721065f2c1';
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
			default:
				console.log('We cannot handle that request');
		}
	} catch (error: unknown) {
		const message = `webhook error: ${
			error instanceof Error ? error.message : ''
		},${webhookSecret},${payload},${signature}`;
		return new Response(message, { status: 401 });
	}

	return json({ recevied: true });
};
