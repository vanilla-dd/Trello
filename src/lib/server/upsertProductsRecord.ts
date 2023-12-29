import type Stripe from 'stripe';
import { prisma } from './db';

export const upsertProductRecord = async (product: Stripe.Product) => {
	await prisma.allSubscription.upsert({
		create: {
			id: product.id,
			active: product.active,
			description: product.description ?? null,
			image: product.images[0] ?? null,
			name: product.name,
			metadata: product.metadata
		},
		update: {
			id: product.id,
			active: product.active,
			description: product.description ?? null,
			image: product.images[0] ?? null,
			name: product.name,
			metadata: product.metadata
		},
		where: { id: product.id }
	});
};
