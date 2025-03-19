import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import {
  IDataPaging,
  IOrder,
  IResponseData,
  IVoucher,
} from "@/types/interface";

class OrderApi extends BaseApi<IOrder> {
  constructor() {
    super("orders"); // Gán URI 'orders' cho API này
  }
  getOrders = (payload: any): Promise<IResponseData<IDataPaging<IOrder[]>>> => {
    return axiosClient
      .post(`${this.uri}/getOrders`, payload)
      .then((res) => res.data);
  };
  addOrder = (payload: any): Promise<IResponseData<IOrder>> => {
    return axiosClient
      .post(`${this.uri}/addOrder`, payload)
      .then((res) => res.data);
  };
  getOrderDetail = (payload: any): Promise<IResponseData<IOrder>> => {
    return axiosClient
      .post(`${this.uri}/getOrderDetail`, payload)
      .then((res) => res.data);
  };
  getVoucher = (payload: any): Promise<IResponseData<IVoucher>> => {
    return axiosClient
      .post(`${this.uri}/getVoucher`, payload)
      .then((res) => res.data);
  };
}

const orderApi = new OrderApi();
export default orderApi;
