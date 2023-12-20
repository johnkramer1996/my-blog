import { createAsyncThunk } from '@reduxjs/toolkit'
import { sessionApi } from 'entities/session'
import { RegisterDto } from 'entities/session/dto/register.dto'

export const signUpThunk = createAsyncThunk<void, RegisterDto, { state: RootState }>(
  'session/signUp',
  async (body: RegisterDto, { dispatch, rejectWithValue }) => {
    try {
      await dispatch(sessionApi.endpoints.signUp.initiate(body)).unwrap()
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)
