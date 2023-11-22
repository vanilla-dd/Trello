import { prisma } from '$lib/server/db';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Role } from '@prisma/client';

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = await locals.getSession();
	const boardId = params.boardId;
	const isBoardMember = await prisma.boardMembership.findFirst({
		where: {
			userId: user?.user.id,
			boardId: params.boardId,
			role: { in: ['Owner', 'Coworker', 'Watcher'] }
		},
		select: { Board: { select: { isPublic: true } } }
	});
	console.log(isBoardMember);
	if (!isBoardMember && !isBoardMember?.Board?.isPublic) {
		throw redirect(305, '/hele');
	}
	const boardData = await prisma.board.findFirst({
		where: { id: boardId },
		select: { isPublic: true, title: true, members: true, users: true }
	});
	const lists = await prisma.list.findMany({
		where: { boardId: params.boardId },
		include: { cards: { orderBy: { position: 'asc' } } }
	});
	return {
		lists,
		boardData
	};
};
export const actions: Actions = {
	addMember: async ({ request, url, locals }) => {
		const user = await locals.getSession();
		const data = Object.fromEntries(await request.formData());
		const id = data.id as string;
		const role = data.role as Role;
		console.log(url.pathname.split('/')[2]);
		// const existingMembership = await prisma.boardMembership.findUnique({
		//     where: { userId_boardId: { userId: userId, boardId: boardId } },
		// });
		const existingMembership = await prisma.boardMembership.findUnique({
			where: {
				userId: user?.user?.id,
				boardId: url.pathname.split('/')[2],
				userId_boardId: {
					userId: user?.user?.id,
					boardId: url.pathname.split('/')[2]
				}
			}
		});
		if (existingMembership?.role !== 'Owner') {
			console.error('User is not the owner of the board or membership does not exist.');
			return;
		}
		const alreadyMember = await prisma.boardMembership.findFirst({
			where: { userId: id }
		});

		if (alreadyMember) {
			console.log('Already a member; if you want to change the role, go to settings.');
			return;
		}
		await prisma.boardMembership.create({
			data: {
				userId: id,
				boardId: url.pathname.split('/')[2],
				role // or any other role you want to assign
			}
		});
	},
	createList: async ({ request, locals, url }) => {
		const user = await locals.getSession();
		const data = Object.fromEntries(await request.formData());
		const listName = data.listName as string;
		console.log(url.pathname.split('/')[2]);
		const isBoardMember = await prisma.boardMembership.findFirst({
			where: {
				userId: user?.user.id,
				boardId: url.pathname.split('/')[2],
				role: { in: ['Owner', 'Coworker'] }
			}
		});
		if (!isBoardMember) {
			console.log('nada');
			return;
		}
		await prisma.list.create({
			data: { title: listName, boardId: url.pathname.split('/')[2] }
		});
	},
	createCard: async ({ request, locals, url }) => {
		const user = await locals.getSession();
		const data = Object.fromEntries(await request.formData());
		const listId = data.listId as string;
		const boardId = data.boardId as string;
		const isBoardMember = await prisma.boardMembership.findFirst({
			where: {
				userId: user?.user.id,
				boardId: url.pathname.split('/')[2],
				role: { in: ['Owner', 'Coworker'] }
			}
		});
		if (!isBoardMember) {
			console.log('nada');
			return;
		}
		await prisma.card.create({
			data: {
				title: 'Task 1',
				content: 'Complete task by EOD',
				list: {
					connect: {
						id: listId, // Replace with the actual list ID
						boardId: boardId
					}
				},
				attachments: {
					create: [
						{
							filename: 'attachment1.img',
							url: 'https://trello-omega-clone/logo.png'
						}
						// Add other attachments as needed
					]
				}
				// ... other card fields
			},
			include: {
				attachments: true
			}
		});
	}
};
