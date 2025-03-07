import axios from "axios";
import React, { useState, useEffect } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const fetchUserRole = async (token: string) => {
  try {
    if (!token) return null;
    const response = await axios.get("http://127.0.0.1:8000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("user data", response.data);
    return response.data;
  } catch (error) {
    console.error("Không thể lấy thông tin người dùng:", error);
    return null;
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      fetchUserRole(storedToken).then((user) => {
        if (user?.role === "Quản lý") navigate("/admin/dashboard");
        else if (user?.role === "Khách hàng") navigate("/");
      });
    }
  }, [navigate]);


  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });

  //     if (response.data.status === "success") {
  //       sessionStorage.setItem("token", response.data.token);
  //       toast.success("Đăng nhập thành công!");
  //       navigate("/");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("Lỗi kết nối đến server!");
  //     console.error(error);
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", { email, password });
      if (response.data.status === "success") {
        const token = response.data.access_token;
        sessionStorage.setItem("token", token);
        toast.success("Đăng nhập thành công!");

        // Gửi sự kiện thông báo user đã đăng nhập
        window.dispatchEvent(new Event("userLoggedIn"));

        const user = response.data.user;
        if (user?.role === "Quản lý") {
          navigate("/admin/dashboard");
        } else if (user?.role === "Khách hàng") {
          navigate("/");
        }
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Lỗi kết nối đến server!");
      console.error("Lỗi:", error);
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
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                required
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
      </div>
    </div>
  );
};

export default Login;
