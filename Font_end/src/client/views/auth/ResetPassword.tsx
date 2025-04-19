
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const onFinish = async (values: { password: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      if (!token || !email) {
        throw new Error("Thông tin không hợp lệ!");
      }
      const response = await axios.post("/api/auth/reset-password", {
        ...values,
        token,
        email,
      });
      message.success(response.data.message || "Đặt lại mật khẩu thành công!");
    } catch (error: any) {
      message.error(error.response?.data?.message || "Đã xảy ra lỗi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Đặt lại mật khẩu</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
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
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đặt lại mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
