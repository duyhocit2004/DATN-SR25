import { IDataPaging, IResponseData, ISize } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Size {
  id: string;
  name: string;
  email: string;
}

class SizeApi extends BaseApi<Size> {
  constructor() {
    super("sizes"); // Gán URI 'sizes' cho API này
  }
  getSizesByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<ISize[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
}

const sizeApi = new SizeApi();
export default sizeApi;
