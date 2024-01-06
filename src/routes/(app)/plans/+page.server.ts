// TODO: Errorsss handling
import { prisma } from '$lib/server/db';
import { stripe } from '$lib/server/stripe';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		// TODO: Redirect to login page
		throw redirect(307, '/');
	}
	const getAllPlans = async () =>
		await prisma.allSubscriptionPrices.findMany({
			where: { active: true },
			select: {
				active: true,
				currency: true,
				id: true,
				type: true,
				unit_amount: true
			}
		});
	const getUserData = await prisma.userSubscription.findUnique({
		where: {
			userId: user.user?.id
		},
		select: {
			cancelOnExpire: true,
			status: true,
			canceledAt: true,
			cancelAt: true,
			createdAt: true,
			endedAt: true,
			metadata: true,
			quantity: true,
			stripeCurrentPeriodEnd: true,
			stripeCurrentPeriodstart: true,
			type: true,
			stripeCustomerId: true
		}
	});
	return {
		allPlans: getAllPlans(),
		userData: getUserData
	};
};
export const actions: Actions = {
	default: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());
		const priceId = data.priceId as string;
		const user = await locals.getSession();
		if (!user?.user?.id) {
			return;
		}
		const orgSubscription = await prisma.userSubscription.findUnique({
			where: {
				userId: user.user.id
			}
		});
		if (orgSubscription?.status === 'active' && orgSubscription.stripeCustomerId) {
			const stripeSession = await stripe.billingPortal.sessions.create({
				customer: orgSubscription.stripeCustomerId,
				return_url: 'https://trello-omega-clone.vercel.app/plans'
			});
			if (stripeSession.url) throw redirect(301, stripeSession.url);
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
