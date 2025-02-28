import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";

const SizeAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/sizes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: values.name }),
            });

            const responseData = await response.json();

            if (response.ok) {
                message.success("Thêm kích thước thành công!");
                navigate("/admin/sizes");
            } else {
                message.error(`Lỗi: ${responseData.message || "Không thể thêm kích thước!"}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            message.error("Không thể thêm kích thước!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Thêm kích thước mới" bordered={false} style={{ maxWidth: 600, margin: "0 auto" }}>
            <Form form={form} name="sizeAdd" layout="vertical" onFinish={onFinish}>
                {/* Tên kích thước */}
                <Form.Item 
                    label="Tên kích thước" 
                    name="name" 
                    rules={[{ required: true, message: "Vui lòng nhập tên kích thước!" }]}
                >
                    <Input placeholder="Nhập tên kích thước" />
                </Form.Item>

                {/* Nút hành động */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Thêm kích thước
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/sizes")}>Hủy</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SizeAdd;