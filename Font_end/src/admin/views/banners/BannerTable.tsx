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
import { ActiveStatusData, BannerTypeData } from "@/utils/constantData";
import { ColumnsType } from "antd/es/table";

const BannerTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { banners, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminBanner
  );
  const columns: ColumnsType<IBanner> = [
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
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string, record: any) => {
        const productId = record.product_id;
        const link = productId ? `/products/${productId}` : "#";
        return (
          <a href={link}>
            <img src={image} alt="Banner" style={{ height: 80 }} />
          </a>
        );
      },
    },
    
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      minWidth: 200,
      render: (status: string) => {
        return <div>{getLabelByValue(ActiveStatusData, status)}</div>;
      },
    },
    
    // {
    //   title: "Ngày tạo",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   minWidth: 200,
    //   render: (createdAt: Dayjs) => {
    //     return (
    //       <div>{createdAt ? dayjs(createdAt).format("DD/MM/YYYY") : ""}</div>
    //     );
    //   },
    // },
    {
      title: "Liên kết",
      dataIndex: "productId", 
      key: "productId",     
      minWidth: 200,
      render: (productId: number | null) => {
        if (!productId) return <span>Không có</span>;
        const productLink = `/products/${productId}`;
        return (
          <a href={productLink} target="_blank" rel="noopener noreferrer">
            Đi đến sản phẩm
          </a>
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
