import { z } from 'zod';
export const boardCreateSchema = z.object({
	title: z
		.string({ required_error: "Title can't be empty" })
		.min(1)
		.max(26, { message: "Title shoudn't be longer than 26 characters" })
		.trim(),
	visibility: z
		.enum(['public', 'private'], { required_error: 'Please Select One' })
		.default('public')
});
export type BoardCreateType = typeof boardCreateSchema;
