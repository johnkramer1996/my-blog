import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from 'shared/lib'

export const baseQueryWithAccessToken = fetchBaseQuery({
  baseUrl: config.API_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).session.accessToken

    if (accessToken) headers.set('authorization', `Bearer ${accessToken}`)

    return headers
  },
})
