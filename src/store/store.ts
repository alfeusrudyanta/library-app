import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer from '@/store/slices/checkout-slice';

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
