import {
  IResponseData,
  IResponseLogin,
  IResponseRegister,
} from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Account {
  id: string;
  name: string;
  email: string;
}

class AccountApi extends BaseApi<Account> {
  constructor() {
    super("accounts"); // Gán URI 'accounts' cho API này
  }
  login = (payload: any): Promise<IResponseData<IResponseLogin>> => {
    return axiosClient.post(`/users/login`, payload).then((res) => res.data);
  };
  register = (payload: any): Promise<IResponseData<IResponseRegister>> => {
    return axiosClient.post(`/users/register`, payload).then((res) => res.data);
  };
  forgotPassword = (payload: { email: string }): Promise<IResponseData<any>> => {
    return axiosClient.post(`/users/forgotPassword`, payload).then((res) => res.data);
  };
}

const accountApi = new AccountApi();
export default accountApi;
 