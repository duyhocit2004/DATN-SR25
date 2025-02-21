import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const fetchUserRole = async (token: string) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Vai trò người dùng:", response.data.role);  // Log tại đây
    
    return response.data.role;
  } catch (error) {
    console.error("Không thể lấy thông tin người dùng:", error);
    throw error;
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
      //
      console.log("dữ liệu trả về:", response.data); 

      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
        toast.success("Đăng Nhập Thành Công.");
        // navigate(/)
        return response.data;
      } else {
        toast.error("Đăng Nhập Không Thành Công.");
      }
    } catch (error) {
      toast.error("Lỗi Đăng Nhập.");
      console.error(error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      if (!response) return;

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token không tồn tại.");
        return;
      }

      const roleId = await fetchUserRole(token);

      if (roleId === 'Quản lý') {
        navigate("/admin/dashboard");
      } else if (roleId === 'Khách hàng') {
        navigate("/");
      } else {
        toast.error("Vai trò không hợp lệ.");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng Nhập Tài Khoản</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Đăng Nhập
          </button>
        </form>

        <div className="text-center">
          <p>
            Bạn chưa có tài khoản? <NavLink to="/register">Đăng Ký</NavLink>
          </p>
        </div>

        <div className="social-buttons">
          <a href="#" className="btn facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="btn google">
            <i className="fab fa-google"></i>
          </a>
          <a href="#" className="btn twitter">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
