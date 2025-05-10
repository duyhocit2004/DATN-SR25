import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import {
  IDataPaging,
  IOrder,
  IResponseData,
  IResponseOrder,
  IVoucher,
} from "@/types/interface";

class OrderApi extends BaseApi<IOrder> {
  constructor() {
    super("orders"); // Gán URI 'orders' cho API này
  }
  getOrders = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IOrder[]> | IOrder[]>> => {
    return axiosClient
      .post(`${this.uri}/getOrders`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => res.data);
  };
  addOrder = (payload: any): Promise<IResponseData<IResponseOrder>> => {
    return axiosClient
      .post(`${this.uri}/addOrder`, payload)
      .then((res) => res.data);
  };
  getOrderDetail = (payload: any): Promise<IResponseData<IOrder>> => {
    return axiosClient
      .post(`${this.uri}/getOrderDetail`, payload)
      .then((res) => res.data);
  };
  updateOrder = (payload: any): Promise<IResponseData<IOrder>> => {
    return axiosClient
      .post(`${this.uri}/updateOrder`, payload)
      .then((res) => res.data);
  };
  deleteOrder = (payload: { id: string }): Promise<IResponseData<IOrder>> => {
    return axiosClient
      .post(`${this.uri}/deleteOrder`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      })
      .then((res) => res.data);
  };


  refundOrder = (payload: { 
    orderId: number, 
    refundMethod?: string,
    adminName?: string,
    adminEmail?: string
  }): Promise<IResponseData<IOrder>> => {
    return axiosClient
      .post(`/admin/orders/refundOrder`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      })
      .then((res) => res.data);
  };


  getVoucher = (payload: any): Promise<IResponseData<IVoucher>> => {
    return axiosClient
      .post(`${this.uri}/getVoucher`, payload)
      .then((res) => res.data);
  };


   cancelOrderByClient = (payload: any): Promise<IResponseData<IResponseOrder>> => {
    console.log("Gọi API cancelOrderByClient với payload:", payload);
    return axiosClient
      .post(`${this.uri}/cancelOrderByClient`, payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("API response:", res.data);
        return res.data;
      })
      .catch((error) => {
        console.error("API error:", error);
        throw error;
      });
  };
  
}

const orderApi = new OrderApi();
export default orderApi;
