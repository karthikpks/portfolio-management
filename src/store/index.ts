import { configureStore } from '@reduxjs/toolkit'
import transactionReducer from './transaction'

export const store = configureStore({
  reducer: {
      transaction: transactionReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch