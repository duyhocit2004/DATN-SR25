import {
  Button,
  Cascader,
  GetProp,
  Input,
  Rate,
  Select,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import "./index.scss";
import { IListCategory, IProduct } from "@/types/interface";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import homeApi from "@/api/homeApi";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

const { Option } = Select;

const initData: IProduct[] = [
  {
    id: 1,
    image: "abc",
    name: "Amv",
    quantity: 10,
    priceRegular: 20000000,
    priceSale: 18000000,
    discount: 20,
    listSizes: [],
    listColors: [],
    categoriesId: 1,
    quantitySold: 10,
    listImage: [],
    rate: 4,
    description: "fewrjigfiwgefi",
  },
  {
    id: 2,
    image: "abc",
    name: "Amv",
    quantity: 10,
    priceRegular: 20000000,
    priceSale: 18000000,
    discount: 20,
    listSizes: [],
    listColors: [],
    categoriesId: 1,
    quantitySold: 10,
    listImage: [],
    rate: 3.5,
    description: "fewrjigfiwgefi",
  },
  {
    id: 3,
    image: "abc",
    name: "Amv",
    quantity: 10,
    priceRegular: 20000000,
    priceSale: 18000000,
    discount: 20,
    listSizes: [],
    listColors: [],
    categoriesId: 1,
    quantitySold: 10,
    listImage: [],
    rate: 0,
    description: "fewrjigfiwgefi",
  },
  {
    id: 4,
    image: "abc",
    name: "Amv",
    quantity: 10,
    priceRegular: 20000000,
    priceSale: 18000000,
    discount: 20,
    listSizes: [],
    listColors: [],
    categoriesId: 1,
    quantitySold: 10,
    listImage: [],
    rate: 0,
    description: "fewrjigfiwgefi",
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
  const [data, setData] = useState<IProduct[]>();
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
  const columns: ColumnsType<IProduct> = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (value: any, record: any, index: number) => {
        return (
          <span>
            {((pagination?.current || pageDefault) - 1) *
              (pagination?.pageSize || sizeDefault) +
              index +
              1}
          </span>
        );
      },
      minWidth: 70,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (value) => {
        return <img src={value} alt="avatar" width={100} height={100} />;
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
    {
      title: "Mô tả",
      dataIndex: "description",
      minWidth: 350,
    },
    {
      title: "Đánh giá",
      dataIndex: "rate",
      minWidth: 180,
      render: (value, record, index) => {
        return <Rate value={value} allowHalf disabled />;
      },
    },
    {
      title: "Hành động",
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
                onClick={() => {
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
        setData(response.data.data || initData);
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
        <Table<IProduct>
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={data}
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
