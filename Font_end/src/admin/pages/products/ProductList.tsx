import React from "react";
import { Table, Button, Image, Card, message, Popconfirm, Typography, Space } from "antd";
import { NavLink } from "react-router-dom";
import { IProducts } from "../../../interface/Products";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { Text } = Typography;

type Props = {
  products: IProducts[];
  loading: boolean;
  error: string | null;
  deleteProduct: (id: number | string) => void;
};

const ListProduct: React.FC<Props> = ({ products, loading, error, deleteProduct }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: IProducts, index: number) => <Text>{index + 1}</Text>,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "name_product",
      key: "name_product",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Hình Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string, record: IProducts) => (
        <Image width={50} src={image} alt={record.name_product} />
      ),
    },
    {
      title: "Giá Gốc",
      dataIndex: "price_regular",
      key: "price_regular",
      render: (price: number) => <Text>{price.toLocaleString()}₫</Text>,
    },
    {
      title: "Giá Sale",
      dataIndex: "price_sale",
      key: "price_sale",
      render: (price: number) => (
        <Text type="danger">{price.toLocaleString()}₫</Text>
      ),
    },
    {
      title: "Tồn Kho",
      dataIndex: "base_stock",
      key: "base_stock",
      render: (stock: number) => <Text>{stock}</Text>,
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (_: any, record: IProducts) => (
        <Space>
          <NavLink to={`/admin/products/edit/${record.id}`}>
            <Button type="primary" icon={<EditOutlined />} size="middle">
              Cập nhật
            </Button>
          </NavLink>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa?"
            onConfirm={() => deleteProduct(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} size="middle">
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
   
      <Table
        columns={columns}
        dataSource={products.map((product, index) => ({ ...product, key: product.id, index }))}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    
  );
};

export default ListProduct;
