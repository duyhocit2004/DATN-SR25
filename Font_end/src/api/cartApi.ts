import {
  ICart,
  IProductCartStorage,
  IResponseData,
} from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Cart {
  id: string;
  name: string;
  email: string;
}

class CartApi extends BaseApi<Cart> {
  constructor() {
    super("carts"); // Gán URI 'carts' cho API này
  }
  getCartByLocalStorageData = (
    payload: any
  ): Promise<IResponseData<IProductCartStorage[]>> => {
    return axiosClient
      .post(`${this.uri}/getProductsInCart`, payload)
      .then((res) => res.data);
  };

  getCartByUserId = (): Promise<IResponseData<ICart[]>> => {
    return axiosClient
      .post(`${this.uri}/getProductsInCartByUserId`)
      .then((res) => res.data);
  };
  addToCart = (payload: any): Promise<IResponseData<ICart[]>> => {
    return axiosClient
      .post(`${this.uri}/addCart`, payload)
      .then((res) => res.data);
  };
  updateCart = (payload: any): Promise<IResponseData<ICart>> => {
    return axiosClient
      .post(`${this.uri}/updateCart`, payload)
      .then((res) => res.data);
  };
}

const cartApi = new CartApi();
export default cartApi;
