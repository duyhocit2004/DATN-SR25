import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/countSlice";
import wishlistReducer from "./reducers/wishlistSlice";
import cartReducer from "./reducers/cartListSlice";
import orderReducer from "./reducers/orderSlice";
import adminProductReducer from "./reducers/adminProductSlice";
import adminAccountSlice from "./reducers/adminAccountSlice";
import adminPostReducer from "./reducers/adminPostSlice";
import adminReviewReducer from "./reducers/adminReviewSlice";
import adminCategoryReducer from "./reducers/adminCategorySlice";
import adminColorReducer from "./reducers/adminColorSlice";
import adminSizeReducer from "./reducers/adminSizeSlice";
import adminVoucherReducer from "./reducers/adminVoucherSlice";
import adminBannerReducer from "./reducers/adminBannerSlice";
import adminOrderReducer from "./reducers/adminOrderSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer.reducer,
    wishlist: wishlistReducer.reducer,
    cart: cartReducer.reducer,
    order: orderReducer.reducer,
    adminProduct: adminProductReducer.reducer,
    adminAccount: adminAccountSlice.reducer,
    adminPost: adminPostReducer.reducer,
    adminReview: adminReviewReducer.reducer,
    adminCategory: adminCategoryReducer.reducer,
    adminColor: adminColorReducer.reducer,
    adminSize: adminSizeReducer.reducer,
    adminVoucher: adminVoucherReducer.reducer,
    adminBanner: adminBannerReducer.reducer,
    adminOrder: adminOrderReducer.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
