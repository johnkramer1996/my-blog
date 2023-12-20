import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { sessionApi } from '../api/session.api'

type SessionSliceState =
  | {
      isAuth: true
      accessToken: string
      refreshToken: string
    }
  | {
      isAuth: false
      accessToken: null
      refreshToken: null
    }

const initialState: SessionSliceState = {
  isAuth: false,
  accessToken: null,
  refreshToken: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState as SessionSliceState,
  reducers: {
    clearSessionData: (state) => {
      state.isAuth = initialState.isAuth
      state.accessToken = initialState.accessToken
      state.refreshToken = initialState.refreshToken
    },
    setSessionData: (state, action: PayloadAction<SessionSliceState>) => {
      state.isAuth = action.payload.isAuth
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(sessionApi.endpoints.signIn.matchFulfilled, (state: SessionSliceState, { payload }) => {
      const newState: SessionSliceState = {
        isAuth: true,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      }
      state.isAuth = newState.isAuth
      state.refreshToken = newState.refreshToken
      state.accessToken = newState.accessToken
    })
    builder.addMatcher(sessionApi.endpoints.refreshToken.matchFulfilled, (state: SessionSliceState, { payload }) => {
      const newState: SessionSliceState = {
        isAuth: true,
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
      }
      state.isAuth = newState.isAuth
      state.refreshToken = newState.refreshToken
      state.accessToken = newState.accessToken
    })
  },
})

export const selectIsAuth = (state: RootState) => state.session.isAuth

export const { clearSessionData, setSessionData } = sessionSlice.actions
