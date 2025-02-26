import React from 'react';
import { Table, Button, Space } from 'antd';
import { NavLink } from 'react-router-dom';

type Color = {
  id: number;
  name: string;
};

type Props = {
  colors: Color[];
  loading: boolean;
  error: string | null;
  deleteColor: (id: number | string) => void;
};

const ListColor: React.FC<Props> = ({ colors, loading, error, deleteColor }) => {
  const safeColors = Array.isArray(colors) ? colors : [];

  return (
    <div>
      <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">Tên Màu</th>
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
            {safeColors.length > 0 ? (
              safeColors.map((color, index) => (
                <tr key={color.id}>
                  <td>{index + 1}</td>
                  <td>{color.name}</td>
                  <td>
                    <div className="action-buttons">
                      <NavLink to={`/admin/colors/edit/${color.id}`}>
                        <button type="button" className="btn btn-warning">
                          Cập nhật
                        </button>
                      </NavLink>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteColor(color.id)}
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

export default ListColor;
