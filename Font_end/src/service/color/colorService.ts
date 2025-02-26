import { AxiosError } from "axios";
import api from "../../axios/config";
import { IColor } from "../../interface/Color";

export const ListColor = async () => {
    try {
        const { data } = await api.get("/colors");
        
        // Kiểm tra nếu data là mảng trực tiếp
        if (!Array.isArray(data)) {
            console.error("LỖI: API không trả về mảng", data);
            return [];
        }

        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API màu:", error);
        return [];
    }
};


// Lấy thông tin chi tiết một màu theo ID
export const GetColorById = async (id: number) => {
    try {
        const { data } = await api.get<IColor>(`/colors/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching color:', error);
        return null;
    }
};

// Thêm màu mới
export const AddColor = async (color: IColor) => {
    try {
        const { data } = await api.post<IColor>('/colors', color);
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error('Error creating color:', axiosError.response?.data || axiosError.message);
        return null;
    }
};

// Cập nhật màu theo ID
export const UpdateColor = async (id: number, color: Partial<IColor>) => {
    try {
        const { data } = await api.put<IColor>(`/colors/${id}`, color);
        return data;
    } catch (error) {
        console.error('Error updating color:', error);
        return null;
    }
};

// Xóa màu theo ID
export const DeleteColor = async (id: number) => {
    try {
        await api.delete(`/colors/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting color:', error);
        return false;
    }
};
