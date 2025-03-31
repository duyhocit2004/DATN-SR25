
import axiosClient from "@/configs/axiosClient";


const addressApi = {
    getProvinces: () => axiosClient.get("/api/api/p/"),
    getDistricts: (provinceId: string) =>
      axiosClient.get(`/api/api/d/?province_id=${provinceId}`),
    getWards: (districtId: string) =>
      axiosClient.get(`/api/api/w/?district_id=${districtId}`),
  };
  
export default addressApi;

