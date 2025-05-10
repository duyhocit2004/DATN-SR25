import BaseApi from "../api/baseApi";
import axiosClient from "../configs/axiosClient";

class LocationApi extends BaseApi {
  constructor() {
    super("locations"); // endpoint: /api/locations
  }
  // Nếu cần mở rộng thêm các hàm đặc biệt, thêm ở đây
  async getAll() {
    try {
      console.log('Calling location API...');
      const response = await axiosClient.get("/locations");
      console.log('Location API raw response:', response);
      return response;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }
}

const locationApi = new LocationApi();
export default locationApi; 