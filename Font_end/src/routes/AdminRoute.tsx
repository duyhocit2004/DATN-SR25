// import React from 'react';
// import { Routes, Route } from "react-router-dom";
// import AdminLayout from "../admin/AdminLayout";
// import Dashboard from "../admin/pages/Dashboard";
// import Users from "../admin/pages/Users";

// const AdminRoutes = () => {
//   return (
//     <Routes>
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="users" element={<Users />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AdminRoutes;

import React from 'react';
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import Users from "../admin/pages/Users";
import ProductList from '../admin/pages/products/ProductList';
import ProductAdd from '../admin/pages/products/ProductAdd';
import ProductEdit from '../admin/pages/products/ProductEdit';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/add" element={<ProductAdd />} />
        <Route path="products/:id/edit" element={<ProductEdit />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

