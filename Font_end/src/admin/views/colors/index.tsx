import { useEffect } from "react";
import ColorFilter from "./ColorFilter";
import ColorTable from "./ColorTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchColors, setShowAddModal } from "@/store/reducers/adminColorSlice";
import AddColorModal from "./create";
import UpdateColorModal from "./update";

const ColorsPage = () => {
  const dispatch = useAppDispatch();
  const { selectedColor, showAddModal } = useAppSelector(
    (state) => state.adminColor
  );

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch]);
  
  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    dispatch(fetchColors());
  };

  return (
    <div className="list-color-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <ColorFilter />
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

      <ColorTable />
      {showAddModal && <AddColorModal refreshData={refreshData} />}
      {selectedColor && <UpdateColorModal refreshData={refreshData} />}
    </div>
  );
};

export default ColorsPage;
