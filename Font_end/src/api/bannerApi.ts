import { IBanner, IDataPaging, IResponseData } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Banner {
  id: string;
  name: string;
  email: string;
}

class BannerApi extends BaseApi<Banner> {
  constructor() {
    super("banners"); // Gán URI 'banners' cho API này
  }
  getBannersByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IBanner[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
}

const bannerApi = new BannerApi();
export default bannerApi;
