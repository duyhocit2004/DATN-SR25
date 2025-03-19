import React from 'react';
import { Routes, Route } from "react-router-dom";
import Users from "../admin/views/users/Users";
import ProductAdd from '../admin/views/products/ProductAdd';
// import UserAdd from '../admin/pages/users/UserAdd';
// import UserEdit from '../admin/pages/users/UserEdit';
import Dashboard from '../admin/views/Dashboard';
import AdminLayout from '../admin/layouts/AdminLayout';
import Products from '../admin/views/products/Product';
import ProductUpdate from '../admin/views/products/ProductUpdate';
import Colors from '../admin/views/colors/Color';
import ColorAdd from '../admin/views/colors/ColorAdd';
import ColorEdit from '../admin/views/colors/ColorEdit';
import Sizes from '../admin/views/sizes/Size';
import { AddSize } from '../service/size/sizeService';
import SizeAdd from '../admin/views/sizes/SizeAdd';
import SizeEdit from '../admin/views/sizes/SizeEdit';
import Categories from '../admin/views/categories/Category';
import CategoryAdd from '../admin/views/categories/CategoryAdd';
import CategoryEdit from '../admin/views/categories/CategoryEdit';
import ListVoucher from '../admin/views/vouchers/voucherList';
import AddVoucher from '../admin/views/vouchers/voucherAdd';
import EditVoucher from '../admin/views/vouchers/voucherEdit';


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

