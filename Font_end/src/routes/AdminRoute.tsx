import React from 'react';
import { Routes, Route } from "react-router-dom";
import Users from "../admin/pages/users/Users";
import ProductAdd from '../admin/pages/products/ProductAdd';
// import UserAdd from '../admin/pages/users/UserAdd';
// import UserEdit from '../admin/pages/users/UserEdit';
import Dashboard from '../admin/pages/Dashboard';
import AdminLayout from '../admin/layouts/AdminLayout';
import Products from '../admin/pages/products/Product';
import ProductUpdate from '../admin/pages/products/ProductUpdate';
import Colors from '../admin/pages/color/Color';
import ColorAdd from '../admin/pages/color/ColorAdd';
import ColorEdit from '../admin/pages/color/ColorEdit';
import Sizes from '../admin/pages/size/Size';
import { AddSize } from '../service/size/sizeService';
import SizeAdd from '../admin/pages/size/SizeAdd';
import SizeEdit from '../admin/pages/size/SizeEdit';
import Categories from '../admin/pages/categories/Category';
import CategoryAdd from '../admin/pages/categories/CategoryAdd';
import CategoryEdit from '../admin/pages/categories/CategoryEdit';
import ListVoucher from '../admin/pages/vouchers/voucherList';
import AddVoucher from '../admin/pages/vouchers/voucherAdd';
import EditVoucher from '../admin/pages/vouchers/voucherEdit';


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add-product" element={<ProductAdd />} />
        <Route path="products/edit/:id" element={<ProductUpdate />} />
        <Route path="colors" element={<Colors />} />
        <Route path="colors/add-color" element={<ColorAdd />} />
        <Route path="colors/edit/:id" element={<ColorEdit />} />
        <Route path="categories" element={<Categories />} />
        <Route path="categories/add-category" element={<CategoryAdd />} />
        <Route path="categories/edit/:id" element={<CategoryEdit />} />
        <Route path="sizes" element={<Sizes />} />
        <Route path="sizes/add-size" element={<SizeAdd />} />
        <Route path="sizes/edit/:id" element={<SizeEdit />} />
        <Route path="vouchers" element={<ListVoucher />} />
        <Route path="vouchers/addvouchers" element={<AddVoucher />} />
        <Route path="vouchers/edit/:id" element={< EditVoucher/>} />



        <Route path="users" element={<Users />} />
        {/* <Route path="users/add" element={<UserAdd />} /> */}
        {/* <Route path="users/edit/:id" element={<UserEdit />} /> */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

