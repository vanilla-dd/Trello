import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/server/db';
import { sequence } from '@sveltejs/kit/hooks';
import { redirect, type Handle } from '@sveltejs/kit';

const redirectIfLoggedIn: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname === '/') {
		const session = await event.locals.getSession();
		if (session) {
			throw redirect(303, '/board');
		}
	}
	return resolve(event);
};
const redirectIfNotLoggedIn: Handle = async ({ event, resolve }) => {
	// Protect any routes under /authenticated
	if (event.url.pathname.includes('/board')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/');
		}
	}
	return resolve(event);
};
export const handle: Handle = sequence(
	SvelteKitAuth({
		adapter: PrismaAdapter(prisma),
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })],
		pages: {
			error: '/error'
		},
		callbacks: {
			async session({ session, user }) {
				session.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image
				};
				return session;
			}
		}
	}),
	redirectIfLoggedIn,
	redirectIfNotLoggedIn
);
