import accountApi from "@/api/accountApi";
import { showToast } from "@/components/toast"; // Import showToast
import { PersonType, HttpCodeString } from "@/utils/constants";
import { Form, Input, Button, Radio, Spin } from "antd";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleRegister = async (values: any) => {
    // Gửi request API đăng ký tại đây
    setLoading(true);
    try {
      // Gửi request API đăng nhập tại đây
      const response = await accountApi.register(values);

      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Đăng ký thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/login");
      } else {
        showToast({
          content: "Đăng ký thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      
      <div className="max-w-md w-full bg-white p-4 sm:p-6 shadow-md rounded-md">
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
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
          Đăng ký tài khoản
        </h2>

        <Form layout="vertical" onFinish={handleRegister}>
          {/* Họ và Tên */}
          <Form.Item
            label="Họ và Tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

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

          {/* Số điện thoại */}
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại!" },
              {
                pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          {/* Giới tính */}
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
          >
            <Radio.Group>
              <Radio value={PersonType.MEN}>Nam</Radio>
              <Radio value={PersonType.WOMEN}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu" />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          {/* Nút Submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        {/* Link đến trang đăng nhập */}
        <p className="text-center mt-4">
          Đã có tài khoản?{" "}
          <Link to="/login" className="text-blue-500">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
