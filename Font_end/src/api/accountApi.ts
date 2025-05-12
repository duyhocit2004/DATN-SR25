import {
  IResponseData,
  IResponseRegister,
} from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface Account {
  id: string;
  name: string;
  email: string;
}

interface IResponseLogin {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresTime: number;
  user: {
    id: number;
    name: string;
    email: string;
    phone_number: string;
    role: string;
    gender: string;
    userImage: string | null;
    status: string;
  };
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
 