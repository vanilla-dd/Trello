// Todo: More validatorsssssssssss

import { z } from 'zod';
export const boardCreateSchema = z.object({
	title: z
		.string({ required_error: "Title can't be empty" })
		.min(1, { message: "Title can't be empty" })
		.max(26, { message: "Title shoudn't be longer than 26 characters" })
		.trim(),
	visibility: z
		.enum(['public', 'private'], { required_error: 'Please Select One' })
		.default('public'),
	imageId: z.string({
		required_error: 'Image is required',
		invalid_type_error: 'Image is required'
	})
});
export const listCreateSchema = z.object({
	title: z
		.string({ required_error: "Title can't be empty" })
		.min(1)
		.max(26, { message: "Title shoudn't be longer than 26 characters" })
		.trim(),
	boardId: z.string({ required_error: "Can't Create List" })
});
export const updateName = z.object({
	newName: z
		.string({ required_error: "Title can't be empty" })
		.min(1, { message: "Title can't be empty" })
		.max(26, { message: "Title shoudn't be longer than 26 characters" })
		.trim()
});
export type ListCreateType = typeof listCreateSchema;
export type BoardCreateType = typeof boardCreateSchema;
export type UpdateName = typeof updateName;
