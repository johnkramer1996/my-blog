import { postImageValidation } from 'entities/post'
import { z } from 'zod'

export const createPostFormSchema = z.object({
  status: z.string().optional(),
  image: postImageValidation.refine((file) => file, 'The photo is required'),
  text: z.string().min(1),
  title: z.string().min(1),
})

export type CreatePostFormSchema = z.infer<typeof createPostFormSchema>
