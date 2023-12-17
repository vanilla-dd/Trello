import { prisma } from '$lib/server/db';
import type { List } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';
export const PATCH: RequestHandler = async ({ locals, request }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		return json('Please Log In', { status: 401 });
	}
	const body = await request.json();
	console.log(body.item.title, body.index);
	const updateData = async (item: List, index: number) => {
		await prisma.list.update({
			where: { id: item.id, boardId: item.boardId },
			data: {
				position: index + 1
			}
		});
		console.log('hi');
	};
	// updateData(body.item, body.index);

	return json('ok', { status: 200 });
};
