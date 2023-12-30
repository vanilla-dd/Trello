// Errorsss handling
import { prisma } from '$lib/server/db';
import { stripe } from '$lib/server/stripe';
import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const priceId = data.priceId as string;
		const user = await locals.getSession();
		if (!user?.user?.id) {
			return;
		}
		if (!priceId) return;
		const orgSubscription = await prisma.userSubscription.findUnique({
			where: {
				userId: user.user.id
			}
		});
		if (orgSubscription?.status === 'active' && orgSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: orgSubscription.stripeCustomerId,
				return_url: 'http://localhost:5173'
			});
			if (stripeSession.url) throw redirect(301, stripeSession.url);
		}

		const checkout = await stripe.checkout.sessions.create({
			mode: 'subscription',
			line_items: [
				{
					price: priceId,
					quantity: 1
				}
			],
			customer_email: user?.user?.email ?? '',
			success_url: 'https://trello-clone-omege/sucess.vercel.app?session_id={CHECKOUT_SESSION_ID}',
			cancel_url: 'https://trello-clone-omege/cancel.vercel.app',
			metadata: { userId: user.user?.id }
		});
		if (!checkout.url) return;
		throw redirect(301, checkout.url);
	}
};
