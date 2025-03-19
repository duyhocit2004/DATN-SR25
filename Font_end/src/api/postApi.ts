import axiosClient from "@/configs/axiosClient";
import BaseApi from "./baseApi";
import { IDataPaging, IPost, IResponseData } from "@/types/interface";
import { IResponsePost } from "@/admin/views/posts/types";

interface Post {
  id: string;
  name: string;
  email: string;
}

class PostApi extends BaseApi<Post> {
  constructor() {
    super("posts"); // Gán URI 'posts' cho API này
  }
  getPostsByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IResponsePost[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
  createPost = (payload: FormData): Promise<IResponseData<IPost>> => {
    return axiosClient
      .post(`/admin/products/addProductWithVariant`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  };
}

const postApi = new PostApi();
export default postApi;
