import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, message, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ColorEdit: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchColor = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/colors/${id}`);
                if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu màu");
    
                const result = await response.json();
                console.log("✅ Dữ liệu API:", result);
    
                if (result?.data?.name) {
                    form.setFieldsValue({ name: result.data.name });
                } else {
                    message.error("Dữ liệu màu không hợp lệ!");
                }
            } catch (error) {
                console.error(error);
                message.error("Không thể tải dữ liệu màu!");
            } finally {
                setLoading(false); // 🛑 Đảm bảo cập nhật loading khi API kết thúc
            }
        };
    
        fetchColor();
    }, [id, form]);
    
    if (loading) {
        return <Spin tip="Đang tải dữ liệu..." />;
    }


    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8000/api/colors/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                message.success("Cập nhật màu thành công!");
                navigate("/admin/colors");
            } else {
                message.error("Không thể cập nhật màu!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật màu:", error);
            message.error("Lỗi hệ thống!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="Chỉnh sửa màu sắc" bordered={false} style={{ maxWidth: 600, margin: "0 auto" }}>
            {loading ? (
                <div style={{ textAlign: "center", padding: "20px" }}>
                    <Spin size="large" />
                    <p>Đang tải dữ liệu...</p>
                </div>
            ) : (
                <Form form={form} name="colorEdit" layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="Tên màu"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập tên màu!" }]}
                    >
                        <Input placeholder="Nhập tên màu" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Cập nhật màu
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/colors")}>
                            Hủy
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </Card>
    );
};

export default ColorEdit;
