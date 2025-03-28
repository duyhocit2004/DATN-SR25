import { Button, Table, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteCategory,
  fetchCategories,
  setPagination,
  setSelectedCategory,
} from "@/store/reducers/adminCategorySlice";
import { IResponseCategory } from "./types";
import dayjs, { Dayjs } from "dayjs";
import { getLabelByValue } from "@/utils/functions";
import { PersonTypeData } from "@/utils/constantData";
import { ColumnsType } from "antd/es/table";
import { DeleteOutlined } from "@ant-design/icons";

const CategoryTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categories, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminCategory
  );

  const columns: ColumnsType<IResponseCategory> = [
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
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      minWidth: 250,
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      minWidth: 150,
      render: (image: string) => {
        return image ? (
          <img src={image} alt="category" style={{ width: "100px" }} />
        ) : null;
      },
    },
    {
      title: "Danh mục cha",
      dataIndex: "parentName",
      key: "parentName",
      minWidth: 250,
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      minWidth: 150,
      render: (gender: string) => {
        return <div>{getLabelByValue(PersonTypeData, gender)}</div>;
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      minWidth: 350,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      minWidth: 200,
      render: (createdAt: Dayjs) => {
        return (
          <div>{createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : ""}</div>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      minWidth: 150,
      fixed: 'right',
      render: (_, record) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteCategory(record.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleDeleteCategory = async (categoryId: number) => {
    dispatch(deleteCategory(categoryId));
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchCategories());
  };

  const onRowClick = (record: IResponseCategory) => {
    dispatch(setSelectedCategory(record));
  };

  return (
    <Table<IResponseCategory>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={categories}
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

export default CategoryTable;
