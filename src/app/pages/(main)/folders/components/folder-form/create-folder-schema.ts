import * as z from 'zod';

export const createFolderBodySchema = z.object({
  title: z.string().trim().min(1, 'title is required'),
  description: z.string().trim().optional(),
  visibility: z.enum(['PRIVATE', 'PUBLIC']).optional().default('PRIVATE'),
});

export type CreateFolderSchema = z.infer<typeof createFolderBodySchema>;
