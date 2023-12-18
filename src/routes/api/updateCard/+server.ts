import { prisma } from '$lib/server/db';
import type { Card } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';
export const POST: RequestHandler = async ({ locals, request }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		return json('Plea In', { status: 401 });
	}
	const body: { item: Card; index: number } = await request.json();
	// GIVES ERROR WILL SOLVE SOON
	// if (!body || !body.item || !body.index) {
	// 	return json('Ple In', { status: 404 });
	// }
	const boardId = await prisma.card.findFirst({
		where: {
			listId: body.item.listId,
			id: body.item.id
		},
		include: { list: true }
	});
	if (!boardId?.list.boardId) {
		return json('no board id Log In', { status: 404 });
	}
	const isBoardMember = await prisma.boardMembership.findFirst({
		where: {
			userId: user?.user.id,
			boardId: boardId.list.boardId,
			role: { in: ['Owner', 'Coworker'] }
		}
	});
	if (!isBoardMember) {
		console.log('nada');
		return json('Please n', { status: 404 });
	}
	console.log(body.index + 1);
	const updateData = async (item: Card, index: number) => {
		await prisma.card.update({
			where: { id: item.id, listId: item.listId },
			data: {
				position: index + 1
			}
		});
	};
	updateData(body.item, body.index);

	return json('ok', { status: 200 });
};
