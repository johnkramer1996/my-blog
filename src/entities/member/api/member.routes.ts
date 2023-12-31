export const memberRoutes = {
  FIND_MEMBERS: `/members/`,
  FIND_MEMBER_BY_LOGIN: (login: string) => `/members/${login}`,
  FIND_MEMBERS_FOR_MESSAGE: '/cabinet/messages',
  FIND_CURRENT_MEMBER: '/cabinet/member',
  UPDATE_MEMBER_LAST_ACTIVE: '/cabinet/member/updateLastActive',
  ADD_ROLE_TO_MEMBER: (login: string, action: 'attach' | 'detach') => `/members/${login}/${action}Role`,
  BAN_MEMBER: (login: string) => `/members/${login}/ban`,
  RECOVER_MEMBER: (login: string) => `/members/${login}/recover`,
}
