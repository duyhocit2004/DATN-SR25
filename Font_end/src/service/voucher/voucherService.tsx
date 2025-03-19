import { AxiosError } from "axios";
import api from "../../axios/config";
import { IVoucher } from "../../interface/Voucher";

// Lấy danh sách voucher
export const ListVouchers = async () => {
    try {
        const { data } = await api.get("/vouchers");
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Lỗi khi gọi API voucher:", error);
        return [];
    }
};

// Lấy thông tin chi tiết một voucher theo ID
export const GetVoucherById = async (id: number) => {
    try {
        const { data } = await api.get<IVoucher>(`/vouchers/${id}`);
        return data;
    } catch (error) {
        console.error("Lỗi khi lấy voucher:", error);
        return null;
    }
};

// Thêm voucher mới
export const AddVoucher = async (voucher: IVoucher) => {
    try {
        const { data } = await api.post<IVoucher>("/vouchers", voucher);
        return data;
    } catch (error) {
        console.error("Lỗi khi tạo voucher:", error);
        return null;
    }
};

// Cập nhật voucher theo ID
export const UpdateVoucher = async (id: number, voucher: Partial<IVoucher>) => {
    try {
        const { data } = await api.put<IVoucher>(`/vouchers/${id}`, voucher);
        return data;
    } catch (error) {
        console.error("Lỗi khi cập nhật voucher:", error);
        return null;
    }
};

// Xóa voucher theo ID
export const DeleteVoucher = async (id: number) => {
    try {
        await api.delete(`/vouchers/${id}`);
        return true;
    } catch (error) {
        console.error("Lỗi khi xóa voucher:", error);
        return false;
    }
};

// Cập nhật trạng thái voucher (kích hoạt / vô hiệu hóa)
export const ToggleVoucherStatus = async (id: number) => {
    try {
        const { data } = await api.patch(`/vouchers/${id}/toggle-status`);
        return data;
    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái voucher:", error);
        return null;
    }
};
