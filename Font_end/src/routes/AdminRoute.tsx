import React from 'react';
import { Routes, Route } from "react-router-dom";
import Users from "../admin/pages/users/Users";
import ProductAdd from '../admin/pages/products/ProductAdd';
import UserAdd from '../admin/pages/users/UserAdd';
import UserEdit from '../admin/pages/users/UserEdit';
import Dashboard from '../admin/pages/Dashboard';
import AdminLayout from '../admin/layouts/AdminLayout';
import Products from '../admin/pages/products/Product';
import ProductUpdate from '../admin/pages/products/ProductUpdate';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products/>} />
        <Route path="products/add-product" element={<ProductAdd />} />
        <Route path="products/edit/:id" element={<ProductUpdate />} />
        <Route path="users" element={<Users />} />
        <Route path="users/add" element={<UserAdd />} />
        <Route path="users/edit/:id" element={<UserEdit />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

