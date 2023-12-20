import { z } from 'zod'

export const createMessageFormSchema = z.object({
  message: z.string().min(1),
})

export type CreateMessageFormSchema = z.infer<typeof createMessageFormSchema>
