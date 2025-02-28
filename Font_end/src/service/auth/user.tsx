import api from "../../axios/config";
import { IUser } from "../../interface/User";


// Lấy danh sách Users
export const ListUsers = async () => {
  try {
    const { data } = await api.get<IUser[]>("users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
};

export const UserById = async (id: string) => {
  try {
      const response = await api.get(`/users`); // Đảm bảo API endpoint đúng
      console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về
      return response.data; // Trả về danh sách users
  } catch (error) {
      console.error("Lỗi khi gọi API UserById:", error);
      return [];
  }
};


// Thêm User mới
export const UserAdd = async (userData: IUser) => {
  try {
    const { data } = await api.post<{ user: IUser }>("users", userData);
    return data.user;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Cập nhật thông tin User
export const UserUpdate = async (id: number | string, userData: Partial<IUser>) => {
  try {
    const { data } = await api.put<{ user: IUser }>(`users/${id}`, userData);
    return data.user;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Xóa User
export const UserDelete = async (id: number | string) => {
  try {
    const { data } = await api.delete<{ message: string }>(`users/${id}`);
    return data.message;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};