import orderApi from "@/api/orderApi";
import { IOrder } from "@/types/interface";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  hasOrder: boolean;
  isSearched: boolean;
  selectedOrder: IOrder | null;
  orders: IOrder[];
  loading: boolean;
  phoneNumber: string;
}

const initialState: OrderState = {
  hasOrder: false,
  isSearched: false,
  selectedOrder: null,
  orders: [],
  loading: false,
  phoneNumber: "",
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (payload: any) => {
    const response = await orderApi.getOrders(payload);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setHasOrder(state, action: PayloadAction<boolean>) {
      state.hasOrder = action.payload;
    },
    setIsSearched(state, action: PayloadAction<boolean>) {
      state.isSearched = action.payload;
    },
    setSelectedOrder(state, action: PayloadAction<IOrder | null>) {
      state.selectedOrder = action.payload;
    },
    setOrders(state, action: PayloadAction<IOrder[]>) {
      state.orders = action.payload;
    },
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        const data = action.payload.data as IOrder[]
        state.orders = data;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orders = [];
        state.loading = false;
      });
  },
});

export const {
  setHasOrder,
  setIsSearched,
  setSelectedOrder,
  setOrders,
  setPhoneNumber,
} = orderSlice.actions;
export default orderSlice;
