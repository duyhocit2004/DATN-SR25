import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import { IResponseData } from "@/types/interface";

class VNPayApi extends BaseApi<IVNPAYPayment> {
  [x: string]: any;
  constructor() {
    super("vnpay"); 
  }

  createPayment = (payload: any): Promise<IResponseData<IVNPAYPayment>> => {
    return axiosClient
      .post(`${this.uri}/create`, {
        ...payload,
        returnUrl: `${window.location.origin}/return`, 
      })
      .then((res) => res.data);
  };
  
}

const vnpayApi = new VNPayApi();
export default vnpayApi;

