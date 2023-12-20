import { createListenerMiddleware } from '@reduxjs/toolkit'
import { setSessionData } from 'entities/session'
import { AppStartListening } from 'shared/api'
import { refreshTokens } from 'shared/api/refresh-tokens.action'

export const refreshTokensListener = createListenerMiddleware()

export const startRefreshTokensListener = refreshTokensListener.startListening as AppStartListening

startRefreshTokensListener({
  actionCreator: refreshTokens,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(setSessionData({ isAuth: true, ...action.payload }))
  },
})
