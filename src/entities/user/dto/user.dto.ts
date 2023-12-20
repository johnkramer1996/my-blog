export type UserDto = {
  id: string
  createdAt: string
  updatedAt: string | null
  avatar: string | null
  login: string
  email: string
  firstName: string | null
  lastName: string | null
  country: string | null
  postalCode: string | null
  street: string | null
  isDeleted: boolean
  lastLogin: Date | null
}
