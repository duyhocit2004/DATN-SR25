/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/client.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icon

interface IUser {
  username: string;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userImage, setUserImage] = useState<File | null>(null);

  const onSubmit = async (registerData: IUser) => {
    const formData = new FormData();
    formData.append("username", registerData.username);
    formData.append("fullname", registerData.fullname);
    formData.append("email", registerData.email);
    formData.append("password", registerData.password);
    formData.append("phone", registerData.phone);
    formData.append("gender", registerData.gender);
  
    if (userImage) {
      formData.append("user_image", userImage); 
    }
  
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/register",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.token) {
        sessionStorage.setItem("token", data.token); // Lưu token sau khi đăng ký
        toast.success("Đăng ký thành công! Đang đăng nhập...");
        setTimeout(() => navigate("/"), 1500); // Chuyển hướng sau khi đăng ký
      } else {
        toast.error("Không thể lấy token sau khi đăng ký!");
      }

    } catch (error: any) {
      console.error("Lỗi đăng ký:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Đăng ký không thành công!");
      } else {
        toast.error("Lỗi máy chủ, vui lòng thử lại sau!");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Đăng Ký Tài Khoản</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="username">Tên Đăng Nhập:</label>
            <input
              type="text"
              {...register("username", { required: "Tên đăng nhập không được để trống!" })}
              placeholder="Nhập tên đăng nhập..."
            />
            {errors.username && <p className="error-message">{errors.username.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="fullname">Họ và tên:</label>
            <input
              type="text"
              {...register("fullname", { required: "Họ và tên không được để trống!" })}
              placeholder="Nhập họ và tên..."
            />
            {errors.fullname && <p className="error-message">{errors.fullname.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              {...register("email", {
                required: "Email không được để trống!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email không hợp lệ!",
                },
              })}
              placeholder="Nhập email..."
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật Khẩu:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Mật khẩu không được để trống!",
                  minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" }
                })}
                placeholder="Nhập mật khẩu..."
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary">
            Đăng Ký
          </button>
        </form>

        <div className="text-center">
          <p>
            Bạn đã có tài khoản? <NavLink to="/login">Đăng Nhập</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
