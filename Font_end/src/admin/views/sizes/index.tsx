import { useEffect } from "react";
import SizeFilter from "./SizeFilter";
import SizeTable from "./SizeTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSizes, setShowAddModal } from "@/store/reducers/adminSizeSlice";
import AddSizeModal from "./create";
import UpdateSizeModal from "./update";

const SizesPage = () => {

  const dispatch = useAppDispatch();
  const { selectedSize, showAddModal } = useAppSelector(
    (state) => state.adminSize
  );

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch]);

  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    dispatch(fetchSizes());
  };

  return (
    <div className="list-size-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <SizeFilter />
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

      <SizeTable />

      {showAddModal && <AddSizeModal refreshData={refreshData} />}
      {selectedSize && <UpdateSizeModal refreshData={refreshData} />}
    </div>
  );
};

export default SizesPage;
