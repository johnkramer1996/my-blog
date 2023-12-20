import { baseApi, CURRENT_USER_TAG } from 'shared/api'
import { sessionMaper } from '../lib/session.mapper'
import { type Session } from '../model/session.model'
import { RegisterDto } from '../dto/register.dto'
import { type LoginDto } from '../dto/login.dto'
import { sessionRoutes } from './session.routes'

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<Session, LoginDto>({
      query: (body) => ({ url: sessionRoutes.LOGIN, method: 'POST', body, credentials: 'include' }),
      invalidatesTags: [CURRENT_USER_TAG],
      transformResponse: sessionMaper,
    }),
    signUp: build.mutation<Session, RegisterDto>({
      query: (body) => ({ url: sessionRoutes.REGISTER, method: 'POST', body }),
      invalidatesTags: [CURRENT_USER_TAG],
      transformResponse: sessionMaper,
    }),
    logout: build.mutation<Session, void>({
      query: (body) => ({ url: sessionRoutes.LOGOUT, method: 'POST', body }),
    }),
    refreshToken: build.mutation<Session, { refreshToken: string }>({
      query: (body) => ({ url: sessionRoutes.REFRESH_TOKEN, method: 'POST', body }),
      transformResponse: sessionMaper,
    }),
  }),
})

export const { useSignInMutation, useSignUpMutation, useRefreshTokenMutation } = sessionApi
