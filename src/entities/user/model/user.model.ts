export type User = {
  id: Id
  createdAt: string
  updatedAt: string | null
  avatar: string | null
  email: Email
  login: string
  firstName: string | null
  lastName: string | null
  country: string | null
  postalCode: string | null
  street: string | null
  isDeleted: boolean
  lastLogin: Date | null
}
