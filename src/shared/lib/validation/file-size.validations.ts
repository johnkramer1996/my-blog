export const MAX_FILE_SIZE = (10 << 10) << 10

export const fileSizeValidations =
  (maxFileSize = MAX_FILE_SIZE) =>
  (file: File) =>
    !file || (!!file && file.size <= maxFileSize)
