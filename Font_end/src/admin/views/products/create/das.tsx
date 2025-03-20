import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadFile,
  message,
  InputNumber,
  Space,
  Row,
  Col,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import QuantitySelector from "@/components/quantity-selector";

const { Option } = Select;

// Danh sách màu sắc & kích thước
const COLORS = ["Trắng", "Đen", "Vàng", "Xanh", "Đỏ"];
const SIZES = ["S", "M", "L", "XL", "XXL"];

interface Variant {
  id: number;
  color?: string;
  size?: string;
  quantity: number;
  price: number;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [thumbnail, setThumbnail] = useState<UploadFile | null>(null);
  const [album, setAlbum] = useState<UploadFile[]>([]);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Xử lý chọn ảnh đại diện
  const handleThumbnailChange = ({ file }: { file: UploadFile }) => {
    setThumbnail(file);
    setThumbnailError(false);
  };

  // Xử lý chọn album ảnh
  const handleAlbumChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setAlbum(fileList);
  };

  // Xử lý submit form
  const onFinish = (values: any) => {
    if (!thumbnail) {
      setThumbnailError(true);
      message.error("Vui lòng tải lên ảnh đại diện sản phẩm!");
      return;
    }
    if (variants.some((v) => !v.color || !v.size)) {
      message.error("Mỗi biến thể cần có cả màu sắc và kích thước!");
      return;
    }
    console.log("Dữ liệu sản phẩm:", { ...values, thumbnail, album, variants });
    message.success("Thêm sản phẩm thành công!");
    navigate("/product-list");
  };
  

  return (
    <div className="create-product-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Thêm mới sản phẩm</h2>
        <div>
          <Button onClick={() => navigate("/product-list")} className="mr-3">
            Hủy
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="body-area pt-6">
        {/* Form */}
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="form-body grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Cột trái: Thông tin sản phẩm */}
            <div className="product-info">
              <Form.Item
                name="name"
                label="Tên sản phẩm"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                ]}
              >
                <Input placeholder="Nhập tên sản phẩm" />
              </Form.Item>

              <Form.Item
                name="category"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
              >
                <Select placeholder="Chọn danh mục">
                  <Option value="ao-phong">Áo phông</Option>
                  <Option value="quan-jean">Quần jean</Option>
                  <Option value="ao-khoac">Áo khoác</Option>
                </Select>
              </Form.Item>

              <Form.Item name="description" label="Mô tả">
                <Input.TextArea rows={3} placeholder="Nhập mô tả sản phẩm" />
              </Form.Item>

              <Form.Item name="content" label="Nội dung">
                <Input.TextArea
                  rows={5}
                  placeholder="Nhập nội dung chi tiết sản phẩm"
                />
              </Form.Item>

              {/* Biến thể sản phẩm */}
              <h3 className="text-lg font-semibold mt-6 mb-4">
                Biến thể sản phẩm
              </h3>
              {variants.map((variant, index) => (
                <div
                  key={variant.id}
                  className="w-full grid grid-cols-5 gap-4 mb-4"
                >
                  <Select
                    placeholder="Chọn màu"
                    value={variant.color}
                    onChange={(value) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].color = value;
                      setVariants(updatedVariants);
                    }}
                  >
                    {COLORS.map((color) => (
                      <Option key={color} value={color}>
                        {color}
                      </Option>
                    ))}
                  </Select>

                  <Select
                    placeholder="Chọn size"
                    value={variant.size}
                    onChange={(value) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].size = value;
                      setVariants(updatedVariants);
                    }}
                  >
                    {SIZES.map((size) => (
                      <Option key={size} value={size}>
                        {size}
                      </Option>
                    ))}
                  </Select>

                  <QuantitySelector
                    style={{
                      height: 32,
                    }}
                    value={variant.quantity}
                    min={1}
                    onChange={(value: number) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].quantity = value || 1;
                      setVariants(updatedVariants);
                    }}
                  />

                  <InputNumber
                    className="!w-full"
                    controls={false}
                    min={0}
                    value={variant.price}
                    onChange={(value) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].price = value || 0;
                      setVariants(updatedVariants);
                    }}
                  />

                  <Tooltip title={"Xóa"}>
                    <Button
                      className="w-20"
                      type="text"
                      danger
                      onClick={() =>
                        setVariants(variants.filter((v) => v.id !== variant.id))
                      }
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </div>
              ))}

              {/* Nút thêm biến thể */}
              <Button
                type="dashed"
                onClick={() =>
                  setVariants([
                    ...variants,
                    { id: Date.now(), quantity: 1, price: 0 },
                  ])
                }
                icon={<PlusOutlined />}
              >
                Thêm biến thể
              </Button>
            </div>

            {/* Cột phải: Ảnh */}
            <div className="images">
              <Form.Item
                label="Ảnh đại diện"
                validateStatus={thumbnailError ? "error" : ""}
                help={thumbnailError ? "Vui lòng tải lên ảnh đại diện!" : ""}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={thumbnail ? [thumbnail] : []}
                  onChange={handleThumbnailChange}
                  beforeUpload={() => false}
                >
                  {!thumbnail && (
                    <div>
                      <UploadOutlined /> <div>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>

              <Form.Item label="Album ảnh">
                <Upload
                  listType="picture-card"
                  multiple
                  fileList={album}
                  onChange={handleAlbumChange}
                  beforeUpload={() => false}
                >
                  {album.length < 5 && (
                    <div>
                      <UploadOutlined /> <div>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddProduct;
