import { z } from 'zod'
import { extenstionValidation, fileSizeValidations, imageDimensionsValidation } from 'shared/lib'

export const postImageValidation = z
  .custom<FileList | string | undefined>()
  .transform((file) => (file && file.length > 0 && file instanceof FileList && file.item(0)) || (null as unknown as File))
  .refine(fileSizeValidations(), 'The picture must be a maximum of 10MB.')
  .refine(imageDimensionsValidation({ maxWidth: 3840, maxHeight: 2160 }), 'The picture must be width > 3840 and height > 2160')
  .refine(extenstionValidation(), 'Only images are allowed to be sent.')
