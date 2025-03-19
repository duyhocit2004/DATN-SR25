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
    Col,
    Row,
    Space
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;

// Hàm xử lý upload ảnh
const normFile = (e: any) => (Array.isArray(e) ? e : e?.fileList);

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
                const categoryRes = await fetch("http://127.0.0.1:8000/api/categories");
                setCategories(await categoryRes.json());

                const colorRes = await fetch("http://127.0.0.1:8000/api/colors");
                setColors(await colorRes.json());

                const sizeRes = await fetch("http://127.0.0.1:8000/api/sizes");
                setSizes(await sizeRes.json());
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
                message.error("Không thể tải dữ liệu!");
            }
        };
        fetchData();
    }, []);

    const onFinish = async (values: any) => {
        try {
            if (!values.avatar?.[0]?.originFileObj) {
                message.error("Vui lòng chọn ảnh đại diện!");
                return;
            }

            const formDataProduct = new FormData();
            formDataProduct.append("name_product", values.name);
            formDataProduct.append("categories_id", values.category);
            formDataProduct.append("base_stock", values.quantity);
            formDataProduct.append("price_regular", values.price);
            formDataProduct.append(
                "price_sale",
                values.discount ? values.price - (values.price * values.discount) / 100 : values.price
            );
            formDataProduct.append("description", values.description);
            formDataProduct.append("content", values.content || "");
            formDataProduct.append("image", values.avatar[0].originFileObj);
            formDataProduct.append("SKU", values.SKU || "DEFAULT_SKU");

            const productResponse = await fetch("http://127.0.0.1:8000/api/products", {
                method: "POST",
                body: formDataProduct,
            });

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
        <Card title="Thêm sản phẩm mới" bordered={false} style={{ maxWidth: 900, margin: "0 auto", padding: "20px" }}>
            <Form form={form} name="productAdd" layout="vertical" onFinish={onFinish}>
                <Row gutter={24}>
                    {/* Cột trái: Thông tin sản phẩm */}
                    <Col span={16}>
                        <Form.Item label="Tên sản phẩm" name="name" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}>
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>

                        <Form.Item label="Danh mục" name="category" rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}>
                            <Select placeholder="Chọn danh mục">
                                {categories.map((category) => (
                                    <Option key={category.id} value={category.id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item label="Màu sắc" name="color" rules={[{ required: true, message: "Vui lòng chọn màu!" }]}>
                                    <Select placeholder="Chọn màu">
                                        {colors.map((color) => (
                                            <Option key={color.id} value={color.name}>
                                                {color.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Kích cỡ" name="size" rules={[{ required: true, message: "Vui lòng chọn kích cỡ!" }]}>
                                    <Select placeholder="Chọn kích cỡ">
                                        {sizes.map((size) => (
                                            <Option key={size.id} value={size.name}>
                                                {size.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={12}>
                            <Col span={12}>
                                <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                                    <InputNumber min={1} style={{ width: "100%" }} placeholder="Nhập số lượng" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Giá sản phẩm (VNĐ)" name="price" rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm!" }]}>
                                    <InputNumber min={0} style={{ width: "100%" }} placeholder="Nhập giá sản phẩm" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.Item label="Giảm giá sản phẩm (%)" name="discount">
                            <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="Nhập % giảm giá (Nếu có)" />
                        </Form.Item>

                        <Form.Item label="Miêu tả" name="description" rules={[{ required: true, message: "Vui lòng nhập miêu tả!" }]}>
                            <TextArea rows={3} placeholder="Nhập miêu tả sản phẩm" />
                        </Form.Item>
                    </Col>

                    {/* Cột phải: Hình ảnh */}
                    <Col span={8}>
                        {/* <Form.Item label="Ảnh đại diện" 
                        name="avatar" valuePropName="fileList" 
                        getValueFromEvent={normFile}
                         rules={[{ required: true, 
                         message: "Vui lòng chọn ảnh đại diện!" }]}>
                            <Upload name="avatar" listType="picture-card" maxCount={1} beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                            </Upload>
                        </Form.Item> */}

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

                        <Form.Item label="Album ảnh" name="gallery" valuePropName="fileList" getValueFromEvent={normFile}>
                            <Upload name="gallery" listType="picture" multiple beforeUpload={() => false}>
                                <Button icon={<UploadOutlined />}>Thêm ảnh</Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Nút hành động căn giữa */}
                <Form.Item style={{ textAlign: "center", marginTop: "20px" }}>
                    <Space>
                        <Button type="primary" htmlType="submit">Thêm sản phẩm</Button>
                        <Button onClick={() => navigate("/admin/products")}>Hủy</Button>
                    </Space>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default ProductAdd;
