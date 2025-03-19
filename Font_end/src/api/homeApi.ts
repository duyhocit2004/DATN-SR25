import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import {
  IAllBanner,
  IBanner,
  IDataPaging,
  IListCategory,
  IResponseData,
} from "@/types/interface";

interface Home {
  id: string;
  name: string;
  email: string;
}

class HomeApi extends BaseApi<Home> {
  constructor() {
    super("home"); // Gán URI 'homes' cho API này
    this.uri = "home";
  }
  getAllCategories = (): Promise<IResponseData<IListCategory[]>> => {
    return axiosClient
      .post(`${this.uri}/getAllCategories`)
      .then((res) => res.data);
  };
  getCategoryDetail = (id: number) => {
    return axiosClient
      .get(`${this.uri}/getCategoryDetail/${id}`)
      .then((res) => res.data);
  };
  getParentCategories = (): Promise<IResponseData<IListCategory[]>> => {
    return axiosClient
      .post(`${this.uri}/getParentCategories`)
      .then((res) => res.data);
  };
  getChildrenCategories = (): Promise<IResponseData<IListCategory[]>> => {
    return axiosClient
      .post(`${this.uri}/getChildrenCategories`)
      .then((res) => res.data);
  };
  getAllBanners = (
    payload?: any
  ): Promise<IResponseData<IDataPaging<IBanner[]> | IAllBanner>> => {
    return axiosClient
      .post(`${this.uri}/getAllBanners`, payload)
      .then((res) => res.data);
  };
}

const homeApi = new HomeApi();
export default homeApi;
