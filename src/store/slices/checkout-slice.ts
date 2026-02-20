import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type CheckoutSlice = {
  bookIds: number[];
  returnDate: string;
};

const initialState: CheckoutSlice = {
  bookIds: [],
  returnDate: '',
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setCheckout: (_, action: PayloadAction<CheckoutSlice>) => {
      return action.payload;
    },
    clearCheckout: (state) => {
      state.bookIds = [];
    },
  },
});

export const { setCheckout, clearCheckout } = checkoutSlice.actions;
export const selectCheckout = (state: RootState) => state.checkout;

export default checkoutSlice.reducer;
