import { Button, GetProp, Input, Select, Table, TableProps } from "antd";
import { useEffect, useState } from "react";
import "./index.scss";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

const { Option } = Select;
interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

const initData: DataType[] = [
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "1",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "2",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "3",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "4",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "5",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "6",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "7",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "8",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "9",
    },
  },
  {
    name: {
      first: "Thang",
      last: "Long",
    },
    gender: "Nam",
    email: "string@gmail.com",
    login: {
      uuid: "10",
    },
  },
];
const categories = [{ id: "1", name: "Alo" }];
interface IFilter {
  keyword: string;
  category: string | null;
}

const ListProduct = () => {
  const [data, setData] = useState<DataType[]>();
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
  });
  const [filterData, setFilterData] = useState<IFilter>({
    keyword: "",
    category: null,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      render: (value, record, index) =>
        `${record?.name?.first} ${record?.name?.last} ${record?.login?.uuid}`,
      width: "20%",
    },
    {
      title: "PersonType",
      dataIndex: "gender",
      sorter: true,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
    },
  ];

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(pagination.pageSize), JSON.stringify(pagination.current)]);

  const fetchData = () => {
    setLoading(true);

    setData(initData);
    setTotalElements(initData.length);
    setLoading(false);
  };

  const handlePagingChange = (page: number, size: number) => {
    setPagination({
      pageSize: size,
      current: page,
    });
  };

  const onChangeFilter = (key: string, value: any) => {
    setFilterData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  return (
    <div className="list-product-container">
      <div className="filter-area w-full flex items-center gap-2 mb-4">
        <div className="control-area flex items-center gap-2 flex-1">
          <Input
            className="!w-1/2"
            value={filterData.keyword}
            placeholder={"Tìm kiếm"}
            defaultValue={""}
            maxLength={200}
            onChange={(val) => {
              onChangeFilter("keyword", val.target.value);
            }}
          />

          <Select
            className="!w-1/2"
            value={filterData.category}
            placeholder={"Chọn danh mục"}
            showSearch
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            onChange={(val) => {
              onChangeFilter("category", val);
            }}
          >
            {categories?.map((v) => {
              return <Option>{v.name}</Option>;
            })}
          </Select>
        </div>
        <Button className="w-100px">Tìm kiếm</Button>
      </div>
      <div className="table-area">
        <Table<DataType>
          columns={columns}
          rowKey={(record) => record.login.uuid}
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
          loading={loading}
          scroll={{ x: "100%", y: "calc(100vh - 252px)" }}
        />
      </div>
    </div>
  );
};

export default ListProduct;
