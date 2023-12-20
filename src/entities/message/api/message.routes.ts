export const messageRoutes = {
  FIND_MESSAGES_BY_LOGIN: (login: string) => `/cabinet/messages/${login}`,
  CREATE_MESSAGE: `/messages`,
  UPDATE_MESSAGE: (messageId: string) => `/messages/${messageId}`,
}
