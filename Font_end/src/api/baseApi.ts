// src/api/BaseApi.ts
import axiosClient from "@/configs/axiosClient";
import { IResponseData } from "@/types/interface";

class BaseApi<T> {
  protected uri: string;

  constructor(uri: string) {
    this.uri = uri;
  }

  // Get All
  getAllFilter = <R = T[]>(): Promise<IResponseData<R>> => {
    return axiosClient.get(`/${this.uri}`).then(res=>res.data);
  };
  // Get All
  getAll = <R = T[]>(): Promise<IResponseData<R>> => {
    return axiosClient.get(`/${this.uri}`).then(res=>res.data);
  };

  // Get By ID
  getById = <R = T>(id: any): Promise<IResponseData<R>> => {
    return axiosClient.get(`/${this.uri}/${id}`).then(res=>res.data);
  };

  // Create
  create = <R = T>(data: Partial<T>): Promise<IResponseData<R>> => {
    return axiosClient.post(`/${this.uri}`, data).then(res=>res.data);
  };

  // Update (cho phép kiểu dữ liệu trả về khác)
  update = <R = T>(id: any, data: Partial<T>): Promise<IResponseData<R>> => {
    return axiosClient.put(`/${this.uri}/${id}`, data).then(res=>res.data);
  };

  // Delete
  delete = <R = void>(id: any): Promise<IResponseData<R>> => {
    return axiosClient.delete(`/${this.uri}/${id}`).then(res=>res.data);
  };
}

export default BaseApi;
