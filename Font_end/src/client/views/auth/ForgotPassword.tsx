import React, { useState } from "react";
import { Form, Input, Button, Spin } from "antd";
import accountApi from "@/api/accountApi";
import { showToast } from "@/components/toast";
import { HttpCodeString } from "@/utils/constants";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (values: { email: string }) => {
    setLoading(true);
    try {
      const response = await accountApi.forgotPassword(values);

      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Vui lòng kiểm tra email để đặt lại mật khẩu!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Đã xảy ra lỗi, vui lòng thử lại!",
          duration: 5,
          type: "error",
        });
      }
    } catch (error) {
      showToast({
        content: "Lỗi hệ thống. Vui lòng thử lại!",
        duration: 5,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getEmailProviderUrl = (email: string) => {
    if (!email) return "#";
    const domain = email.split("@")[1]?.toLowerCase();

    if (domain?.includes("gmail")) {
      return `https://accounts.google.com/ServiceLogin?continue=https://mail.google.com/mail/&email=${encodeURIComponent(email)}`;
    } else if (domain?.includes("yahoo")) {
      return "https://mail.yahoo.com/";
    } else if (domain?.includes("outlook") || domain?.includes("hotmail")) {
      return "https://outlook.live.com/";
    } else if (domain?.includes("icloud")) {
      return "https://www.icloud.com/mail";
    } else if (domain?.includes("aol")) {
      return "https://mail.aol.com/";
    } else {
      return "https://mail.google.com/";
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

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">Quên mật khẩu</h2>

        <Form layout="vertical" onFinish={handleForgotPassword}>
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

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md h-10"
            >
              Gửi liên kết đặt lại mật khẩu
            </Button>
          </Form.Item>

          {/* Go to email / login */}
          <Form.Item shouldUpdate={(prev, current) => prev.email !== current.email}>
            {({ getFieldValue }) => {
              const email = getFieldValue("email");
              const emailUrl = getEmailProviderUrl(email);

              return (
                <div className="flex justify-between items-center text-sm">
                  <a
                    href={emailUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-blue-600 hover:underline ${!email ? "pointer-events-none opacity-50" : ""}`}
                  >
                    Đi tới Email
                  </a>
                  <Link to="/login" >
                    Đăng nhập
                  </Link>
                </div>
              );
            }}
          </Form.Item>
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

export default ForgotPassword;
