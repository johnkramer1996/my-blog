export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const extenstionValidation =
  (ext = ACCEPTED_IMAGE_TYPES) =>
  (file: File) =>
    !file || (!!file && ext.includes(file.type))
