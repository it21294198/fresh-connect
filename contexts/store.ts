// \contexts\store.ts
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/count/counterSlice';
import userReducer from '../features/user/userSlice'
import loaderReducer from '../features/connection/loaderSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:userReducer,
    loader:loaderReducer
  }
})
