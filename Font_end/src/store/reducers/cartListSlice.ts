import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  [x: string]: number;
  count: number;
}

const initialState: CartState = {
  count: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    addToCart(state) {
      state.count += 1;
    },
    removeFromCart(state) {
      state.count -= 1;
    },
  },
});

export const { setCartCount, addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice;
