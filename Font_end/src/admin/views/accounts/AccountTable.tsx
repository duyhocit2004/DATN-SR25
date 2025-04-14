import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteAccount,
  fetchAccounts,
  setPagination,
} from "@/store/reducers/adminAccountSlice";
import { IAccount } from "@/types/interface";
import { ActiveStatusData, GenderData, PersonTypeData, RoleData } from "@/utils/constantData";
import { getLabelByValue } from "@/utils/functions";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";

const AccountTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accounts, pagination, totalElements, loading } = useAppSelector(
    (state) => state.adminAccount
  );
  const columns: ColumnsType<IAccount> = [
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
    // {
    //   title: "Ảnh",
    //   dataIndex: "userImage",
    //   render: (value) => {
    //     return value ? (
    //       <img src={value} alt="avatar" width={100} height={100} />
    //     ) : null;
    //   },
    //   minWidth: 150,
    // },
    {
      title: "Họ và tên",
      dataIndex: "name",
      minWidth: 250,
    },
    {
      title: "Email",
      dataIndex: "email",
      minWidth: 250,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      minWidth: 200,
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      minWidth: 180,
      render: (role) => {
        return <div>{getLabelByValue(RoleData, role)}</div>;
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      minWidth: 180,
      render: (gender) => {
        return <div>{getLabelByValue(PersonTypeData, gender)}</div>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      minWidth: 180,
      render: (status) => {
        return <div>{getLabelByValue(ActiveStatusData, status)}</div>;
      },
    },
    // {
    //   title: "Hành động",
    //   dataIndex: "action",
    //   minWidth: 120,
    //   fixed: "right",
    //   render: (value, record) => {
    //     return (
    //       <div className="actions">
    //         <Tooltip title={"Xóa"}>
    //           <Button
    //             danger
    //             icon={<DeleteOutlined />}
    //             onClick={(e) => {
    //               e.stopPropagation();
    //               handleDeleteAccount(record.id);
    //             }}
    //           />
    //         </Tooltip>
    //       </div>
    //     );
    //   },
    // },
  ];

  // const handleDeleteAccount = async (accountId: number) => {
  //   dispatch(deleteAccount(accountId));
  // };

  const handlePagingChange = (page: number, size: number) => {
    dispatch(
      setPagination({
        page: page,
        pageSize: size,
      })
    );
    dispatch(fetchAccounts());
  };

  const onRowClick = (record: IAccount) => {
    navigate("/admin/accounts/" + record.email);
  };

  return (
    <Table<IAccount>
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={accounts}
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
export default AccountTable;
