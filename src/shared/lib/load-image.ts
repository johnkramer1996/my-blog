export const loadImage = (file: File) => {
  return new Promise<HTMLImageElement | null>((resolve) => {
    if (!['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
      resolve(null)
    }

    const img = new Image()
    img.onload = () => resolve(img)
    img.src = URL.createObjectURL(file)
  })
}
