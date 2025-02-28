import React, { useState } from "react";
import { Form, Input, Button, Card, message, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CategoryAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/categories", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: values.name, type: values.type }),
            });

            const responseData = await response.json();

            if (response.ok) {
                message.success("Thêm danh mục thành công!");
                navigate("/admin/categories");
            } else {
                message.error(`Lỗi: ${responseData.message || "Không thể thêm danh mục!"}`);
            }
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            message.error("Không thể thêm danh mục!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Thêm danh mục mới" bordered={false} style={{ maxWidth: 600, margin: "0 auto" }}>
            <Form form={form} name="categoryAdd" layout="vertical" onFinish={onFinish}>
                {/* Tên danh mục */}
                <Form.Item 
                    label="Tên danh mục" 
                    name="name" 
                    rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
                >
                    <Input placeholder="Nhập tên danh mục" />
                </Form.Item>

                {/* Loại danh mục */}
                <Form.Item 
                    label="Loại danh mục" 
                    name="type" 
                    rules={[{ required: true, message: "Vui lòng chọn loại danh mục!" }]}
                >
                    <Select placeholder="Chọn loại danh mục">
                        <Option value="man">Nam</Option>
                        <Option value="women">Nữ</Option>
                    </Select>
                </Form.Item>

                {/* Nút hành động */}
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Thêm danh mục
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/categories")}>Hủy</Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CategoryAdd;
