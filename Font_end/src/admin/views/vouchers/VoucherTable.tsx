import { Button, Table, Tooltip } from "antd";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteVoucher,
  fetchVouchers,
  setPagination,
  setSelectedVoucher,
} from "@/store/reducers/adminVoucherSlice";
import dayjs, { Dayjs } from "dayjs";
import { IVoucher } from "@/types/interface";
import { getLabelByValue } from "@/utils/functions";
import { ActiveStatusBooleanData } from "@/utils/constantData";
import { DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast";

const VoucherTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vouchers, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminVoucher
  );
  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      const response = await adminApi.toggleStatus({ id });
      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: `Voucher đã được ${currentStatus ? "khóa" : "mở khóa"}!`,
          type: "success",
        });
        dispatch(fetchVouchers());
      }
    } catch {
      showToast({
        content: "Thao tác thất bại!",
        type: "error",
      });
    }
  };
  const handleEditVoucher = (voucher: IVoucher) => {
    if (!voucher.status) {
      showToast({
        content: "Voucher này đang bị khóa và không thể chỉnh sửa.",
        type: "warning",
      });
      return;
    }

    setSelectedVoucher(voucher);
    setIsModalVisible(true);
  };
  const columns: ColumnsType<IVoucher> = [
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
      title: "Mã",
      dataIndex: "code",
      key: "code",
      minWidth: 150,
    },
    {
      title: "Giá",
      dataIndex: "voucherPrice",
      key: "voucherPrice",
      minWidth: 150,
      render: (voucherPrice: number) => {
        return <div>{(voucherPrice || 0)?.toLocaleString()} VND</div>;
      },
    },
    {
      title: "Giá trị tối thiểu",
      dataIndex: "minOrderValue",
      key: "minOrderValue",
      minWidth: 150,
      render: (value: number) => `${value?.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      minWidth: 100,
    },
    {
      title: "Đã dùng",
      dataIndex: "used",
      key: "used",
      minWidth: 100,
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => dayjs(date).format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      minWidth: 300,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      minWidth: 100,
      key: "status",
      render: (status: string) => (
        <span className={status === "ACTIVE" ? "text-green-500" : "text-red-500"}>
          {status === "ACTIVE" ? "Hoạt động" : "Khóa"}
        </span>
      ),
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
                handleDeleteVoucher(record.id);
              }}
            />
            <Button
              type="primary"
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện onRow
                handleToggleStatus(record.id, record.status === "ACTIVE");
              }}
            >
              {record.status === "ACTIVE" ? "Khóa" : "Mở khóa"}
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  const handleDeleteVoucher = async (voucherId: number) => {
    dispatch(deleteVoucher(voucherId));
  };

  const handlePagingChange = (page: number, voucher: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: voucher,
      })
    );
    dispatch(fetchVouchers());
  };

  const onRowClick = (record: IVoucher) => {
    dispatch(setSelectedVoucher(record));
  };

  return (
    <Table<IVoucher>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={vouchers}
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
          onClick: (event) => {
            if ((event.target as HTMLElement).closest(".actions")) {
              return;
            }
            onRowClick(record);
          },
        };
      }}
      tableLayout="auto"
      loading={loading}
      scroll={{ x: "100%", y: "calc(100vh - 408px)" }}
    />
  );
};

export default VoucherTable;


function setIsModalVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}

