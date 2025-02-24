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
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    // Fetch dữ liệu từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Lấy danh mục
                const categoryRes = await fetch("http://127.0.0.1:8000/api/categories");
                const categoryData = await categoryRes.json();
                setCategories(categoryData);

                // Lấy màu sắc
                const colorRes = await fetch("http://127.0.0.1:8000/api/colors");
                const colorData = await colorRes.json();
                setColors(colorData);

                // Lấy kích cỡ
                const sizeRes = await fetch("http://127.0.0.1:8000/api/sizes");
                const sizeData = await sizeRes.json();
                setSizes(sizeData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                message.error("Không thể tải dữ liệu!");
            }
        };

        fetchData();
    }, []);
    const onFinish = async (values) => {
        try {
            if (!values.avatar?.[0]?.originFileObj) {
                message.error("Vui lòng chọn ảnh đại diện!");
                return;
            }
            // Sau khi có URL ảnh, gửi lên backend
            const formDataProduct = new FormData();
            formDataProduct.append("name_product", values.name);
            formDataProduct.append("categories_id", values.category);
            formDataProduct.append("base_stock", values.quantity);
            formDataProduct.append("price_regular", values.price);
            formDataProduct.append("price_sale", values.discount ? values.price - (values.price * values.discount) / 100 : values.price);
            formDataProduct.append("description", values.description);
            formDataProduct.append("content", values.content || "");
            formDataProduct.append("image", values.avatar[0].originFileObj); // Gửi URL ảnh thay vì file
            formDataProduct.append("SKU", values.SKU || "DEFAULT_SKU");

            console.log("Form Data gửi lên backend:");
            for (let [key, value] of formDataProduct.entries()) {
                console.log(key, value);
            }


            const productResponse = await fetch("http://127.0.0.1:8000/api/products", {
                method: "POST",
                body: formDataProduct,
            });

            const responseText = await productResponse.text();
            console.log("Raw response:", responseText);

            if (productResponse.ok) {
                message.success("Thêm sản phẩm thành công!");
                navigate("/admin/products");
            } else {
                message.error(`Lỗi ${productResponse.status}: Không thể thêm sản phẩm!`);
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

                {/* Màu sắc */}
                <Form.Item label="Màu sắc" name="color" rules={[{ required: true, message: "Vui lòng chọn màu!" }]}>
                    <Select placeholder="Chọn màu">
                        {colors.map((color) => (
                            <Option key={color.id} value={color.name}>
                                {color.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                {/* Kích cỡ */}
                <Form.Item label="Kích cỡ" name="size" rules={[{ required: true, message: "Vui lòng chọn kích cỡ!" }]}>
                    <Select placeholder="Chọn kích cỡ">
                        {sizes.map((size) => (
                            <Option key={size.id} value={size.name}>
                                {size.name}
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

                {/* Giảm giá sản phẩm (Không bắt buộc) */}
                <Form.Item
                    label="Giảm giá sản phẩm (%)"
                    name="discount"
                >
                    <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="Nhập % giảm giá (Nếu có)" />
                </Form.Item>


                {/* Miêu tả */}
                <Form.Item label="Miêu tả" name="description" rules={[{ required: true, message: "Vui lòng nhập miêu tả!" }]}>
                    <TextArea rows={4} placeholder="Nhập miêu tả sản phẩm" />
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
