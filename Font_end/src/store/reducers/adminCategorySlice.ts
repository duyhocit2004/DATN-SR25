import { IResponseCategory } from "@/admin/views/categories/types";
import adminApi from "@/api/adminApi";
import homeApi from "@/api/homeApi";
import { showToast } from "@/components/toast";
import { IListCategory } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminCategoryState {
  categories: IResponseCategory[];
  parentCategories: IListCategory[];
  selectedCategory: IResponseCategory | null;
  showAddModal: boolean;
  filter: {
    keyword: string;
    parentId: number | null;
  };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminCategoryState = {
  categories: [],
  parentCategories: [],
  selectedCategory: null,
  showAddModal: false,
  filter: { keyword: "", parentId: null },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { getState }) => {
    const state = getState() as { adminCategory: AdminCategoryState };
    const { filter, pagination } = state.adminCategory;

    const payload = {
      name: filter.keyword,
      parentId: filter.parentId,
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
    };

    const response = await adminApi.getAllCategoriesNonTree(payload);

    return response;
  }
);
export const fetchParentCategories = createAsyncThunk(
  "category/fetchParentCategories",
  async () => {
    const response = await homeApi.getParentCategories();

    return response;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId: number, { dispatch }) => {
    const response = await adminApi.deleteCategory({ id: categoryId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchCategories());
      showToast({
        content: "Xóa danh mục thành công!",
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Xóa danh mục thất bại!",
        duration: 5,
        type: "error",
      });
    }
    return response;
  }
);

const adminCategorySlice = createSlice({
  name: "adminCategory",
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
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchParentCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchParentCategories.fulfilled, (state, action) => {
        state.parentCategories = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchParentCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  setFilter,
  setPagination,
  setSelectedCategory,
  setShowAddModal,
} = adminCategorySlice.actions;
export default adminCategorySlice;
