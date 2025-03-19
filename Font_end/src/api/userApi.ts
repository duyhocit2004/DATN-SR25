import { IAccount, IResponseData } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface User {
  id: string;
  name: string;
  email: string;
}

class UserApi extends BaseApi<User> {
  constructor() {
    super("users"); // Gán URI 'users' cho API này
  }
  getUserByEmail = (payload?: any): Promise<IResponseData<IAccount>> => {
    return axiosClient
      .post(`${this.uri}/getUserInfoByEmail`, payload)
      .then((res) => res.data);
  };
}

const userApi = new UserApi();
export default userApi;
