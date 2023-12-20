import { PATH_IMAGE } from 'shared/lib/paths'
import { type UserDto } from '../dto/user.dto'
import { type User } from '../model/user.model'
import dayjs from 'dayjs'

export const userMapper = (dto: UserDto): User => ({
  id: dto.id,
  createdAt: dayjs(dto.createdAt).format('MMM D, YYYY'),
  updatedAt: dayjs(dto.updatedAt).format('MMM D, YYYY'),
  login: dto.login,
  email: dto.email,
  avatar: dto.avatar ? PATH_IMAGE(dto.avatar) : null,
  firstName: dto.firstName,
  lastName: dto.lastName,
  country: dto.country,
  postalCode: dto.postalCode,
  street: dto.street,
  isDeleted: dto.isDeleted,
  lastLogin: dto.lastLogin,
})
