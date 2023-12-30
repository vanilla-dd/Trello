// Error handling
import { prisma } from './db';
import { stripe } from './stripe';
import { epochToISO } from '$lib/constant/timesInMs';

export const updateCustomerSubscription = async (
	subscriptionId: string,
	customerId: string,
	userId: string
) => {
	const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
		expand: ['default_payment_method']
	});
	if (!userId) {
		const userData = await prisma.userSubscription.findFirst({
			where: { stripeCustomerId: customerId },
			select: { userId: true }
		});
		if (!userData?.userId) return;
		userId = userData?.userId;
	}

	await prisma.userSubscription.upsert({
		where: { userId },
		create: {
			stripeSubscriptionId: subscription.id,
			userId,
			stripeCustomerId: customerId,
			metadata: subscription.metadata,
			status: subscription.status,
			stripePriceId: subscription.items.data[0].price.id,
			cancelOnExpire: subscription.cancel_at_period_end,
			stripeCurrentPeriodstart: epochToISO(subscription.current_period_start),
			stripeCurrentPeriodEnd: epochToISO(subscription.current_period_end),
			cancelAt: subscription.cancel_at ? epochToISO(subscription.cancel_at) : null,
			canceledAt: subscription.canceled_at ? epochToISO(subscription.canceled_at) : null,
			createdAt: epochToISO(subscription.created),
			endedAt: subscription.ended_at ? epochToISO(subscription.ended_at) : null
		},
		update: {
			stripeSubscriptionId: subscription.id,
			userId,
			stripeCustomerId: customerId,
			metadata: subscription.metadata,
			status: subscription.status,
			stripePriceId: subscription.items.data[0].price.id,
			cancelOnExpire: subscription.cancel_at_period_end,
			stripeCurrentPeriodstart: epochToISO(subscription.current_period_start),
			stripeCurrentPeriodEnd: epochToISO(subscription.current_period_end),
			cancelAt: subscription.cancel_at ? epochToISO(subscription.cancel_at) : null,
			canceledAt: subscription.canceled_at ? epochToISO(subscription.canceled_at) : null,
			createdAt: epochToISO(subscription.created),
			endedAt: subscription.ended_at ? epochToISO(subscription.ended_at) : null
		}
	});
};
