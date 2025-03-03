import { AxiosError } from "axios";
import api from "../../axios/config";
import { ICategorie } from "../../interface/Categories";

// Lấy danh sách categories
export const ListCategory = async () => {
    try {
        const { data } = await api.get("/categories");

        // Kiểm tra nếu data là mảng trực tiếp
        if (!Array.isArray(data)) {
            console.error("LỖI: API không trả về mảng", data);
            return [];
        }

        return data;
    } catch (error) {
        console.error("Lỗi khi gọi API categories:", error);
        return [];
    }
};

// Lấy thông tin chi tiết một category theo ID
export const GetCategoryById = async (id: number) => {
    try {
        const { data } = await api.get<ICategorie>(`/categories/${id}`);
        return data;
    } catch (error) {
        console.error("Error fetching category:", error);
        return null;
    }
};

// Thêm category mới
export const AddCategory = async (category: ICategorie) => {
    try {
        const { data } = await api.post<ICategorie>("/categories", category);
        return data;
    } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error creating category:", axiosError.response?.data || axiosError.message);
        return null;
    }
};

// Cập nhật category theo ID
export const UpdateCategory = async (id: number, category: Partial<ICategorie>) => {
    try {
        const { data } = await api.put<ICategorie>(`/categories/${id}`, category);
        return data;
    } catch (error) {
        console.error("Error updating category:", error);
        return null;
    }
};

// Xóa category theo ID
export const DeleteCategory = async (id: number) => {
    try {
        await api.delete(`/categories/${id}`);
        return true;
    } catch (error) {
        console.error("Error deleting category:", error);
        return false;
    }
};
