import { createAction } from '@reduxjs/toolkit'

export const refreshTokens = createAction<{ refreshToken: string; accessToken: string }>('session/updateTokens')
