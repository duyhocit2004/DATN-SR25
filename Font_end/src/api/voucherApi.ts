import { IDataPaging, IResponseData, IVoucher } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Voucher {
  id: string;
  name: string;
  email: string;
}

class VoucherApi extends BaseApi<Voucher> {
  constructor() {
    super("vouchers"); // Gán URI 'vouchers' cho API này
  }
  getVouchersByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IVoucher[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
}

const voucherApi = new VoucherApi();
export default voucherApi;
