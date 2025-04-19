import { IResponseReview } from "@/admin/views/reviews/types";
import adminApi from "@/api/adminApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminReviewState {
  reviews: IResponseReview[];
  filter: {
    phoneNumber: string;
    productName: string;
    content: string;
    rate: number | null;
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminReviewState = {
  reviews: [],
  filter: { phoneNumber: "", productName: "", content: "", rate: null },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (_, { getState }) => {
    const state = getState() as { adminReview: AdminReviewState };
    const { filter, pagination } = state.adminReview;

    const payload = {
      productName: filter.productName,
      phoneNumber: filter.phoneNumber,
      content: filter.content,
      rate: filter.rate,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await adminApi.getParentReviewPaging(payload);

    return response;
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId: number) => {
    // const response = await reviewApi.delete();

    return true;
  }
);

const adminReviewSlice = createSlice({
  name: "adminReview",
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
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.reviews = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination } = adminReviewSlice.actions;
export default adminReviewSlice;
