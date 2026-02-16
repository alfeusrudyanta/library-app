import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '@/store/slices/cart-slice';
import profileReducer from '@/store/slices/profile-slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
