import { type SessionDto } from '../dto/session.dto'
import { type Session } from '../model/session.model'

export const sessionMaper = (dto: SessionDto): Session => ({
  accessToken: dto.accessToken,
  refreshToken: dto.refreshToken,
})
