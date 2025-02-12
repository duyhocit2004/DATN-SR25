/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/client.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

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

  const onSubmit = async (registerData: IUser) => {
    try {
      const { data } = await axios.post(`http://127.0.0.1:8000/api/register`, registerData);
      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký không thành công!");
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
            <input
              type="password"
              {...register("password", {
                required: "Mật khẩu không được để trống!",
                minLength: { value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
              })}
              placeholder="Nhập mật khẩu..."
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="gender">Giới Tính:</label>
            <select {...register("gender", { required: "Vui lòng chọn giới tính!" })}>
              <option value="">-- Chọn giới tính --</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
            {errors.gender && <p className="error-message">{errors.gender.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số Điện Thoại:</label>
            <input
              type="text"
              {...register("phone", {
                required: "Số điện thoại không được để trống!",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "Số điện thoại không hợp lệ!",
                },
              })}
              placeholder="Nhập số điện thoại..."
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
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

export default Register;
