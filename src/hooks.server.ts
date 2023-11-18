import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '$lib/server/db';
export const handle = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
});
