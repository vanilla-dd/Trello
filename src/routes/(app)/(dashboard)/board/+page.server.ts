import { redirect, type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { boardCreateSchema } from '$lib/validator/formValidators';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/db';
export const load: PageServerLoad = async ({ locals }) => {
	const user = await locals.getSession();
	if (!user?.user) {
		return;
	}
	// Get all Boards
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
	return {
		form: superValidate(boardCreateSchema),
		allBoards: { boards: allBoards() }
	};
};

// Create Board
export const actions: Actions = {
	default: async (event) => {
		const user = await event.locals.getSession();
		const form = await superValidate(event, boardCreateSchema);
		if (!user?.user) {
			return;
		}
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
			form.data.imageId.split('|');
		if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
			return fail(400, { form });
		}
		const visi = form.data.visibility === 'private' ? false : true;
		const createdBoard = await prisma.board.create({
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
		});
		if (createdBoard) {
			throw redirect(307, `/board/${createdBoard.id}`);
		}
		return {
			form
		};
	}
};
