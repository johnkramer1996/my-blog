import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { baseApi } from 'shared/api'
import { rootReducer } from './root.reducer'
import { sessionSlice } from 'entities/session'
import { invalidateAccessTokenListener } from 'features/session/invalidateAccessToken'
import { refreshTokensListener } from 'features/session/refresh-token'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [sessionSlice.name],
}

export function makeStore() {
  const store = configureStore({
    reducer: persistReducer(persistConfig, rootReducer) as unknown as typeof rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware, refreshTokensListener.middleware),
  })

  setupListeners(store.dispatch)

  return store
}

export const appStore = makeStore()
export const persistedStore = persistStore(appStore)

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
