// TODO : Better Error Handling & req sending

import { prisma } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';
export const PATCH: RequestHandler = async ({ locals, request }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		return json('Plea In', { status: 401 });
	}
	const body: {
		item: {
			id: string;
			listId: string;
			index: number;
		};
	} = await request.json();
	// GIVES ERROR WILL SOLVE SOON
	// if (!body || !body.item || !body.index) {
	// 	return json('Ple In', { status: 404 });
	// }
	const boardId = await prisma.card.findFirst({
		where: {
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
	console.log(boardId, body.item);
	const updateData = async (cardId: string, listId: string, index: number) => {
		await prisma.card.update({
			where: { id: cardId },
			data: {
				listId,
				position: index + 1
			}
		});
	};
	updateData(body.item.id, body.item.listId, body.item.index);

	return json('ok', { status: 200 });
};
