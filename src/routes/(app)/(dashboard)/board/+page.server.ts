import { redirect, type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { boardCreateSchema } from '$lib/validator/formValidators';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
import { MAX_BOARD_LIMIT } from '$lib/constant/boardLimit';
export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		return;
	}
	// Get all Boards
	const getUserLimit = async () =>
		await prisma.user.findFirst({
			where: { id: user.user?.id },
			select: { boardLimitUsed: true }
		});
	const allBoards = async () =>
		await prisma.board.findMany({
			where: {
				members: {
					some: {
						userId: user?.user?.id,
						role: {
							in: ['Owner', 'Watcher', 'Coworker']
						}
					}
				}
			}
		});
	// might have to update the limit to +1 when user join some one else board?
	// const subscriptionType = ()=>await prisma.;
	return {
		form: superValidate(boardCreateSchema),
		allBoards: { boards: allBoards() },
		limitUsed: getUserLimit()
	};
};

// Create Board
export const actions: Actions = {
	default: async (event) => {
		const user = await event.locals.getSession();
		const form = await superValidate(event, boardCreateSchema);
		if (!user?.user) {
			return fail(400);
		}
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const boardLimit = await prisma.user.findFirst({
			where: { id: user.user.id },
			select: { boardLimitUsed: true }
		});
		if (boardLimit === null || boardLimit?.boardLimitUsed >= MAX_BOARD_LIMIT) {
			return fail(400);
		}
		const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
			form.data.imageId.split('|');
		if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
			return fail(400, { form });
		}
		const visi = form.data.visibility === 'private' ? false : true;
		// batch query probably the best thing i learned form this project
		const [createdBoard, updateBoardLimit] = await prisma.$transaction([
			prisma.board.create({
				data: {
					title: form.data.title,
					isPublic: visi,
					members: { create: [{ userId: user?.user?.id, role: 'Owner' }] },
					imageFullUrl,
					imageId,
					imageLinkHTML,
					imageUserName,
					imageThumbUrl
				}
			}),
			prisma.user.update({
				data: { boardLimitUsed: boardLimit?.boardLimitUsed + 1 },
				where: { id: user.user.id }
			})
		]);
		if (createdBoard && updateBoardLimit) {
			throw redirect(307, `/board/${createdBoard.id}`);
		}
		return {
			form
		};
	}
};
