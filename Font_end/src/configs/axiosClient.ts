import { showToast } from "@/components/toast";
import axios from "axios";

// Tạo một instance của Axios
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL || "https://api.example.com", // Lấy URL từ env
  timeout: 300000, // Timeout request sau 10s
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor request: Gửi token nếu có
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



// Interceptor response: Xử lý lỗi chung
axiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    // if (response.data) {
    //   const status = response.data?.status;

    //   switch (status) {
    //     case 401:
    //       showToast({
    //         content: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!",
    //         duration: 5,
    //         type: "error",
    //       });
    //       localStorage.removeItem("access_token");
    //       // window.location.href = "/admin-login";
    //       break
    //     case 403:
    //       showToast({
    //         content: "Bạn không có quyền thực hiện thao tác này!",
    //         duration: 5,
    //         type: "error",
    //       });
    //       break
    //     case 500:
    //       showToast({
    //         content: "Lỗi máy chủ, vui lòng thử lại sau!",
    //         duration: 5,
    //         type: "error",
    //       });
    //       break
    //     default:
    //     // toast.error(error.response.data.message || "Đã có lỗi xảy ra!");
    //   }
    // }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      switch (status) {
        case 401:
          showToast({
            content: "Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!",
            duration: 5,
            type: "error",
          });
          localStorage.removeItem("access_token");
          // window.location.href = "/admin-login";
          break;
        case 403:
          showToast({
            content: "Bạn không có quyền thực hiện thao tác này!",
            duration: 5,
            type: "error",
          });
          break;
        case 500:
          showToast({
            content: "Lỗi máy chủ, vui lòng thử lại sau!",
            duration: 5,
            type: "error",
          });
          break;
        default:
        // toast.error(error.response.data.message || "Đã có lỗi xảy ra!");
      }
    } else {
      showToast({
        content: "Không thể kết nối đến server!",
        duration: 5,
        type: "error",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
