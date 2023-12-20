export type Message = {
  id: string
  createdAt: string
  updatedAt: string
  fromMemberId: string
  toMemberId: string
  message: string
  isRead: boolean
}
