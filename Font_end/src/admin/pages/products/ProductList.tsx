import React from 'react';
import { Table, Button, Space, Image, Card, message, Popconfirm } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { IProducts } from '../../../interface/Products';

type Props = {
    products: IProducts[];
    loading: boolean;
    error: string | null;
    updateProduct: (id: number | string, updateproduct: IProducts) => void;
    deleteProduct: (id: number | string) => void;
  };

  const ListProduct: React.FC<Props> = ({ products, loading, error, deleteProduct }) => {
    const safeproduct = Array.isArray(products) ? products : [];

    return (
        <div>
          <div className="table-responsive small">
        <table className="table table-striped table-sm">
          <thead>
            <tr className="text-center">
              <th scope="col">STT</th>
              <th scope="col">Tên Sản Phẩm</th>
              <th scope="col">SKU</th>
              <th scope="col">Giá Gốc</th>
              <th scope="col">Giá Sale</th>
              <th scope="col">Tồn Kho</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {loading && (
              <tr>
                <td colSpan={7}>Đang tải...</td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan={7}>Lỗi: {error}</td>
              </tr>
            )}
            {safeproduct.length > 0 ? (
              safeproduct.map((product, index) => (
                <tr key={product.id}>
                  <td>{index + 1}</td>
                  <td>{product.name_product}</td>
                  <td>{product.SKU}</td>
                  <td>{product.price_regular}₫</td>
                  <td>{product.price_sale}₫</td>
                  <td>{product.base_stock}</td>
                    <td>
                      <div className="action-buttons">
                        <NavLink to={`/admin/products/edit/${product.id}`}>
                          <button type="button" className="btn btn-warning">
                            Cập nhật
                          </button>
                        </NavLink>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteProduct(product.id)}
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

export default ListProduct;
