import React from "react";
import { NavLink } from "react-router-dom";

type Category = {
  id: number;
  name: string;
  type: string;
};

type Props = {
  categories: Category[];
  loading: boolean;
  error: string | null;
  deleteCategory: (id: number | string) => void;
};

const ListCategory: React.FC<Props> = ({ categories, loading, error, deleteCategory }) => {
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">Tên Danh Mục</th>
              <th scope="col">Loại Danh Mục</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {loading && (
              <tr>
                <td colSpan={4}>Đang tải...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={4}>Lỗi: {error}</td>
              </tr>
            )}
            {safeCategories.length > 0 ? (
              safeCategories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.type}</td>
                  <td>
                    <div className="action-buttons">
                      <NavLink to={`/admin/categories/edit/${category.id}`}>
                        <button type="button" className="btn btn-warning">
                          Cập nhật
                        </button>
                      </NavLink>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteCategory(category.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListCategory;
