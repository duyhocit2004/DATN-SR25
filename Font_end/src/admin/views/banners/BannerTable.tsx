import { Button, Table, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteBanner,
  fetchBanners,
  setPagination,
  setSelectedBanner,
} from "@/store/reducers/adminBannerSlice";
import dayjs, { Dayjs } from "dayjs";
import { IBanner } from "@/types/interface";
import { DeleteOutlined } from "@ant-design/icons";
import { getLabelByValue } from "@/utils/functions";
import { ActiveStatusStringData, BannerTypeData } from "@/utils/constantData";

const BannerTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { banners, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminBanner
  );
  const columns = [
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
      title: "Loại",
      dataIndex: "type",
      key: "type",
      minWidth: 150,
      render: (type: string) => {
        return <div>{getLabelByValue(BannerTypeData, type)}</div>;
      },
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      minWidth: 150,
      render: (image: string) => {
        return image ? (
          <img src={image} alt="banner" width={100} height={100} />
        ) : null;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      minWidth: 200,
      render: (status: string) => {
        return <div>{getLabelByValue(ActiveStatusStringData, status)}</div>;
      },
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
      render: (_: any, record: IBanner) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteBanner(record.id);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleDeleteBanner = async (bannerId: number) => {
    dispatch(deleteBanner(bannerId));
  };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchBanners());
  };

  const onRowClick = (record: IBanner) => {
    dispatch(setSelectedBanner(record));
  };

  return (
    <Table<IBanner>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={banners}
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

export default BannerTable;
