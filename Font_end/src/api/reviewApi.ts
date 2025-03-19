import { IDataPaging, IResponseData } from "@/types/interface";
import BaseApi from "./baseApi";
import axiosClient from "@/configs/axiosClient";
import { IResponseReview } from "@/admin/views/reviews/types";

interface Review {
  id: string;
  name: string;
  email: string;
}

class ReviewApi extends BaseApi<Review> {
  constructor() {
    super("reviews"); // Gán URI 'reviews' cho API này
  }
  getReviewsByFilter = (
    payload: any
  ): Promise<IResponseData<IDataPaging<IResponseReview[]>>> => {
    return axiosClient
      .post(`${this.uri}/getAllFilter`, payload)
      .then((res) => res.data);
  };
}

const reviewApi = new ReviewApi();
export default reviewApi;
