import adminApi from "@/api/adminApi";
import productApi from "@/api/productApi";
import { showToast } from "@/components/toast";
import { IDataPaging, ISize } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminSizeState {
  sizes: ISize[];
  showAddModal: boolean;
  selectedSize: ISize | null;
  filter: {
    name: string;
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminSizeState = {
  sizes: [],
  showAddModal: false,
  selectedSize: null,
  filter: { name: "" },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchSizes = createAsyncThunk(
  "size/fetchSizes",
  async (_, { getState }) => {
    const state = getState() as { adminSize: AdminSizeState };
    const { filter, pagination } = state.adminSize;

    const payload = {
      size: filter.name,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await productApi.getAllSizes(payload);

    return response;
  }
);

export const deleteSize = createAsyncThunk(
  "size/deleteSize",
  async (sizeId: number, { dispatch }) => {
    const response = await adminApi.deleteSize({ id: sizeId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchSizes());
      showToast({
        content: "Xóa màu thành công!",
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Xóa màu thất bại!",
        duration: 5,
        type: "error",
      });
    }
    return response;
  }
);

const adminSizeSlice = createSlice({
  name: "adminSize",
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
    setSelectedSize: (state, action) => {
      state.selectedSize = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSizes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        const payload = action.payload.data as IDataPaging<ISize[]>;
        state.sizes = payload.data;
        state.totalElements = payload.total;
        state.loading = false;
      })
      .addCase(fetchSizes.rejected, (state) => {
        state.sizes = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteSize.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSize.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteSize.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination, setShowAddModal, setSelectedSize } =
  adminSizeSlice.actions;
export default adminSizeSlice;
