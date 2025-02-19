import axios from "axios";
import { AuthResponse, IUser } from "../interface/User";



// Đăng ký người dùng
export const registerUser = async (user: IUser): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/register", user);
  return response.data;
};

// Đăng nhập người dùng
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>("/login", { email, password });
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Người dùng chưa đăng nhập.");
  }

  await axios.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  localStorage.removeItem("token"); 
  
};
// Chi tiết sản phẩm

const API_URL = '/products'; 

export const getProductById = async (id: string) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};