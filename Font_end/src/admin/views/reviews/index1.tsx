import {
  Avatar,
  Button,
  Cascader,
  Collapse,
  GetProp,
  Image,
  Input,
  Rate,
  Select,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { IListCategory, IProduct } from "@/types/interface";
import { DeleteOutlined, PlusOutlined, SendOutlined } from "@ant-design/icons";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import homeApi from "@/api/homeApi";
import TextArea from "antd/es/input/TextArea";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

const { Option } = Select;
const { Panel } = Collapse;

export interface IReview {
  id: string;
  product: {
    name: string;
    image: string;
    sku: string;
  };
  customer: {
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  status: "Chờ duyệt" | "Đã duyệt" | "Đã ẩn";
  replies?: IReply[];
}

export interface IReply {
  id: string;
  user: {
    name: string;
    avatar: string;
    isAdmin: boolean;
  };
  content: string;
  createdAt: string;
}

export const reviews: IReview[] = [
  {
    id: "1",
    product: {
      name: "Tai nghe Bluetooth XYZ",
      image: "https://via.placeholder.com/80",
      sku: "SKU12345",
    },
    customer: {
      name: "Nguyễn Văn A",
      avatar: "https://via.placeholder.com/40",
    },
    rating: 5,
    content: "Sản phẩm rất tốt! Âm thanh trong trẻo, pin trâu.",
    images: ["https://via.placeholder.com/100"],
    createdAt: "2025-03-10",
    status: "Đã duyệt",
    replies: [
      {
        id: "r1",
        user: {
          name: "Trần B",
          avatar: "https://via.placeholder.com/40",
          isAdmin: false,
        },
        content: "Mình cũng mua rồi, dùng rất ưng!",
        createdAt: "2025-03-11",
      },
      {
        id: "r2",
        user: {
          name: "Admin",
          avatar: "https://via.placeholder.com/40",
          isAdmin: true,
        },
        content:
          "Cảm ơn bạn đã ủng hộ! Hy vọng bạn tiếp tục đồng hành cùng shop.",
        createdAt: "2025-03-12",
      },
    ],
  },
];
interface IFilter {
  keyword: string;
  categoryId: string | null;
}
interface IPayloadSearch {
  name: string;
  categoriesId: string | null;
  pageNum: number;
  pageSize: number;
}

const pageDefault = 1;
const sizeDefault = 10;

const ListProduct = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<IReview[]>();
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: sizeDefault,
    current: pageDefault,
  });
  const [filterData, setFilterData] = useState<IFilter>({
    keyword: "",
    categoryId: null,
  });
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product: IReview["product"]) => (
        <div className="flex gap-2 items-center">
          <Image width={50} src={product.image} />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer: IReview["customer"]) => (
        <div className="flex gap-2 items-center">
          <Avatar src={customer.avatar} />
          <span>{customer.name}</span>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Đã duyệt"
            ? "green"
            : status === "Chờ duyệt"
            ? "orange"
            : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Phản hồi",
      dataIndex: "replies",
      key: "replies",
      render: (replies?: IReview["replies"]) => (
        <span className="text-blue-600 font-medium">
          {replies?.length || 0} phản hồi
        </span>
      ),
    },
    {
      title: "Hành động",

      key: "action",
      render: (_, record: IReview) => (
        <Button type="link" onClick={() => navigate(`/admin/reviews/${record.id}`)}>
          Xem chi tiết
        </Button>
      ),
========
      dataIndex: "action",
      minWidth: 120,
      fixed: "right",
      render: (value, record, index) => {
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
  useEffect(() => {
    const payload: IPayloadSearch = {
      name: "",
      categoriesId: null,
      pageNum: pageDefault,
      pageSize: sizeDefault,
    };
    fetchData(payload);
    getCategories();
  }, []);

  const fetchData = async (payload: IPayloadSearch) => {
    setLoading(true);

    try {
      const response = await productApi.getProductsByFilter(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        setData(response.data.data || reviews);
        setTotalElements(response.data.total);
      } else {
        setData([]);
        setTotalElements(0);
      }
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await homeApi.getAllCategories();
      if (response?.status === HttpCodeString.SUCCESS) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };

  const handlePagingChange = (page: number, size: number) => {
    setPagination({
      pageSize: size,
      current: page,
    });
    const payload: IPayloadSearch = {
      name: filterData.keyword,
      categoriesId:
        filterData.categoryId && filterData.categoryId?.length > 0
          ? filterData.categoryId[filterData.categoryId?.length - 1]
          : null,
      pageNum: page && page > 0 ? page : pageDefault,
      pageSize: size && size > 0 ? size : sizeDefault,
    };
    fetchData(payload);
  };

  const onChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleDeleteProduct = async (productId: number) => {
    //call api
    setLoading(true);
    try {
      const response = await productApi.delete(productId);
      if (response?.status === HttpCodeString.SUCCESS) {
        // setData(response.data | |initData);
        // setTotalElements(initData.length);
      } else {
        // setData([]);
        // setTotalElements(0);
      }
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const payload: IPayloadSearch = {
      name: filterData.keyword,
      categoriesId:
        filterData.categoryId && filterData.categoryId?.length > 0
          ? filterData.categoryId[filterData.categoryId?.length - 1]
          : null,
      pageNum: pageDefault,
      pageSize: pagination.pageSize || sizeDefault,
    };
    setPagination({
      current: pageDefault,
      pageSize: pagination.pageSize || sizeDefault,
    });
    fetchData(payload);
  };
  const handleAdd = () => {
    navigate("/admin/products/create");
  };
  return (
    <div className="list-product-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <div className="filter-data flex items-center gap-2">
          <div className="control-area flex items-center gap-2 flex-1">
            <Input
              className="!w-96"
              value={filterData.keyword}
              placeholder={"Tìm kiếm"}
              defaultValue={""}
              maxLength={200}
              onChange={(val) => {
                onChangeFilter("keyword", val.target.value);
              }}
            />

            <Cascader
              className="!w-96"
              options={categories?.map((e) => {
                return {
                  value: e.id,
                  label: e.name,
                  children: e.children?.map((child) => {
                    return {
                      value: child.id,
                      label: child.name,
                    };
                  }),
                };
              })}
              onChange={(value: number[]) => {
                onChangeFilter("categoryId", value);
              }}
              placeholder="Chọn danh mục"
            />
          </div>
          <Button type="primary" className="w-100px" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div className="header-bottom mb-4">
        <div className="actions">
          <Button
            className="w-100px"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="table-area">
        <Table<IReview>
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={reviews}
          pagination={{
            pageSize: pagination?.pageSize,
            current: pagination?.current,
            showSizeChanger: true,
            total: totalElements,
            pageSizeOptions: [5, 10, 15, 20],
            showTotal(total, range) {
              return "Tổng: " + total;
            },
            onChange: handlePagingChange,
          }}
          tableLayout="auto"
          loading={loading}
          scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
        />
      </div>
    </div>
  );
};

export default ListProduct;
