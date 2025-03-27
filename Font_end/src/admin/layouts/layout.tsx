import React, { useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import "./layout.scss";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./components/header/Header";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "./ProtectedRoute ";

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <AuthProvider>
      <ProtectedRoute>
        <Layout
          className="admin-layout-container"
          style={{ minHeight: "100vh" }}
        >
          <Sidebar />
          <Layout>
            <HeaderAdmin />
            <Content
              style={{
                padding: "24px",
                height: "calc(100vh - 134px)",
                overflow: "auto",
              }}
            >
          
              <div className="content-page">
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </ProtectedRoute>
    </AuthProvider>
  );
};

export default AdminLayout;
