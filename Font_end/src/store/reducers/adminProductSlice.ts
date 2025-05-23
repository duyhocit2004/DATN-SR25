import adminApi from "@/api/adminApi";
import homeApi from "@/api/homeApi";
import productApi from "@/api/productApi";
import { showToast } from "@/components/toast";
import { IListCategory, IProduct } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AdminProductState {
  products: IProduct[];
  categories: IListCategory[];
  filter: { keyword: string; categoryId: string };
  pagination: { page: number; pageSize: number };
  totalElements: number;
  loading: boolean;
}

const initialState: AdminProductState = {
  products: [],
  categories: [],
  filter: { keyword: "", categoryId: "" },
  pagination: { page: 1, pageSize: 10 },
  totalElements: 0,
  loading: false,
};

// 🎯 Thunk để fetch API dựa theo filter & pagination
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { getState }) => {
    const state = getState() as { adminProduct: AdminProductState };
    const { filter, pagination } = state.adminProduct;

    // Lấy tất cả sản phẩm không phân trang
    const payload = {
      name: filter.keyword,
      categoriesId: filter.categoryId,
      pageNum: 1,
      pageSize: 1000, // Lấy số lượng lớn để có thể lấy tất cả sản phẩm
    };

    const response = await productApi.getProductsByFilter(payload);
    
    if (response?.status === HttpCodeString.SUCCESS) {
      // Sắp xếp toàn bộ danh sách sản phẩm theo thứ tự mới nhất
      const sortedProducts = [...response.data.data].sort((a: IProduct, b: IProduct) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });

      // Phân trang sau khi đã sắp xếp
      const startIndex = (pagination.page - 1) * pagination.pageSize;
      const endIndex = startIndex + pagination.pageSize;
      const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

      // Cập nhật lại response với dữ liệu đã phân trang
      response.data.data = paginatedProducts;
      response.data.total = sortedProducts.length;
    }

    return response;
  }
);

export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await homeApi.getAllCategories();

    return response;
  }
);
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId: number, { dispatch }) => {
    const response = await adminApi.deleteProduct({ id: productId });
    if (response.status === HttpCodeString.SUCCESS) {
      dispatch(fetchProducts());
      showToast({
        content: "Xóa sản phẩm thành công!",
        duration: 5,
        type: "success",
      });
    } else {
      showToast({
        content: "Xóa sản phẩm thất bại!",
        duration: 5,
        type: "error",
      });
    }
    return response;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
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
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data.data;
        state.totalElements = action.payload.data.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.products = [];
        state.totalElements = 0;
        state.loading = false;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categories = [];
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload.status === HttpCodeString.SUCCESS) {
          const deletedProductId = action.meta.arg;
          state.products = state.products.filter(product => product.id !== deletedProductId);
          state.totalElements = state.totalElements - 1;
        }
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilter, setPagination } = adminProductSlice.actions;
export default adminProductSlice;
