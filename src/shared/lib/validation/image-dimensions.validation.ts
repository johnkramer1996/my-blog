import { getImageDimensions } from 'shared/lib'

export const imageDimensionsValidation =
  ({ minWidth = 0, minHeight = 0, maxWidth = 1920, maxHeight = 1080 } = {}) =>
  async (file: File) => {
    if (!file) return true
    const { width, height } = await getImageDimensions(file)

    const result = minWidth < width && width <= maxWidth && minHeight < height && height <= maxHeight
    return result
  }
