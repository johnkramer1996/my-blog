import { userApi } from 'entities/user/api/user.api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi, clearSessionData } from 'entities/session'
import { POST_TAG, CURRENT_USER_TAG, CURRENT_MEMBER_TAG, COMMENT_TAG } from 'shared/api'
import { wait } from 'shared/lib'

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>('session/logout', async (_: unknown, { dispatch, getState }) => {
  try {
    const state = getState()
    if (state.session.isAuth) await dispatch(sessionApi.endpoints.logout.initiate()).unwrap()
  } finally {
    dispatch(clearSessionData())

    // Wait 10ms to invalidateTags in next event loop tick.
    await wait(10)
    dispatch(userApi.util.invalidateTags([CURRENT_USER_TAG, CURRENT_MEMBER_TAG, POST_TAG, COMMENT_TAG]))
  }
})
