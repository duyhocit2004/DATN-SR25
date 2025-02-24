import React from 'react';
import { Table, Button, Space } from 'antd';
import { NavLink } from 'react-router-dom';

type Size = {
  id: number;
  name: string;
};

type Props = {
  sizes: Size[];
  loading: boolean;
  error: string | null;
  deleteSize: (id: number | string) => void;
};

const ListSize: React.FC<Props> = ({ sizes, loading, error, deleteSize }) => {
  const safeSizes = Array.isArray(sizes) ? sizes : [];

  return (
    <div>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">Tên Size</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {loading && (
              <tr>
                <td colSpan={3}>Đang tải...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={3}>Lỗi: {error}</td>
              </tr>
            )}
            {safeSizes.length > 0 ? (
              safeSizes.map((size, index) => (
                <tr key={size.id}>
                  <td>{index + 1}</td>
                  <td>{size.name}</td>
                  <td>
                    <div className="action-buttons">
                      <NavLink to={`/admin/sizes/edit/${size.id}`}>
                        <button type="button" className="btn btn-warning">
                          Cập nhật
                        </button>
                      </NavLink>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteSize(size.id)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Không có dữ liệu</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListSize;
