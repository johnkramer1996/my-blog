import { LoginDto } from 'entities/session/dto/login.dto'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from 'entities/session'

export const signInThunk = createAsyncThunk<void, LoginDto, { state: RootState }>('session/signIn', async (body, { dispatch, rejectWithValue }) => {
  try {
    await dispatch(sessionApi.endpoints.signIn.initiate(body)).unwrap()
  } catch (err) {
    return rejectWithValue(err)
  }
})
