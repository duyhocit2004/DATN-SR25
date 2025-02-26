import { AxiosError } from "axios";
import api from "../../axios/config";
import { ISize } from "../../interface/Size";

export const ListSize = async () => {
    try {
        const { data } = await api.get("/sizes");
        
        // Kiểm tra nếu data là mảng trực tiếp
        if (!Array.isArray(data)) {
            console.error("LỖI: API không trả về mảng", data);
            return [];
        }

        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API kích thước:", error);
        return [];
    }
};

// Lấy thông tin chi tiết một kích thước theo ID
export const GetSizeById = async (id: number) => {
    try {
        const { data } = await api.get<ISize>(`/sizes/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching size:', error);
        return null;
    }
};

// Thêm kích thước mới
export const AddSize = async (size: ISize) => {
    try {
        const { data } = await api.post<ISize>('/sizes', size);
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error creating size:', axiosError.response?.data || axiosError.message);
        return null;
    }
};

// Cập nhật kích thước theo ID
export const UpdateSize = async (id: number, size: Partial<ISize>) => {
    try {
        const { data } = await api.put<ISize>(`/sizes/${id}`, size);
        return data;
    } catch (error) {
        console.error('Error updating size:', error);
        return null;
    }
};

// Xóa kích thước theo ID
export const DeleteSize = async (id: number) => {
    try {
        await api.delete(`/sizes/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting size:', error);
        return false;
    }
};
