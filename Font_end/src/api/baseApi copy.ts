// src/apis/BaseApi.ts
import axiosClient from "@/configs/axiosClient";
import { IResponseData } from "@/types/interface";

class BaseApi<T> {
  protected uri: string;

  constructor(uri: string) {
    this.uri = uri; // Gán URI cho mỗi API con
  }

  // Phương thức GET tất cả
  getAll(): Promise<IResponseData<T[]>> {
    return axiosClient
      .get(`/${this.uri}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching ${this.uri}:`, error);
        throw error;
      });
  }

  // Phương thức GET theo ID
  getById(id: string): Promise<IResponseData<T>> {
    return axiosClient
      .get(`/${this.uri}/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error fetching ${this.uri} with id ${id}:`, error);
        throw error;
      });
  }

  // Phương thức POST (Thêm mới)
  add(data: T): Promise<IResponseData<T>> {
    return axiosClient
      .post(`/${this.uri}`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error adding to ${this.uri}:`, error);
        throw error;
      });
  }

  // Phương thức PUT (Cập nhật)
  edit(id: string, data: T): Promise<IResponseData<T>> {
    return axiosClient
      .put(`/${this.uri}/${id}`, data)
      .then((response) => response.data)
      .catch((error) => {
        console.error(`Error editing ${this.uri} with id ${id}:`, error);
        throw error;
      });
  }

  // Phương thức DELETE
  delete(id: string): Promise<void> {
    return axiosClient
      .delete(`/${this.uri}/${id}`)
      .then(() => {
        console.log(`${this.uri} with id ${id} deleted successfully`);
      })
      .catch((error) => {
        console.error(`Error deleting ${this.uri} with id ${id}:`, error);
        throw error;
      });
  }

  // Phương thức DELETE nhiều đối tượng
  deleteMulti(ids: string[]): Promise<void> {
    return axiosClient
      .post(`/${this.uri}/delete-multi`, { ids })
      .then(() => {
        console.log(
          `${this.uri} with ids ${ids.join(", ")} deleted successfully`
        );
      })
      .catch((error) => {
        console.error(`Error deleting multiple ${this.uri}:`, error);
        throw error;
      });
  }
}

export default BaseApi;
