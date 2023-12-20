export const objectToFormData = (data: { [key: string]: string | number | File }) => {
  const body = new FormData()

  for (const [key, value] of Object.entries(data)) {
    if (value instanceof FileList) {
      for (const item of value) body.append(key, item)
      continue
    }
    if (value instanceof File) {
      body.append(key, value)
      continue
    }
    body.append(key, String(value))
  }
  return body
}
