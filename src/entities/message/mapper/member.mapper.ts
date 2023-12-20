import dayjs from 'dayjs'
import { MessageDto } from '../dto/message.dto'
import { Message } from '../model/message.model'

export const messageMapper = (dto: MessageDto): Message => ({
  id: dto.id,
  createdAt: dayjs(dto.createdAt).format('MMM D, YYYY HH:mm:ss'),
  updatedAt: dayjs(dto.updatedAt).format('MMM D, YYYY HH:mm:ss'),
  fromMemberId: dto.fromMemberId,
  toMemberId: dto.toMemberId,
  message: dto.message,
  isRead: dto.isRead,
})
