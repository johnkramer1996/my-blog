import { z } from 'zod'

export const signUpFormSchema = z.object({
  login: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(7),
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>
