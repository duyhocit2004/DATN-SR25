import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchColors, setSelectedColor, setShowAddModal, deleteColor, setPagination } from "@/store/reducers/adminColorSlice";
import ColorTable from "./ColorTable";
import AddColorModal from "./create";
import UpdateColorModal from "./update";
import { Button, TablePaginationConfig } from "antd";

const ColorTableWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors, loading, showAddModal, selectedColor, pagination, totalElements } = useAppSelector((state) => state.adminColor);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    dispatch(fetchColors());
  }, [dispatch, refreshFlag, pagination]);

  const handleEdit = (color: any) => {
    dispatch(setSelectedColor(color));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteColor(id)).then(() => setRefreshFlag(f => !f));
  };

  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    setRefreshFlag(f => !f);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    dispatch(setPagination({
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 10
    }));
  };

  return (
    <div>
      <div className="header-bottom mb-4 flex justify-end">
        <Button type="primary" onClick={handleAdd}>Thêm mới</Button>
      </div>
      <ColorTable
        colors={colors}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: totalElements,
          showSizeChanger: true,
          showTotal: (total) => `Tổng số ${total} màu sắc`
        }}
        onChange={handleTableChange}
      />
      {showAddModal && <AddColorModal refreshData={refreshData} />}
      {selectedColor && <UpdateColorModal refreshData={refreshData} />}
    </div>
  );
};

export default ColorTableWrapper; 