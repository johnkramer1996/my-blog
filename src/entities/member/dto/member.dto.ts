import { MemberRole } from '../../../shared/model/member-role'

export type MemberDto = {
  id: string
  roles: MemberRole[]
  reputation: number
  avatar: string | null
  email: string
  login: string
  isOnline: boolean
  isBanned: boolean
}
