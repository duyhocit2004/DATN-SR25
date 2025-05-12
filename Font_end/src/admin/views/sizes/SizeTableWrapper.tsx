import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSizes, setSelectedSize, setShowAddModal, deleteSize, setFilter } from "@/store/reducers/adminSizeSlice";
import SizeTable from "./SizeTable";
import AddSizeModal from "./create";
import UpdateSizeModal from "./update";
import { Button, Select } from "antd";

const SizeTableWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sizes, loading, showAddModal, selectedSize, filter } = useAppSelector((state) => state.adminSize);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    dispatch(fetchSizes());
  }, [dispatch, refreshFlag, filter.type]);

  const handleEdit = (size: any) => {
    dispatch(setSelectedSize(size));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteSize(id)).then(() => setRefreshFlag(f => !f));
  };

  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    setRefreshFlag(f => !f);
  };

  const handleChangeType = (value: 'numeric' | 'text') => {
    dispatch(setFilter({ ...filter, type: value }));
  };

  return (
    <div>
      <div className="header-top mb-4 flex items-center justify-between">
        <Select
          value={filter.type || 'numeric'}
          onChange={handleChangeType}
          style={{ width: 200 }}
          options={[
            { value: 'numeric', label: 'Size số' },
            { value: 'text', label: 'Size chữ' },
          ]}
        />
        <Button type="primary" onClick={handleAdd}>Thêm mới</Button>
      </div>
      <SizeTable
        sizes={sizes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {showAddModal && <AddSizeModal refreshData={refreshData} />}
      {selectedSize && <UpdateSizeModal refreshData={refreshData} />}
    </div>
  );
};

export default SizeTableWrapper; 