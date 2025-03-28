import adminApi from "@/api/adminApi";
import homeApi from "@/api/homeApi";
import { showToast } from "@/components/toast";
import { IBanner, IDataPaging } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminBannerState {
  banners: IBanner[];
  selectedBanner: IBanner | null;
  showAddModal: boolean;
  filter: {
    type: string | null;
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminBannerState = {
  banners: [],
  selectedBanner: null,
  showAddModal: false,
  filter: { type: null },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchBanners = createAsyncThunk(
  "banner/fetchBanners",
  async (_, { getState }) => {
    const state = getState() as { adminBanner: AdminBannerState };
    const { filter, pagination } = state.adminBanner;

    const payload = {
      type: filter.type,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await homeApi.getAllBanners(payload);

    return response;
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (bannerId: number, { dispatch }) => {
    const response = await adminApi.deleteBanner({ id: bannerId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchBanners());
      showToast({
        content: "Xóa banner thành công!",
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Xóa banner thất bại!",
        duration: 5,
        type: "error",
      });
    }
    return response;
  }
);

const adminBannerSlice = createSlice({
  name: "adminBanner",
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
    setSelectedBanner: (state, action) => {
      state.selectedBanner = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        const payload = action.payload.data as IDataPaging<IBanner[]>;
        state.banners = payload.data;
        state.totalElements = payload.total;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state) => {
        state.banners = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBanner.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBanner.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination, setSelectedBanner, setShowAddModal } =
  adminBannerSlice.actions;
export default adminBannerSlice;
