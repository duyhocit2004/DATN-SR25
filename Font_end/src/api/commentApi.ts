import axiosClient from "@/configs/axiosClient";
import { IResponseData } from "@/types/interface";

const commentApi = {
  addComment: (payload: {
    productId: number;
    content: string;
    rate: number;
    phoneNumber: string;
    parentId?: number;
  }): Promise<IResponseData<any>> => {
    return axiosClient.post("/products/addComment", payload).then(res => res.data);
  },
};

export default commentApi; 