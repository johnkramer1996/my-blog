import { PATH_IMAGE } from 'shared/lib/paths'
import { MemberDto } from '../dto/member.dto'
import { Member } from '../model/member.model'

export const memberMapper = (dto: MemberDto): Member => ({
  id: dto.id,
  roles: dto.roles,
  avatar: dto.avatar ? PATH_IMAGE(dto.avatar) : null,
  login: dto.login,
  email: dto.email,
  reputation: dto.reputation,
  status: dto.isOnline ? 'online' : 'offline',
  isBanned: dto.isBanned,
})
