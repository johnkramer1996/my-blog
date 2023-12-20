import { createApi } from '@reduxjs/toolkit/query/react'
import { MEMBER_TAG, POST_TAG, CURRENT_USER_TAG, CURRENT_MEMBER_TAG, COMMENT_TAG, CHILDREN_COMMENT_TAG, MESSAGE_TAG, COUNT_POST_TAG } from './tags'
import { baseWithReauthQuery } from './base-with-reauth.query'

export const baseApi = createApi({
  tagTypes: [POST_TAG, COUNT_POST_TAG, COMMENT_TAG, CHILDREN_COMMENT_TAG, MEMBER_TAG, CURRENT_USER_TAG, CURRENT_MEMBER_TAG, MESSAGE_TAG],
  reducerPath: 'api',
  baseQuery: baseWithReauthQuery,
  endpoints: () => ({}),
})
