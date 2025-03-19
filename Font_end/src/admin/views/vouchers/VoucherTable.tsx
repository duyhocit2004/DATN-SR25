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

const VoucherTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vouchers, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminVoucher
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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      minWidth: 300,
    },
    {
      title: "Số lượng đã dùng",
      dataIndex: "used",
      key: "used",
      minWidth: 300,
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
      key: "status",
      minWidth: 150,
      render: (status: boolean) => {
        return <div>{getLabelByValue(ActiveStatusBooleanData, status)}</div>;
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
      render: (_: any, record: IVoucher) => (
        <div className="actions">
          <Tooltip title={"Xóa"}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation()
                handleDeleteVoucher(record.id);
              }}
            />
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

export default VoucherTable;
