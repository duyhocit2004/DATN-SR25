import adminApi from "@/api/adminApi";
import productApi from "@/api/productApi";
import { showToast } from "@/components/toast";
import { IColor, IDataPaging } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminColorState {
  colors: IColor[];
  selectedColor: IColor | null;
  showAddModal: boolean;
  filter: {
    code: string;
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminColorState = {
  colors: [],
  selectedColor: null,
  showAddModal: false,
  filter: { code: "" },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchColors = createAsyncThunk(
  "color/fetchColors",
  async (_, { getState }) => {
    const state = getState() as { adminColor: AdminColorState };
    const { filter, pagination } = state.adminColor;

    const payload = {
      code: filter.code,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await productApi.getAllColors(payload);

    return response;
  }
);

export const deleteColor = createAsyncThunk(
  "color/deleteColor",
  async (colorId: number, { dispatch }) => {
    const response = await adminApi.deleteColor({ id: colorId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchColors());
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

const adminColorSlice = createSlice({
  name: "adminColor",
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
    setSelectedColor: (state, action) => {
      state.selectedColor = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        const payload = action.payload.data as IDataPaging<IColor[]>;
        state.colors = payload.data;
        state.totalElements = payload.total;
        state.loading = false;
      })
      .addCase(fetchColors.rejected, (state) => {
        state.colors = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteColor.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteColor.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteColor.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination, setSelectedColor, setShowAddModal } =
  adminColorSlice.actions;
export default adminColorSlice;
