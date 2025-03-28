import adminApi from "@/api/adminApi";
import homeApi from "@/api/homeApi";
import { IOrder } from "@/types/interface";
import { ISO8601DateFormatDayjs } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import dayjs, { Dayjs } from "dayjs";

interface AdminOrderState {
  orders: IOrder[];
  filter: {
    orderCode: string;
    phoneNumber?: string;
    status: string | null;
    paymentStatus: string | null;
    paymentMethod: string | null;
    dateTime: [Dayjs | null, Dayjs | null]; //(yyyy-mm-dd)
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminOrderState = {
  orders: [],
  filter: {
    orderCode: "",
    phoneNumber: "",
    status: null,
    paymentStatus: null,
    paymentMethod: null,
    dateTime: [null, null], //(yyyy-mm-dd)
  },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (_, { getState }) => {
    const state = getState() as { adminOrder: AdminOrderState };
    const { filter, pagination } = state.adminOrder;

    const payload = {
      orderCode: filter.orderCode,
      phoneNumber: filter.phoneNumber,
      status: filter.status,
      paymentStatus: filter.paymentStatus,
      paymentMethod: filter.paymentMethod,
      fromDate: filter.dateTime?.[0]
        ? dayjs(filter.dateTime?.[0]).format(ISO8601DateFormatDayjs)
        : null,
      toDate: filter.dateTime?.[1]
        ? dayjs(filter.dateTime?.[1]).format(ISO8601DateFormatDayjs)
        : null,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await adminApi.getOrdersPaging(payload);

    return response;
  }
);

export const fetchCategories = createAsyncThunk(
  "order/fetchCategories",
  async () => {
    const response = await homeApi.getAllCategories();

    return response;
  }
);
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId: number) => {
    // const response = await orderApi.delete();

    return true;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
      state.pagination.page = 1; // Reset về trang đầu khi tìm kiếm
    },
    setPagination: (state, action) => {
      state.pagination.page = action.payload.page;
      state.pagination.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orders = [];
        state.totalElements = 0;
        state.loading = false;
      })
  },
});

export const { setFilter, setPagination } = adminOrderSlice.actions;
export default adminOrderSlice;
