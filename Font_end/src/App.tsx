import { Suspense, lazy } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { clientRoutes, adminRoutes } from "@/router/routes";
import { adminLoginRoutes } from "./router/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setupToast } from "./components/toast";
import { ConfigProvider } from "antd";
import { Spin } from 'antd';

// Lazy load layouts
const ClientLayout = lazy(() => import("./client/layouts/layout"));
const AdminLayout = lazy(() => import("./admin/layouts/layout"));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Spin size="large" />
  </div>
);

function App() {
  const contextHolder = setupToast();
  return (
    <>
      <Provider store={store}>
        <ConfigProvider>
          {contextHolder}
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Các route dành cho Client */}
                <Route path="/" element={
                  <Suspense fallback={<Loading />}>
                    <ClientLayout />
                  </Suspense>
                }>
                  {clientRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path === "/" ? "" : route.path.slice(1)}
                      element={
                        <Suspense fallback={<Loading />}>
                          <route.element />
                        </Suspense>
                      }
                    />
                  ))}
                </Route>
                {/* Các route dành cho Admin */}
                <Route path="/admin" element={
                  <Suspense fallback={<Loading />}>
                    <AdminLayout />
                  </Suspense>
                }>
                  {adminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path.replace("/admin/", "")}
                      element={
                        <Suspense fallback={<Loading />}>
                          <route.element />
                        </Suspense>
                      }
                    />
                  ))}
                </Route>

                {adminLoginRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={
                      <Suspense fallback={<Loading />}>
                        <route.element />
                      </Suspense>
                    }
                  />
                ))}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </>
  );
}

export default App;
