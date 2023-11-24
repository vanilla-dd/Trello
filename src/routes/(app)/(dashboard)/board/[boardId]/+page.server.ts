import { prisma } from '$lib/server/db';
import { fail, type Actions } from '@sveltejs/kit';
import type { Role } from '@prisma/client';
import type { PageServerLoad } from './$types';
import { listCreateSchema } from '$lib/schema/formValidators';
import { superValidate } from 'sveltekit-superforms/server';

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = await locals.getSession();
	const boardId = params.boardId;
	if (!user?.user) {
		return;
	}
	const isBoardMember = await prisma.boardMembership.findUnique({
		where: {
			userId_boardId: {
				userId: user?.user.id,
				boardId: params.boardId
			}
		},
		select: {
			role: true,
			userId: true,
			boardId: true
		}
	});

	// If the user is not in the board and the board is private, throw an error
	// if (!isBoardMember || !isBoardMember?.Board?.isPublic) {
	// console.error('Unauthorized access to private board');
	// throw new Error('Unauthorized access to private board');
	// }

	const boardDataWithLists = await prisma.board.findFirst({
		where: { id: boardId },
		include: {
			lists: {
				include: { cards: { orderBy: { position: 'asc' } } }
			},
			members: {
				select: {
					userId: true,
					role: true,
					user: { select: { id: true, name: true, email: true } }
				}
			}
		}
	});

	// Access board data, lists, and members directly from the result
	const boardData = boardDataWithLists;
	const lists = boardDataWithLists?.lists || [];
	// const members = boardDataWithLists?.members || [];
	return {
		isBoardMember,
		lists,
		boardData,
		form: superValidate(listCreateSchema)
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
		if (!user?.user) {
			return;
		}
		const existingMembership = await prisma.boardMembership.findUnique({
			where: {
				userId_boardId: {
					userId: user?.user?.id,
					boardId: url.pathname.split('/')[2]
				}
			}
		});

		if (!existingMembership || existingMembership.role !== 'Owner') {
			console.error('User is not the owner of the board or membership does not exist.');
			return;
		}

		const alreadyMember = await prisma.boardMembership.findUnique({
			where: {
				userId_boardId: {
					userId: id,
					boardId: url.pathname.split('/')[2]
				}
			}
		});

		if (alreadyMember) {
			console.log(alreadyMember);
			console.log('Already a member; if you want to change the role, go to settings.');
			return;
		}

		await prisma.boardMembership.create({
			data: {
				userId: id,
				boardId: url.pathname.split('/')[2],
				role: role // or any other role you want to assign
			}
		});

		console.log('Member added successfully.');
	},
	createList: async (event) => {
		const user = await event.locals.getSession();
		if (!user?.user) {
			return;
		}
		const form = await superValidate(event, listCreateSchema);
		if (!user?.user) {
			return;
		}
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const isBoardMember = await prisma.boardMembership.findFirst({
			where: {
				userId: user?.user.id,
				boardId: event.url.pathname.split('/')[2],
				role: { in: ['Owner', 'Coworker'] }
			}
		});
		if (!isBoardMember) {
			console.log('nada');
			return;
		}
		const listPosition = await prisma.list.findFirst({
			where: { boardId: event.url.pathname.split('/')[2] },
			orderBy: { position: 'desc' },
			select: { position: true }
		});
		const newPosition = listPosition?.position ? +listPosition.position + 1 : 1;
		await prisma.list.create({
			data: {
				title: form.data.title,
				boardId: event.url.pathname.split('/')[2],
				position: newPosition
			}
		});
	},
	createCard: async ({ request, locals, url }) => {
		const user = await locals.getSession();
		if (!user?.user) {
			return;
		}
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

		const cardPosition = await prisma.card.findFirst({
			where: { listId },
			orderBy: { position: 'desc' },
			select: { position: true }
		});
		const newPosition = cardPosition ? +cardPosition + 1 : 1;

		await prisma.card.create({
			data: {
				title: 'Task 1',
				content: 'Complete task by EOD',
				position: newPosition,
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
