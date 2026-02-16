import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type CartSlice = {};

const initialState: CartSlice = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (_, action: PayloadAction<CartSlice>) => {
      return action.payload;
    },
  },
});

export const { setCart } = cartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
