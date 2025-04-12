import { useEffect } from "react";
import VoucherFilter from "./VoucherFilter";
import VoucherTable from "./VoucherTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchVouchers,
  setShowAddModal,
} from "@/store/reducers/adminVoucherSlice";
import AddVoucherModal from "./create";
import UpdateVoucherModal from "./update";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";

const VouchersPage = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { selectedVoucher, showAddModal } = useAppSelector(
    (state) => state.adminVoucher
  );

  useEffect(() => {
    dispatch(fetchVouchers());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    dispatch(fetchVouchers());
  };

  return (
    <div className="list-voucher-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <VoucherFilter />
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

      <ErrorBoundary>
        <VoucherTable />
      </ErrorBoundary>

      {showAddModal && <AddVoucherModal refreshData={refreshData} />}
      {selectedVoucher && <UpdateVoucherModal refreshData={refreshData} />}
    </div>
  );
};

export default VouchersPage;
