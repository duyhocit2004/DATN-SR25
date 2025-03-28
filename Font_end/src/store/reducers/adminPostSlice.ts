import { IResponsePost } from "@/admin/views/posts/types";
import postApi from "@/api/postApi";
import { IPost } from "@/types/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminPostState {
  posts: IResponsePost[];
  filter: { keyword: string; productName: string };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminPostState = {
  posts: [],
  filter: { keyword: "", productName: "" },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchPosts = createAsyncThunk(
  "post/fetchPosts",
  async (_, { getState }) => {
    const state = getState() as { adminPost: AdminPostState };
    const { filter, pagination } = state.adminPost;

    const payload = {
      name: filter.keyword,
      productName: filter.productName,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await postApi.getPostsByFilter(payload);

    return response;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId: number) => {
    // const response = await postApi.delete();

    return true;
  }
);

const adminPostSlice = createSlice({
  name: "adminPost",
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
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination } = adminPostSlice.actions;
export default adminPostSlice;
