import { z } from 'zod'

export const createCommentFormSchema = z.object({
  text: z.string().min(1),
})

export type CreatePostFormSchema = z.infer<typeof createCommentFormSchema>
