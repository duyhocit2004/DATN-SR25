import { NavLink } from "react-router-dom";
import SizeList from "./SizeList";
import { DeleteSize, ListSize, UpdateSize } from "../../../service/size/sizeService";
import { ISize } from "../../../interface/Size";
import { useEffect, useState } from "react";
import { Alert, Button, Spin } from "antd";

const Sizes: React.FC = () => {
    const [sizes, setSizes] = useState<ISize[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchSizes();
    }, []); // Gọi fetchSizes() một lần duy nhất

    // Hàm fetch dữ liệu
    const fetchSizes = async () => {
        setLoading(true);
        try {
            const data = await ListSize();
            console.log("✅ Dữ liệu size nhận được:", data);
            setSizes(Array.isArray(data) ? data : []);
        } catch (error: any) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    // Hàm cập nhật size
    const updateSizes = async (id: number | string, updateSize: ISize) => {
        try {
            await UpdateSize(id, updateSize);
            await fetchSizes(); // Gọi lại API để cập nhật danh sách
            alert("Cập nhật size thành công");
        } catch (error: any) {
            alert("Cập nhật size thất bại!");
            console.error("Update Size Error:", error?.message || error);
        }
    };

    // Hàm xóa size
    const deleteSizes = async (id: number | string) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa size này?");
            if (!confirmDelete) return;

            await DeleteSize(id);
            alert("Xóa size thành công!");
            await fetchSizes(); // Gọi lại API để cập nhật danh sách
        } catch (error) {
            console.error("Xóa size thất bại!");
        }
    };

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px" }}>
                <h1 style={{ margin: 0 }}>Danh Sách Size</h1>
                <NavLink to={`/admin/sizes/add-size`}>
                    <Button type="primary">Thêm Size</Button>
                </NavLink>
            </div>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                {loading && <Spin tip="Đang tải dữ liệu..." />}
                {error && <Alert message={`Lỗi: ${error}`} type="error" />}
                {!loading && !error && (
                    <SizeList
                        sizes={sizes}
                        updateSize={updateSizes}
                        deleteSize={deleteSizes}
                    />
                )}
            </div>
        </>


    );
};

export default Sizes;
