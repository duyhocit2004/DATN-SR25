import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteProduct,
  fetchProducts,
  setPagination,
} from "@/store/reducers/adminProductSlice";
import { IProduct } from "@/types/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Rate, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { products, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminProduct
  );
  const columns: ColumnsType<IProduct> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value: any, record: any, index: number) => {
        return (
          <span>
            {(pagination?.page - 1) * pagination?.pageSize + index + 1}
          </span>
        );
      },
      minWidth: 70,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (value) => {
        return value ? (
          <img src={value} alt="avatar" width={100} height={100} />
        ) : null;
      },
      minWidth: 150,
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      minWidth: 250,
    },
    {
      title: "Danh mục",
      dataIndex: "categoriesName",
      minWidth: 200,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      minWidth: 150,
    },
    // {
    //   title: "Mô tả",
    //   dataIndex: "description",
    //   minWidth: 350,
    // },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      minWidth: 180,
      render: (value) => {
        return <Rate value={value} allowHalf disabled />;
      },
    },
    {
      title: "Hành động",
      dataIndex: "action",
      minWidth: 120,
      fixed: "right",
      render: (_, record) => {
        return (
          <div className="actions">
            <Tooltip title={"Xóa"}>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(record.id);
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleDeleteProduct = async (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchProducts());
  };

  const onRowClick = (record: IProduct) => {
    navigate("/admin/products/" + record?.id);
  };
  return (
    <Table<IProduct>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={products}
      pagination={{
        pageSize: pagination?.pageSize,
        current: pagination?.page,
        showSizeChanger: true,
        total: totalElements,
        pageSizeOptions: [5, 10, 15, 20],
        showTotal(total) {
          return "Tổng: " + total;
        },
        onChange: handlePagingChange,
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            onRowClick(record);
          }, // click row
        };
      }}
      tableLayout="auto"
      loading={loading}
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
    />
  );
};
export default ProductTable;
