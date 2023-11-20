import { prisma } from '$lib/server/db';
import type { Actions } from '@sveltejs/kit';
export const actions: Actions = {
	create: async ({ request }) => {
		const data = Object.fromEntries(await request.formData());
		const title = data.boardName as string;
		const visi = data.visiblity === 'private' ? false : true;
		await prisma.board.create({ data: { title: title, isPublic: visi } });
		console.log(data);
	}
};
