import { fileSizeValidations, imageDimensionsValidation, extenstionValidation } from 'shared/lib'
import { z } from 'zod'

export const customImage = z
  .custom<FileList>()
  .transform((file) => (file && file.length > 0 && file.item(0)) || (null as unknown as File))
  .refine(fileSizeValidations(), 'The profile picture must be a maximum of 10MB.')
  .refine(imageDimensionsValidation({ maxWidth: 3840, maxHeight: 2160 }), 'The profile picture must be width > 3840 and height > 2160')
  .refine(extenstionValidation(), 'Only images are allowed to be sent.')

export const userSettingsFormSchema = z
  .object({
    avatar: customImage,
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirm: z.string().min(8),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, { message: 'Passwords must match', path: ['passwordConfirm'] })

export type UserSettingsFormSchema = z.infer<typeof userSettingsFormSchema>
