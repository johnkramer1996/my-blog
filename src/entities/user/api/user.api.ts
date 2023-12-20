import { baseApi, invalidateAccessToken, CURRENT_USER_TAG, CURRENT_MEMBER_TAG, POST_TAG, COMMENT_TAG, CHILDREN_COMMENT_TAG, MEMBER_TAG } from 'shared/api'
import { userMapper } from '../lib/user.mapper'
import { type User } from '../model/user.model'
import { userRoutes } from './user.routes'

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query<User, void>({
      query: () => ({ url: userRoutes.USER, credentials: 'include' }),
      providesTags: [CURRENT_USER_TAG],
      transformResponse: userMapper,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (error) {
          dispatch(invalidateAccessToken())
        }
      },
    }),
    settings: builder.mutation<void, FormData>({
      query: (body) => ({ url: userRoutes.SETTINGS, method: 'PATCH', body }),
      invalidatesTags: [CURRENT_USER_TAG, CURRENT_MEMBER_TAG, POST_TAG, COMMENT_TAG, CHILDREN_COMMENT_TAG, MEMBER_TAG],
    }),
  }),
})

export const { useCurrentUserQuery, useSettingsMutation } = userApi
