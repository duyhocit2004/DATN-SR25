import { useEffect } from "react";
import AccountFilter from "./AccountFilter";
import AccountTable from "./AccountTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { fetchAccounts } from "@/store/reducers/adminAccountSlice";

const AccountsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/admin/accounts/create");
  };

  return (
    <div className="list-account-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <AccountFilter />
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

      <AccountTable />
    </div>
  );
};

export default AccountsPage;
