import { createListenerMiddleware } from '@reduxjs/toolkit'
import { logoutThunk } from 'features/session/logout/model/logout.thunk'
import { AppStartListening, invalidateAccessToken } from 'shared/api'

export const invalidateAccessTokenListener = createListenerMiddleware()

export const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as AppStartListening

startInvalidateAccessTokenListener({
  actionCreator: invalidateAccessToken,
  effect: async (_, listenerApi) => {
    await listenerApi.dispatch(logoutThunk())
  },
})
