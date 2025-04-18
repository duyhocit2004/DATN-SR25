import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { IVoucher } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminVoucherState {
  vouchers: IVoucher[];
  showAddModal: boolean;
  selectedVoucher: IVoucher | null;
  filter: {
    name: string;
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminVoucherState = {
  vouchers: [],
  showAddModal: false,
  selectedVoucher: null,
  filter: { name: "" },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchVouchers = createAsyncThunk(
  "voucher/fetchVouchers",
  async (_, { getState }) => {
    const state = getState() as { adminVoucher: AdminVoucherState };
    const { filter, pagination } = state.adminVoucher;

    const payload = {
      code: filter.name,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await adminApi.getAllVoucher(payload);

    return response;
  }
);

export const deleteVoucher = createAsyncThunk(
  "voucher/deleteVoucher",
  async (voucherId: number, { dispatch }) => {
    const response = await adminApi.deleteVoucher({ id: voucherId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchVouchers());
      showToast({
        content: "Xóa voucher thành công!",
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Xóa voucher thất bại!",
        duration: 5,
        type: "error",
      });
    }
    return response;
  }
);

export const toggleStatus = createAsyncThunk(
  "vouchers/toggleStatus",
  async ({ id, currentStatus }: { id: number; currentStatus: string }, { dispatch }) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const response = await adminApi.updateVoucherStatus({ id, status: newStatus });

    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchVouchers());
      showToast({
        content: `Voucher đã được chuyển sang trạng thái ${newStatus === "ACTIVE" ? "Hoạt động" : "Khóa"}!`,
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Cập nhật trạng thái voucher thất bại!",
        duration: 5,
        type: "error",
      });
    }

    return response;
  }
);

const adminVoucherSlice = createSlice({
  name: "adminVoucher",
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
    setSelectedVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.vouchers = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchVouchers.rejected, (state) => {
        state.vouchers = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteVoucher.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteVoucher.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteVoucher.rejected, (state) => {
        state.loading = false;
      })
      .addCase(toggleStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleStatus.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleStatus.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination, setShowAddModal, setSelectedVoucher } =
  adminVoucherSlice.actions;
export default adminVoucherSlice;
