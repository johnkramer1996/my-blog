import { userApi } from 'entities/user/api/user.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from 'entities/session'
import { CURRENT_USER_TAG } from 'shared/api'
import { wait } from 'shared/lib'

export const refreshTokenThunk = createAsyncThunk<void, { refreshToken: string }, { state: RootState }>(
  'session/refresh-token',
  async (body, { dispatch, getState }) => {
    try {
      await dispatch(sessionApi.endpoints.refreshToken.initiate(body)).unwrap()
    } finally {
      const state = getState()
      if (!state.session.isAuth) {
        // Wait 10ms to invalidateTags in next event loop tick.
        await wait(10)
        dispatch(userApi.util.invalidateTags([CURRENT_USER_TAG]))
      }
    }
  }
)
