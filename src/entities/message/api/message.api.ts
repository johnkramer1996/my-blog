import { MESSAGE_TAG, baseApi } from 'shared/api'
import { messageMapper } from '../mapper/member.mapper'
import { messageRoutes } from './message.routes'
import { Message } from '../model/message.model'
import { MessageDto } from '../dto/message.dto'
import { Paginated } from 'shared/model'

export const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findMessagesByLogin: builder.query<Paginated<Message>, { page: number; limit: number; login: string }>({
      query: ({ login, ...params }) => ({ url: messageRoutes.FIND_MESSAGES_BY_LOGIN(login), params }),
      transformResponse: (response: Paginated<MessageDto>) => ({ ...response, data: response.data.map(messageMapper) }),
      providesTags: [MESSAGE_TAG],
    }),
    createMessage: builder.mutation<{ id: string }, { toMemberId: string; message: string }>({
      query: (body) => ({ url: messageRoutes.CREATE_MESSAGE, method: 'POST', body }),
      invalidatesTags: [MESSAGE_TAG],
    }),
    updateMessage: builder.mutation<Message[], { messageId: string; message?: string; isRead?: boolean }>({
      query: ({ messageId, ...body }) => ({ url: messageRoutes.UPDATE_MESSAGE(messageId), method: 'PATCH', body }),
    }),
  }),
})

export const { useFindMessagesByLoginQuery, useCreateMessageMutation, useUpdateMessageMutation } = messageApi
