// Error handling
import type Stripe from 'stripe';
import { prisma } from './db';

export const upsertProductPrice = async (price: Stripe.Price) => {
	await prisma.allSubscriptionPrices.upsert({
		create: {
			id: price.id,
			product: { connect: { id: typeof price.product === 'string' ? price.product : '' } },
			active: price.active,
			description: price.nickname,
			metadata: price.metadata,
			currency: price.currency,
			type: price.type,
			unit_amount: price.unit_amount,
			interval: price.recurring?.interval,
			interval_count: price.recurring?.interval_count
		},
		update: {
			id: price.id,
			product: { connect: { id: typeof price.product === 'string' ? price.product : '' } },
			active: price.active,
			description: price.nickname,
			metadata: price.metadata,
			currency: price.currency,
			type: price.type,
			unit_amount: price.unit_amount,
			interval: price.recurring?.interval,
			interval_count: price.recurring?.interval_count
		},
		where: { id: price.id }
	});
};
