import { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { clientRoutes, adminRoutes } from "@/router/routes";
import ClientLayout from "./client/layouts/layout";
import AdminLayout from "./admin/layouts/layout";
import { adminLoginRoutes } from "./router/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { setupToast } from "./components/toast";
import { ConfigProvider } from "antd";

function App() {
  const contextHolder = setupToast();
  return (
    <>
      <Provider store={store}>
        <ConfigProvider>
          {contextHolder}
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                {/* Các route dành cho Client */}
                <Route path="/" element={<ClientLayout />}>
                  {clientRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path === "/" ? "" : route.path.slice(1)}
                      element={<route.element />}
                    />
                  ))}
                </Route>
                {/* Các route dành cho Admin */}
                <Route path="/admin" element={<AdminLayout />}>
                  {adminRoutes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path.replace("/admin/", "")}
                      element={<route.element />}
                    />
                  ))}
                </Route>

                {adminLoginRoutes.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
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
