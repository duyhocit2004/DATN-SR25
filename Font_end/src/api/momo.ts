import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import { IResponseData } from "@/types/interface";

class MomoApi extends BaseApi<IMomoPayment> {
  [x: string]: any;
  constructor() {
    super("momo"); 
  }

  createPayment = (payload: any): Promise<IResponseData<IMomoPayment>> => {
    return axiosClient
      .post(`${this.uri}/create`, {
        ...payload,
        returnUrl: `${window.location.origin}/momo-return`, 
      })
      .then((res) => res.data);
  };
}

const momoApi = new MomoApi();
export default momoApi; 