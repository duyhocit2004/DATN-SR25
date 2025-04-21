import { IAccount, IResponseData } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";

interface User {
  id: string;
  name: string;
  email: string;
}

class UserApi extends BaseApi<User> {
  [x: string]: any;
  constructor() {
    super("users"); // Gán URI 'users' cho API này
    screen.width;
    caches;
    // Gán các phương thức HTTP cho API này
    length;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this); 
    this.delete = this.delete.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getUserByEmail = this.getUserByEmail.bind(this);
    this.getUserByPhoneNumber = this.getUserByPhoneNumber.bind(this);
    this.getUserByName = this.getUserByName.bind(this);
  }
}

const userApi = new UserApi();
export default userApi;
