import { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/types/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  fetchProducts,
} from "@/store/reducers/adminProductSlice";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAdd = () => {
    navigate("/admin/products/create");
  };

  return (
    <div className="list-product-container">
      <div className="header-top w-full flex items-center justify-between gap-2 mb-4">
        <ProductFilter />
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

      <ProductTable />
    </div>
  );
};

export default ProductsPage;
