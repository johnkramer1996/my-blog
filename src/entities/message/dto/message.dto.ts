export type MessageDto = {
  id: string
  createdAt: string
  updatedAt: string | null
  fromMemberId: string
  toMemberId: string
  message: string
  isRead: boolean
}
