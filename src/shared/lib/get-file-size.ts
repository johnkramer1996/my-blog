export const getFileSize = (number = 0) => {
  if (number < 1 << 10) return `${number} bytes`
  if (number >= 1 << 10 && number < 1 << 20) return `${(number / 1024).toFixed(1)} KB`
  return `${(number / (1 << 20)).toFixed(1)} MB`
}
