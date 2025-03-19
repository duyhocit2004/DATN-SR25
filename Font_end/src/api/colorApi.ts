import { IColor, IDataPaging, IResponseData } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Color {
  id: string;
  name: string;
  email: string;
}

class ColorApi extends BaseApi<Color> {
  constructor() {
    super("colors"); // Gán URI 'colors' cho API này
  }
  getColorsByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IColor[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
}

const colorApi = new ColorApi();
export default colorApi;
