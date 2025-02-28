import { NavLink } from "react-router-dom";
import ColorList from "./ColorList";
import { DeleteColor, ListColor, UpdateColor } from "../../../service/color/colorService";
import { IColor } from "../../../interface/Color";
import { useEffect, useState } from "react";
import { Button, Space, Spin, Typography } from "antd";


const { Title } = Typography;

const Colors: React.FC = () => {
    const [colors, setColors] = useState<IColor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchColors();
    }, []); // Gọi fetchColors() một lần duy nhất

    // Hàm fetch dữ liệu
    const fetchColors = async () => {
        setLoading(true);
        try {
            const data = await ListColor();
            console.log("✅ Dữ liệu màu nhận được:", data);
            setColors(Array.isArray(data) ? data : []);
        } catch (error: any) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    // Hàm cập nhật màu
    const updateColors = async (id: number | string, updateColor: IColor) => {
        try {
            await UpdateColor(id, updateColor);
            await fetchColors(); // Gọi lại API để cập nhật danh sách
            alert("Cập nhật màu thành công");
        } catch (error: any) {
            alert("Cập nhật màu thất bại!");
            console.error("Update Color Error:", error?.message || error);
        }
    };

    // Hàm xóa màu
    const deleteColors = async (id: number | string) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa màu này?");
            if (!confirmDelete) return;

            await DeleteColor(id);
            alert("Xóa màu thành công!");
            await fetchColors(); // Gọi lại API để cập nhật danh sách
        } catch (error) {
            console.error("Xóa màu thất bại!");
        }
    };

    return (
        <>
            <div style={{ padding: 24 }}>
                <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: 16 }}>
                    <Title level={2}>Danh Sách Màu</Title>
                    <NavLink to="/admin/colors/add-color">
                        <Button type="primary">Thêm Màu</Button>
                    </NavLink>
                </Space>
                {loading ? (
                    <Spin size="large" />
                ) : error ? (
                    <Typography.Text type="danger">Lỗi: {error}</Typography.Text>
                ) : (
                    <ColorList
                        colors={colors}
                        updateColor={updateColors}
                        deleteColor={deleteColors} />
                )}
            </div>
        </>

    );
};

export default Colors;
