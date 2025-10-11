import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: true, // enabled by default in development
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
