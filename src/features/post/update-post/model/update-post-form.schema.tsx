import { postImageValidation } from 'entities/post'
import { z } from 'zod'

export const updatePostFormSchema = z.object({
  status: z.string().optional(),
  image: postImageValidation.optional(),
  imagePreview: z.string().min(1, 'The photo is required'),
  title: z.string().min(1).optional(),
  text: z.string().min(1).optional(),
})

export type UpdatePostFormSchema = z.infer<typeof updatePostFormSchema>
