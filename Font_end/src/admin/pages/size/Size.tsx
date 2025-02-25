import { NavLink } from "react-router-dom";
import SizeList from "./SizeList";
import { DeleteSize, ListSize, UpdateSize } from "../../../service/size/sizeService";
import { ISize } from "../../../interface/Size";
import { useEffect, useState } from "react";

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
        <div>
            <div className="dashboards">
                <div>
                    <div className="container-fluid">
                        <div className="row">
                            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                    <h1 className="h2">Danh Sách Size</h1>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group me-2">
                                            <NavLink to={`/admin/sizes/add-size`}>
                                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                                    Thêm Size
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {loading && <p>Đang tải dữ liệu...</p>}
                                {error && <p>Lỗi: {error}</p>}
                                {!loading && !error && (
                                    <SizeList
                                        sizes={sizes}
                                        updateSize={updateSizes}
                                        deleteSize={deleteSizes}
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

export default Sizes;
