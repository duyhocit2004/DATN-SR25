import {
  IAccount,
  IBanner,
  ICategory,
  IColor,
  IDashboardChart,
  IDashboardStatistical,
  IDataPaging,
  IOrder,
  IProduct,
  IResponseData,
  IResponseLogin,
  IReview,
  ISize,
  IVoucher,
} from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";
import { IResponseCategory } from "@/admin/views/categories/types";

class AdminApi extends BaseApi<{ data: any }> {
  [x: string]: any;
  constructor() {
    super("admin"); // Gán URI 'admins' cho API này
  }
  getDashboardStats = (
    payload: any
  ): Promise<IResponseData<IDashboardStatistical>> => {
    return axiosClient
      .post(`${this.uri}/dashboard/getDataStats`, payload)
      .then((res) => res.data);
  };
  getDashboardChart = (
    payload: any
  ): Promise<IResponseData<IDashboardChart[]>> => {
    return axiosClient
      .post(`${this.uri}/dashboard/getDashboardChart`, payload)
      .then((res) => res.data);
  };
  addColor = (payload: any): Promise<IResponseData<IDataPaging<IColor>>> => {
    return axiosClient
      .post(`${this.uri}/colors/addColor`, payload)
      .then((res) => res.data);
  };
  addSize = (payload: any): Promise<IResponseData<IDataPaging<ISize>>> => {
    return axiosClient
      .post(`${this.uri}/sizes/addSize`, payload)
      .then((res) => res.data);
  };
  addCategory = (payload: any): Promise<IResponseData<ICategory>> => {
    return axiosClient
      .post(`${this.uri}/categories/addCategory`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  addBanner = (payload: any): Promise<IResponseData<IBanner>> => {
    return axiosClient
      .post(`${this.uri}/banners/addBanner`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  updateCategory = (payload: any): Promise<IResponseData<ICategory>> => {
    return axiosClient
      .post(`${this.uri}/categories/updateCategory`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  updateColor = (payload: any): Promise<IResponseData<IColor>> => {
    return axiosClient
      .post(`${this.uri}/colors/updateColor`, payload)
      .then((res) => res.data);
  };
  updateSize = (payload: any): Promise<IResponseData<ISize>> => {
    return axiosClient
      .post(`${this.uri}/sizes/updateSize`, payload)
      .then((res) => res.data);
  };
  updateBanner = (payload: any): Promise<IResponseData<IBanner>> => {
    return axiosClient
      .post(`${this.uri}/banners/updateBanner`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  getAllCategoriesNonTree = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IResponseCategory[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllCategoriesNonTree`, payload)
      .then((res) => res.data);
  };
  loginAdmin = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IResponseLogin>>> => {
    return axiosClient
      .post(`${this.uri}/login`, payload)
      .then((res) => res.data);
  };
  getAllUser = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IAccount[]>>> => {
    return axiosClient
      .post(`${this.uri}/users/getAllUser`, payload)
      .then((res) => res.data);
  };
  getAllVoucher = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IVoucher[]>>> => {
    return axiosClient
      .post(`${this.uri}/vouchers/getAllVoucher`, payload)
      .then((res) => res.data);
  };
  addVoucher = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IVoucher[]>>> => {
    return axiosClient
      .post(`${this.uri}/vouchers/addVoucher`, payload)
      .then((res) => res.data);
  };
  updateVoucher = (payload: any): Promise<IResponseData<IVoucher>> => {
    return axiosClient
      .post(`${this.uri}/vouchers/updateVoucher `, payload)
      .then((res) => res.data);
  };
  toggleStatus = (payload: any): Promise<IResponseData<IVoucher>> => {
    return axiosClient
      .post(`${this.uri}/vouchers/toggleStatus `, payload)
      .then((res) => res.data);
  };
  getOrdersPaging = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IOrder[]>>> => {
    return axiosClient
      .post(`${this.uri}/orders/getOrdersPaging`, payload)
      .then((res) => res.data);
  };
  updateOrders = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IOrder[]>>> => {
    return axiosClient
      .post(`${this.uri}/orders/updateOrder`, payload)
      .then((res) => res.data);
  };
  getReviewDetail = (payload: any): Promise<IResponseData<IReview[]>> => {
    return axiosClient
      .post(`${this.uri}/getCommentWithReply`, payload)
      .then((res) => res.data);
  };
  getParentReviewPaging = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IReview[]>>> => {
    return axiosClient
      .post(`${this.uri}/getParentCommentPaging`, payload)
      .then((res) => res.data);
  };
  deleteUser = (payload: any): Promise<IResponseData<IAccount>> => {
    return axiosClient
      .post(`${this.uri}/users/deleteUser`, payload)
      .then((res) => res.data);
  };
  deleteBanner = (payload: any): Promise<IResponseData<IBanner>> => {
    return axiosClient
      .post(`${this.uri}/banners/deleteBanner`, payload)
      .then((res) => res.data);
  };
  deleteOrder = (payload: any): Promise<IResponseData<any>> => {
    return axiosClient
      .post(`${this.uri}/orders/deleteOrder`, payload)
      .then((res) => res.data);
  };
  deleteCategory = (payload: any): Promise<IResponseData<ICategory>> => {
    return axiosClient
      .post(`${this.uri}/categories/deleteCategory`, payload)
      .then((res) => res.data);
  };
  deleteSize = (payload: any): Promise<IResponseData<ISize>> => {
    return axiosClient
      .post(`${this.uri}/sizes/deleteSize`, payload)
      .then((res) => res.data);
  };
  deleteColor = (payload: any): Promise<IResponseData<IColor>> => {
    return axiosClient
      .post(`${this.uri}/colors/deleteColor`, payload)
      .then((res) => res.data);
  };
  deleteVoucher = (payload: any): Promise<IResponseData<IVoucher>> => {
    return axiosClient
      .post(`${this.uri}/vouchers/deleteVoucher`, payload)
      .then((res) => res.data);
  };
  deleteProduct = (payload: any): Promise<IResponseData<IProduct>> => {
    return axiosClient
      .post(`${this.uri}/products/deleteProduct`, payload)
      .then((res) => res.data);
  };
  addUser = (payload: any): Promise<IResponseData<IAccount>> => {
    return axiosClient
      .post(`${this.uri}/users/addUser`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  updateUser = (payload: any): Promise<IResponseData<IAccount>> => {
    return axiosClient
      .post(`${this.uri}/users/updateUserAdmin`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  getUserByEmail = (payload?: any): Promise<IResponseData<IAccount>> => {
    return axiosClient
      .post(`${this.uri}/users/getUserInfoByEmail`, payload)
      .then((res) => res.data);
  };
}

const adminApi = new AdminApi();
export default adminApi;
