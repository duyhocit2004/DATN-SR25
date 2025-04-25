import accountApi from "@/api/accountApi";
import { showToast } from "@/components/toast";
import { useAuth } from "@/context/AuthContext";
import { HttpCodeString } from "@/utils/constants";
import { Form, Input, Button, Spin } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await accountApi.login(values);
      if (response.status === HttpCodeString.SUCCESS) {
        login(response.data.accessToken, response.data.user);
        showToast({
          content: "Đăng nhập thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/");
      } else {
        showToast({
          content: "Tài khoản hoặc mật khẩu không đúng!",
          duration: 5,
          type: "error",
        });
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.messageKey === "email.or.password.is.wrong" 
        ? "Tài khoản hoặc mật khẩu không đúng!"
        : "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
      
      showToast({
        content: errorMessage,
        duration: 5,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center pt-24 bg-white">

      <div className="relative w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex justify-center items-center z-10">
            <Spin size="large" />
          </div>
        )}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Đăng nhập</h2>

        <Form layout="vertical" onFinish={handleLogin}>
          {/* Email */}
          <Form.Item
            label={
              <span>
                Email <span className="text-red-500">*</span>
              </span>
            }
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input
              className="bg-gray-100 border-none rounded-md focus:ring-0 focus:bg-gray-200"
              placeholder="Nhập email"
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label={
              <span>
                Mật khẩu <span className="text-red-500">*</span>
              </span>
            }
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password
              className="bg-gray-100 border-none rounded-md focus:ring-0 focus:bg-gray-200"
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md h-10"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          {/* Forgot Password */}
          <div className="text-right mt-2">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        </Form>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;