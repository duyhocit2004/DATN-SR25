import { NavLink } from "react-router-dom";
import CategoryList from "./CategoryList";

import { useEffect, useState } from "react";
import { ICategorie } from "../../../interface/Categories";
import { DeleteCategory, ListCategory, UpdateCategory } from "../../../service/category/categoriesService";

const Categories: React.FC = () => {
    const [categories, setCategories] = useState<ICategorie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    // Hàm fetch dữ liệu
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const data = await ListCategory();
            console.log("✅ Dữ liệu categories nhận được:", data);
            setCategories(Array.isArray(data) ? data : []);
        } catch (error: any) {
            setError(error.response ? error.response.data.message : error.message);
        } finally {
            setLoading(false);
        }
    };

    // Hàm cập nhật category
    const updateCategory = async (id: number | string, updateData: ICategorie) => {
        try {
            await UpdateCategory(id, updateData);
            await fetchCategories(); // Gọi lại API để cập nhật danh sách
            alert("Cập nhật category thành công");
        } catch (error: any) {
            alert("Cập nhật category thất bại!");
            console.error("Update Category Error:", error?.message || error);
        }
    };

    // Hàm xóa category
    const deleteCategory = async (id: number | string) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa category này?");
            if (!confirmDelete) return;

            await DeleteCategory(id);
            alert("Xóa category thành công!");
            await fetchCategories(); // Gọi lại API để cập nhật danh sách
        } catch (error) {
            console.error("Xóa category thất bại!");
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
                                    <h1 className="h2">Danh Sách Categories</h1>
                                    <div className="btn-toolbar mb-2 mb-md-0">
                                        <div className="btn-group me-2">
                                            <NavLink to={`/admin/categories/add-category`}>
                                                <button type="button" className="btn btn-sm btn-outline-secondary">
                                                    Thêm Category
                                                </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                {loading && <p>Đang tải dữ liệu...</p>}
                                {error && <p>Lỗi: {error}</p>}
                                {!loading && !error && (
                                    <CategoryList
                                        categories={categories}
                                        updateCategory={updateCategory}
                                        deleteCategory={deleteCategory}
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

export default Categories;
