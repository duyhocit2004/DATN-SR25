import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Upload,
    Card,
    message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

// Hàm xử lý upload ảnh
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const ProductAdd: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]); // State lưu danh mục

    // Fetch danh mục từ API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/categories");
                const data = await response.json();
                console.log("📌 Categories:", data);
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục:", error);
                message.error("Không thể tải danh mục!");
            }
        };

        fetchCategories();
    }, []);

    const onFinish = async (values: any) => {
        try {
            const formData = new FormData();
            formData.append("name_product", values.name);
            formData.append("categories_id", values.category);
            formData.append("base_stock", values.quantity);
            formData.append("price_regular", values.price);
            formData.append("price_sale", values.discount ? values.price - (values.price * values.discount) / 100 : values.price);
            formData.append("description", values.description);
            formData.append("content", values.content || "");
            formData.append("color", values.color || "Chưa cập nhật");
            formData.append("size", values.size || "Chưa cập nhật");

            // Thêm ảnh đại diện
            if (values.avatar?.[0]?.originFileObj) {
                formData.append("image", values.avatar[0].originFileObj);
            }

            // Gửi request lên API
            const response = await fetch("http://127.0.0.1:8000/api/products", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                message.success("Thêm sản phẩm thành công!");
                navigate("/admin/products");
            } else {
                throw new Error("Lỗi khi thêm sản phẩm");
            }
        } catch (error) {
            console.error("Lỗi khi gửi API:", error);
            message.error("Không thể thêm sản phẩm!");
        }
    };

    return (
        <Card title="Thêm sản phẩm mới" bordered={false} style={{ maxWidth: 800, margin: "0 auto" }}>
            <Form form={form} name="productAdd" layout="vertical" onFinish={onFinish}>
                {/* Tên sản phẩm */}
                <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
                    <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>

                {/* Danh mục */}
                <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}>
                    <Select placeholder="Chọn danh mục">
                        {categories.map((category) => (
                            <Option key={category.id} value={category.id}>
                                {category.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Số lượng */}
                <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                    <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập số lượng" />
                </Form.Item>

                {/* Giá sản phẩm */}
                <Form.Item label="Giá sản phẩm (VNĐ)" name="price" rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}>
                    <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập giá sản phẩm" />
                </Form.Item>

                {/* Giảm giá sản phẩm */}
                <Form.Item label="Giảm giá sản phẩm (%)" name="discount">
                    <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="Nhập % giảm giá (Nếu có)" />
                </Form.Item>

                {/* Miêu tả */}
                <Form.Item label="Miêu tả" name="description" rules={[{ required: true, message: "Vui lòng nhập miêu tả!" }]}>
                    <TextArea rows={4} placeholder="Nhập miêu tả sản phẩm" />
                </Form.Item>

                {/* Màu */}
                <Form.Item label="Màu" name="color">
                    <Input placeholder="Nhập màu sản phẩm" />
                </Form.Item>

                {/* Kích cỡ */}
                <Form.Item label="Kích cỡ" name="size">
                    <Input placeholder="Nhập kích cỡ sản phẩm" />
                </Form.Item>

                {/* Nội dung */}
                <Form.Item label="Nội dung" name="content">
                    <TextArea rows={4} placeholder="Nhập nội dung sản phẩm" />
                </Form.Item>

                {/* Ảnh đại diện */}
                <Form.Item
                    label="Ảnh đại diện"
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
                >
                    <Upload name="avatar" listType="picture" maxCount={1} beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
                    </Upload>
                </Form.Item>

                {/* Album ảnh */}
                <Form.Item label="Album ảnh" name="album" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload name="album" listType="picture-card" multiple beforeUpload={() => false}>
                        <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Chọn ảnh</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Nút hành động */}
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Thêm sản phẩm
                    </Button>
                    <Button style={{ marginLeft: 8 }} onClick={() => navigate("/admin/products")}>
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductAdd;
