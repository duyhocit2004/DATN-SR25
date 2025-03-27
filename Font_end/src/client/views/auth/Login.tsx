import accountApi from "@/api/accountApi";
import { showToast } from "@/components/toast"; // Import showToast
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
      // Gửi request API đăng nhập tại đây
      const response = await accountApi.login(values);

      if (response.status === HttpCodeString.SUCCESS) {
        login(response.data.accessToken);
        showToast({
          content: "Đăng nhập thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/");
      } else {
        showToast({
          content: "Tài khoản hoặc mật khẩu không đúng!!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-10 md:pt-20 flex items-center justify-center">
      
      <div className="max-w-md w-full bg-white p-6 shadow-md rounded-md">
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Spin size="large" />
          </div>
        )}
        <h2 className="text-2xl font-semibold text-center mb-4">Đăng nhập</h2>

        <Form layout="vertical" onFinish={handleLogin}>
          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          {/* Nút Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="text-end mt-2">
            <a href="/forgot-password" className="text-primary">
              Quên mật khẩu?
            </a>
          </div>
        </Form>

        {/* Link đến trang đăng ký */}
        <p className="text-center mt-4">
          Chưa có tài khoản?{" "}
          <Link to="/register" className="text-blue-500">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
