import { useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import CategoryTable from "./CategoryTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  fetchParentCategories,
  setShowAddModal,
} from "@/store/reducers/adminCategorySlice";
import AddCategoryModal from "./create";
import UpdateCategoryModal from "./update";

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { showAddModal, selectedCategory } = useAppSelector((state) => state.adminCategory);

  useEffect(() => {
    dispatch(fetchParentCategories());
    dispatch(fetchCategories());
  }, [dispatch]);
  const handleAdd = () => {
    dispatch(setShowAddModal(true));
  };

  const refreshData = () => {
    dispatch(fetchCategories());
  };

  return (
    <div className="list-product-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <CategoryFilter />
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

      <CategoryTable />

      {showAddModal && <AddCategoryModal refreshData={refreshData} />}
      {selectedCategory && <UpdateCategoryModal refreshData={refreshData} />}
    </div>
  );
};

export default CategoriesPage;
