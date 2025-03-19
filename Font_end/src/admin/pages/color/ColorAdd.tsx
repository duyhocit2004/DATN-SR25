import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

const ColorAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/colors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: values.name }),
            });

            const responseData = await response.json();

            if (response.ok) {
                message.success("Thêm màu sắc thành công!");
                navigate("/admin/colors");
            } else {
                message.error(`Lỗi: ${responseData.message || "Không thể thêm màu!"}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            message.error("Không thể thêm màu!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Thêm màu mới" bordered={false} style={{ maxWidth: 600, margin: "0 auto" }}>
            <Form form={form} name="colorAdd" layout="vertical" onFinish={onFinish}>
                {/* Tên màu */}
                <Form.Item 
                    label="Tên màu" 
                    name="name" 
                    rules={[{ required: true, message: "Vui lòng nhập tên màu!" }]}
                >
                    <Input placeholder="Nhập tên màu" />
                </Form.Item>

                {/* Nút hành động */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Thêm màu
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/colors")}>Hủy</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ColorAdd;