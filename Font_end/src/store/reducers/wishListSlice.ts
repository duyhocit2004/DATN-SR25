import { IWishlist } from "@/types/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  count: number;
  listWishlist: IWishlist[];
}

const initialState: WishlistState = {
  count: 0,
  listWishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setListWishlist(state, action: PayloadAction<IWishlist[]>) {
      state.listWishlist = action.payload;
    },
    setWishlistCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    addToWishlist(state) {
      state.count += 1;
    },
    removeFromWishlist(state) {
      state.count -= 1;
    },
  },
});

export const {
  setWishlistCount,
  addToWishlist,
  removeFromWishlist,
  setListWishlist,
} = wishlistSlice.actions;
export default wishlistSlice;
