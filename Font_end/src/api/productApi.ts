import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import {
  IColor,
  IDataPaging,
  IProduct,
  IResponseData,
  IResponseSize,
  ISize,
  IWishlist,
  IReview,
  IProductDetail,
} from "@/types/interface";

class ProductApi extends BaseApi<IProduct> {
  constructor() {
    super("products"); // Gán URI 'products' cho API này
    this.uri = "products";
  }

  getProductsByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IProduct[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
  createProduct = (payload: FormData): Promise<IResponseData<IProduct>> => {
    return axiosClient
      .post(`/admin/products/addProductWithVariant`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
  updateProduct = (payload: FormData): Promise<IResponseData<IProduct>> => {
    return axiosClient
      .post(`/admin/products/updateProductWithVariant`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };

  getProduct = (productId: number): Promise<IResponseData<IProduct>> => {
    return axiosClient
      .post(`${this.uri}/getProduct`, { productId: productId })
      .then((res) => res.data);
  };

  getProductVariant = (
    productId: number
  ): Promise<IResponseData<IProductDetail>> => {
    return axiosClient
      .post(`${this.uri}/getProductDetail`, { productId: productId.toString() })
      .then((res) => res.data);
  };
  getTopDiscountedProducts = (
    payload : any
  ): Promise<IResponseData<IProduct[]>> => {
    return axiosClient
      .post(`${this.uri}/getTopDiscountedProducts`,payload)
      .then((res) => res.data);
  };
  getTopNewestProducts = (): Promise<IResponseData<IProduct[]>> => {
    return axiosClient
      .post(`${this.uri}/getTopNewestProducts`)
      .then((res) => res.data);
  };
  getTopBestSellingProducts = (): Promise<IResponseData<IProduct[]>> => {
    return axiosClient
      .post(`${this.uri}/getTopBestSellingProducts`)
      .then((res) => res.data);
  };
  getRelatedProduct = (payload: any): Promise<IResponseData<IProduct[]>> => {
    return axiosClient
      .post(`${this.uri}/getRelatedProducts`, payload)
      .then((res) => res.data);
  };
  getSizeByProductIdAndColor = (
    payload: any
  ): Promise<IResponseData<IResponseSize[]>> => {
    return axiosClient
      .post(`${this.uri}/getSizeByProductIdAndColor`, payload)
      .then((res) => res.data);
  };
  getColorByProductIdAndSize = (
    payload: any
  ): Promise<IResponseData<IResponseSize[]>> => {
    return axiosClient
      .post(`${this.uri}/getColorByProductIdAndSize`, payload)
      .then((res) => res.data);
  };
  getAllSizes = (
    payload?: any
  ): Promise<IResponseData<IDataPaging<ISize[]> | ISize[]>> => {
    return axiosClient
      .post(`${this.uri}/getAllSizes`, payload)
      .then((res) => res.data);
  };
  getAllColors = (
    payload?: any
  ): Promise<IResponseData<IDataPaging<IColor[]> | IColor[]>> => {
    return axiosClient
      .post(`${this.uri}/getAllColors`, payload)
      .then((res) => res.data);
  };
  getWishListByUserId = (): Promise<IResponseData<IProduct[]>> => {
    return axiosClient.post(`${this.uri}/getWishList`).then((res) => res.data);
  };
  addWishList = (payload: any): Promise<IResponseData<IWishlist>> => {
    return axiosClient
      .post(`${this.uri}/addWishList`, payload)
      .then((res) => res.data);
  };
  getWishListStorage = (payload: any): Promise<IResponseData<IWishlist[]>> => {
    return axiosClient
      .post(`${this.uri}/getWishListStorage`, payload)
      .then((res) => res.data);
  };
  getReviewsByProductId = (payload: any): Promise<IResponseData<IReview[]>> => {
    return axiosClient
      .post(`${this.uri}/getComment`, payload)
      .then((res) => res.data);
  };
  addComment = (payload: any): Promise<IResponseData<IReview>> => {
    return axiosClient
      .post(`${this.uri}/addComment`, payload)
      .then((res) => res.data);
  };
  removeWishList = (payload: any): Promise<IResponseData<IWishlist>> => {
    return axiosClient
      .post(`${this.uri}/deleteWishList`, payload)
      .then((res) => res.data);
  };
}

const productApi = new ProductApi();
export default productApi;
