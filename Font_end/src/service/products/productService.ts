import api from "../../axios/config";
import { IProducts } from "../../interface/Products";

// Lấy danh sách sản phẩm
export const ListProduct = async () => {
    try {
        const { data } = await api.get("/products");
        
        // Kiểm tra và lấy data.data nếu có
        if (!Array.isArray(data.data)) {
            console.error("❌ LỖI: API không trả về mảng", data);
            return [];
        }
        
        return data.data; // Trả về mảng sản phẩm
    } catch (error) {
        console.error("❌ Lỗi khi gọi API sản phẩm:", error);
        return [];
    }
};




// Lấy thông tin chi tiết một sản phẩm theo ID
export const GetProductById = async (id: number) => {
    try {
        const { data } = await api.get<IProducts>(`/products/${id}`);
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

// Thêm sản phẩm mới
export const AddProduct = async (product: IProducts) => {
    try {
        const { data } = await api.post<IProducts>('/products', product);
        return data;
    } catch (error) {
        console.error('Error creating product:', error);
        return null;
    }
};

// Cập nhật sản phẩm theo ID
export const UpdateProduct = async (id: number, product: Partial<IProducts>) => {
    try {
        const { data } = await api.put<IProducts>(`/products/${id}`, product);
        return data;
    } catch (error) {
        console.error('Error updating product:', error);
        return null;
    }
};

// Xóa sản phẩm theo ID
export const DeleteProduct = async (id: number) => {
    try {
        await api.delete(`/products/${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
};
