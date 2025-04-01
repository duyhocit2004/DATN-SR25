// reducers.ts
import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./countSlice";
import wishlistSlice from "./wishlistSlice";
import cartListSlice from "./cartListSlice";
import adminProductSlice from "./adminProductSlice";
import adminAccountSlice from "./adminAccountSlice";
import adminPostSlice from "./adminPostSlice";
import adminReviewSlice from "./adminReviewSlice";
import adminCategorySlice from "./adminCategorySlice";
import adminColorSlice from "./adminColorSlice";
import adminSizeSlice from "./adminSizeSlice";
import adminVoucherSlice from "./adminVoucherSlice";
import adminBannerSlice from "./adminBannerSlice";
import adminOrderSlice from "./adminOrderSlice";
import orderSlice from "./orderSlice";

// Định nghĩa reduxActions là một Record với key kiểu string và giá trị kiểu any
export const reduxActions: Record<string, any> = {
  counter: counterSlice.actions,
  wishlist: wishlistSlice.actions,
  cart: cartListSlice.actions,
  order: orderSlice.actions,
  adminProduct: adminProductSlice.actions,
  adminAccount: adminAccountSlice.actions,
  adminPost: adminPostSlice.actions,
  adminReview: adminReviewSlice.actions,
  adminCategory: adminCategorySlice.actions,
  adminColor: adminColorSlice.actions,
  adminSize: adminSizeSlice.actions,
  adminVoucher: adminVoucherSlice.actions,
  adminBanner: adminBannerSlice.actions,
  adminOrder: adminOrderSlice.actions,
};

const rootReducer = combineReducers({
  counter: counterSlice,
  wishlist: wishlistSlice,
  cart: cartListSlice,
  order: orderSlice,
  adminProduct: adminProductSlice,
  adminAccount: adminAccountSlice,
  adminPost: adminPostSlice,
  adminReview: adminReviewSlice,
  adminCategory: adminCategorySlice,
  adminColor: adminColorSlice,
  adminVoucher: adminVoucherSlice,
  adminBanner: adminBannerSlice,
  adminOrder: adminOrderSlice,
});

export default rootReducer;
