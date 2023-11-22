import { prisma } from '$lib/server/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getSession();
	const allBoards = await prisma.board.findMany({
		where: { members: { every: { userId: user?.user?.id } } }
	});
	return { allBoards };
};
export const actions: Actions = {
	create: async ({ request, locals }) => {
		const user = await locals.getSession();
		const data = Object.fromEntries(await request.formData());
		const title = data.boardName as string;
		const visi = data.visiblity === 'private' ? false : true;
		if (user?.user) {
			const createdBoard = await prisma.board.create({
				data: {
					title: title,
					isPublic: visi,
					members: { create: [{ userId: user?.user?.id, role: 'Owner' }] }
				}
			});
			console.log(createdBoard);
			throw redirect(307, `/board/${createdBoard.id}`);
		}
	}
};
