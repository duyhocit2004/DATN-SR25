import { useEffect, useState } from "react";
import ProductFilter from "./ProductFilter";
import ProductTable from "./ProductTable";
import { Button, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { IProduct } from "@/types/interface";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  fetchProducts,
} from "@/store/reducers/adminProductSlice";
import ColorTableWrapper from "../colors/ColorTableWrapper";
import SizeTableWrapper from "../sizes/SizeTableWrapper";

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

  const items = [
    {
      key: "1",
      label: "Sản phẩm",
      children: (
        <>
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
        </>
      ),
    },
    {
      key: "2",
      label: "Màu sắc",
      children: <ColorTableWrapper />,
    },
    {
      key: "3",
      label: "Kích thước",
      children: <SizeTableWrapper />,
    },
  ];

  return (
    <div className="list-product-container">
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default ProductsPage;
