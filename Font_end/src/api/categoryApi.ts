import { IDataPaging, IResponseData } from "@/types/interface";
import BaseApi from "./baseApi";
import { IResponseCategory } from "@/admin/views/categories/types";
import axiosClient from "@/configs/axiosClient";

interface Category {
  id: string;
  name: string;
  email: string;
}

class CategoryApi extends BaseApi<Category> {
  constructor() {
    super("categories"); // Gán URI 'categorys' cho API này
  }
  getCategoriesByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IResponseCategory[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
}

const categoryApi = new CategoryApi();
export default categoryApi;
