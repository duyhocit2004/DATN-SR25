import axiosClient from "../configs/axiosClient";

const addressApi = {
    getProvinces: () => axiosClient.get("provinces"),
    getDistricts: (provinceId: string) =>
      axiosClient.get(`districts/${provinceId}`),
    getWards: (districtId: string) =>
      axiosClient.get(`wards/${districtId}`),
    getUserLocations: () => axiosClient.get("locations"),
  };
  
export default addressApi;

