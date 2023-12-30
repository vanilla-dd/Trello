// Errorsss handling
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
