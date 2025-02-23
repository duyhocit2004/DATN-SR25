import { NavLink } from "react-router-dom";
import ColorList from "./ColorList";
import { DeleteColor, ListColor, UpdateColor } from "../../../service/color/colorService";
import { IColor } from "../../../interface/Color";
import { useEffect, useState } from "react";

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
        <div>
            <div className="dashboards">
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Danh Sách Màu</h1>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group me-2">
                                            <NavLink to={`/admin/colors/add-color`}>
                                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                                    Thêm Màu
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {loading && <p>Đang tải dữ liệu...</p>}
                                {error && <p>Lỗi: {error}</p>}
                                {!loading && !error && (
                                    <ColorList
                                        colors={colors}
                                        updateColor={updateColors}
                                        deleteColor={deleteColors}
                                    />
                                )}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Colors;
