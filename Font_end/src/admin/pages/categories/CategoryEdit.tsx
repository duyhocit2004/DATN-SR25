import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Spin, Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";

const CategoryEdit: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`);
                if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu danh mục");

                const result = await response.json();
                console.log("✅ Dữ liệu API:", result);

                if (result?.data?.name && result?.data?.type) {
                    form.setFieldsValue({ name: result.data.name, type: result.data.type });
                } else {
                    message.error("Dữ liệu danh mục không hợp lệ!");
                }
            } catch (error) {
                console.error(error);
                message.error("Không thể tải dữ liệu danh mục!");
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id, form]);

    if (loading) {
        return <Spin tip="Đang tải dữ liệu..." />;
    }

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Cập nhật danh mục thành công!");
                navigate("/admin/categories");
            } else {
                message.error("Không thể cập nhật danh mục!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật danh mục:", error);
            message.error("Lỗi hệ thống!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Chỉnh sửa danh mục" bordered={false} style={{ maxWidth: 600, margin: "0 auto" }}>
            {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : (
                <Form form={form} name="categoryEdit" layout="vertical" onFinish={onFinish}>
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

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật danh mục
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/categories")}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
};

export default CategoryEdit;
