export type MemberRole = 'admin' | 'editor' | 'author' | 'contributor' | 'subscriber'

export const MEMBER_ROLES: Record<MemberRole, MemberRole> = {
  admin: 'admin',
  editor: 'editor',
  author: 'author',
  contributor: 'contributor',
  subscriber: 'subscriber',
}
