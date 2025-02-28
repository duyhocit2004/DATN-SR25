import React from "react";

import UserRoutes from "./routes/UsersRoute";
import AdminRoutes from "./routes/AdminRoute";
import { Route, Routes } from "react-router-dom"
import Header from "./component/Header";
import Footer from "./component/Footer";



function App() {
  return (
    <>
      <Routes>
        {/* Route cho User: Có Header và Footer */}
        <Route
          path="/*"element={
            <>
              <Header />
              <UserRoutes />
              <Footer />
            </>
          }
        />

        {/* Route cho Admin: Không có Header và Footer */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>   
    </>
  );
}

export default App; 