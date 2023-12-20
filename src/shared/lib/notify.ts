import { isErrorWithMessage } from 'shared/api'
import { toast } from 'react-toastify'

export const notify = (text: string) => toast(text)
export const notifySuccess = (text: string) => toast.success(text, { theme: 'colored' })
export const notifyError = (text: string) => toast.error(text, { theme: 'colored' })

export const notifyUnknown = (error: unknown) => notifyError(getErrorFromResponse(error))

const getErrorFromResponse = (error: unknown): string => {
  const errorIsObject = error && typeof error === 'object'
  if (!errorIsObject) {
    return typeof error === 'string' ? error : 'Unknown error'
  }
  if (isErrorWithMessage(error)) return error.message
  const hasData = 'data' in error && error.data
  if (!hasData) return 'Unknown error'
  const data = error.data
  if (isErrorWithMessage(data)) return data.message
  const dataIsObject = data && typeof data === 'object'

  return dataIsObject ? Object.values(data).join(', ') : 'Unknown error'
}
