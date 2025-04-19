
import React, { useState } from "react";
import { Form, Input, Button, message, Spin } from "antd";
import axiosClient from "@/configs/axiosClient";


const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { email: string }) => {
        setLoading(true);
        try {
            const response = await axiosClient.post("/users/forgotPassword", values);
            message.success("Liên kết đặt lại mật khẩu đã được gửi!");
        } catch (error) {
            message.error("Đã xảy ra lỗi, vui lòng thử lại!");
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
                <h2 className="text-2xl font-semibold text-center mb-4">Quên mật khẩu</h2>
                <Form layout="vertical" onFinish={onFinish}>
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
        
                  {/* Nút Submit */}
                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      Gửi liên kết đặt lại mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
        
    );
};

export default ForgotPassword;
