import { IAccount } from "@/types/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast";

interface AdminAccountState {
  accounts: IAccount[];
  filter: { keyword: string; role: string | null };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminAccountState = {
  accounts: [],
  filter: { keyword: "", role: null },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async (_, { getState }) => {
    const state = getState() as { adminAccount: AdminAccountState };
    const { filter, pagination } = state.adminAccount;

    const payload = {
      name: filter.keyword,
      role: filter.role,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await adminApi.getAllUser(payload);

    return response;
  }
);
export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (accountId: number, { dispatch }) => {
    const response = await adminApi.deleteUser({ id: accountId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchAccounts());
      showToast({
        content: "Xóa tài khoản thành công!",
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Xóa tài khoản thất bại!",
        duration: 5,
        type: "error",
      });
    }
    return response;
  }
);

const adminAccountSlice = createSlice({
  name: "adminAccount",
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
      .addCase(fetchAccounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchAccounts.rejected, (state) => {
        state.accounts = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteAccount.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination } = adminAccountSlice.actions;
export default adminAccountSlice;
