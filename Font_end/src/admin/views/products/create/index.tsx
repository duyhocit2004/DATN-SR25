import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  UploadFile,
  InputNumber,
  Tooltip,
  Cascader,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import QuantitySelector from "@/components/quantity-selector";
import { showToast } from "@/components/toast"; // Import showToast
import { RcFile } from "antd/es/upload";
import { cloneDeep } from "lodash";
import { objectToFormData } from "@/utils/functions";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import homeApi from "@/api/homeApi";
import { IColor, IListCategory, ISize } from "@/types/interface";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const { Option } = Select;

interface Variant {
  id: number;
  color?: number;
  size?: number;
  quantity: number;
}

interface IFormData {
  name: string;
  categoryId: number[] | null;
  discount: number | null;
  price: number | null;
  description: string;
  content: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "image", "video"],
    ["clean"], // Nút xoá định dạng
    ["superscript", "subscript"],
  ],
  clipboard: {
    matchVisual: false, // Giữ format khi copy-paste hay không
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "color",
  "background",
];

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [thumbnail, setThumbnail] = useState<UploadFile | null>(null);
  const [album, setAlbum] = useState<UploadFile[]>([]);
  const [colors, setColors] = useState<IColor[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [formData, setFormData] = useState<IFormData>({
    name: "",
    categoryId: null,
    discount: null,
    price: null,
    description: "",
    content: "",
  });

  useEffect(() => {
    getCategories();
    getColors();
    getSizes();
  }, []);

  const getColors = async () => {
    try {
      const response = await productApi.getAllColors();
      if (response?.status === HttpCodeString.SUCCESS) {
        setColors(response.data as IColor[]);
      } else {
        setColors([]);
      }
    } catch {
      setColors([]);
    }
  };
  const getSizes = async () => {
    try {
      const response = await productApi.getAllSizes();
      if (response?.status === HttpCodeString.SUCCESS) {
        setSizes(response.data as ISize[]);
      } else {
        setSizes([]);
      }
    } catch {
      setSizes([]);
    }
  };
  const getCategories = async () => {
    try {
      const response = await homeApi.getAllCategories();
      if (response?.status === HttpCodeString.SUCCESS) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };

  // Xử lý chọn ảnh đại diện
  const handleThumbnailChange = ({ fileList }: { fileList: UploadFile[] }) => {
    // if (file?.status === "removed") {
    //   setThumbnail(null);
    //   return;
    // }
    // setThumbnail({
    //   ...file,
    //   originFileObj: file as RcFile
    // });
    if (fileList.length === 0) {
      setThumbnail(null);
      form.setFieldValue("image", null);
      return;
    }
    const latestFile = fileList[fileList.length - 1]; // Lấy file mới nhất
    const imageData = {
      ...latestFile,
      url: latestFile.originFileObj
        ? URL.createObjectURL(latestFile.originFileObj as RcFile)
        : latestFile.url, // Giữ URL cũ nếu có
    };
    setThumbnail(imageData);
    form.setFieldValue("image", imageData);
  };

  // Xử lý chọn album ảnh
  const handleAlbumChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setAlbum(fileList);
  };

  // Xử lý submit form
  const onFinish = async (values: any) => {
    console.log("formData:", formData);
    console.log("values:", values);

    if (!thumbnail) {
      showToast({
        content: "Vui lòng tải lên ảnh đại diện sản phẩm!",
        duration: 5,
        type: "error",
      });
      return;
    }
    if (variants.length === 0){
      showToast({
        content: "Mỗi sản phẩm cần có ít nhất 1 biến thể!",
        duration: 5,
        type: "error",
      });
      return;
    }
    if (variants.some((v) => !v.color || !v.size)) {
      showToast({
        content: "Mỗi biến thể cần có cả màu sắc và kích thước!",
        duration: 5,
        type: "error",
      });
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      categoryId:
        formData?.categoryId && formData?.categoryId?.length > 0
          ? formData.categoryId[formData.categoryId.length - 1]
          : null,
      variants: variants,
      image: thumbnail.originFileObj,
      albumImage: album.map((e) => {
        return e.originFileObj;
      }),
    };

    const payloadFormData = objectToFormData(payload);

    try {
      const response = await productApi.createProduct(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Thêm sản phẩm thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/admin/products");
      } else {
        showToast({
          content: "Thêm sản phẩm thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách màu chưa bị chọn trùng với size đang chọn
  const getAvailableColors = (
    selectedSize: number | undefined,
    currentIndex: number
  ) => {
    if (!selectedSize) return colors; // Nếu chưa chọn size, hiển thị toàn bộ màu

    const selectedColors = variants
      .filter(
        (v, index) =>
          index !== currentIndex && v.size === selectedSize && v.color
      )
      .map((v) => v.color);

    return colors.filter(
      (color) =>
        !selectedColors.includes(color.id) ||
        variants[currentIndex]?.color === color.id
    );
  };
  // Lấy danh sách size chưa bị chọn trùng với màu đang chọn
  const getAvailableSizes = (
    selectedColor: number | undefined,
    currentIndex: number
  ) => {
    if (!selectedColor) return sizes; // Nếu chưa chọn màu, hiển thị toàn bộ size

    const selectedSizes = variants
      .filter(
        (v, index) =>
          index !== currentIndex && v.color === selectedColor && v.size
      )
      .map((v) => v.size);

    return sizes.filter(
      (size) =>
        !selectedSizes.includes(size.id) ||
        variants[currentIndex]?.size === size.id
    );
  };

  const onChangeProductInfo = (key: string, value: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    form.setFieldValue(key, value);
  };

  return (
    <div className="create-product-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Thêm mới sản phẩm</h2>
        <div>
          <Button onClick={() => navigate("/admin/products")} className="mr-3">
            Hủy
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="body-area pt-6">
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={cloneDeep(formData)}
          onFinish={onFinish}
        >
          <div className="form-body grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Cột trái: Thông tin sản phẩm */}
            <div className="product-info">
              <div className="grid grid-cols-2 gap-2">
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) => {
                      onChangeProductInfo("name", e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="categoryId"
                  label="Danh mục"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục!" },
                  ]}
                >
                  {/* <Select
                    placeholder="Chọn danh mục"
                    onChange={(value) => {
                      onChangeProductInfo("categoryId", value);
                    }}
                  >
                    <Option value="ao-phong">Áo phông</Option>
                    <Option value="quan-jean">Quần jean</Option>
                    <Option value="ao-khoac">Áo khoác</Option>
                  </Select> */}
                  <Cascader
                    options={categories?.map((e) => {
                      return {
                        value: e.id,
                        label: e.name,
                        children: e.children?.map((child) => {
                          return {
                            value: child.id,
                            label: child.name,
                          };
                        }),
                      };
                    })}
                    onChange={(value: number[]) => {
                      onChangeProductInfo("categoryId", value);
                    }}
                    placeholder="Please select"
                  />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Form.Item
                  name="price"
                  label="Giá sản phẩm"
                  rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                >
                  <InputNumber
                    className="!w-full"
                    controls={false}
                    placeholder="Nhập giá sản phẩm"
                    min={0}
                    onChange={(value) => {
                      onChangeProductInfo("price", value);
                    }}
                  />
                </Form.Item>

                <Form.Item name="discount" label="Giảm giá">
                  <InputNumber
                    className="!w-36"
                    placeholder="Nhập giảm giá"
                    min={0}
                    max={50}
                    onChange={(value) => {
                      onChangeProductInfo("discount", value);
                    }}
                  />{" "}
                  %
                </Form.Item>
              </div>

              <Form.Item name="description" label="Mô tả">
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập mô tả sản phẩm"
                  onChange={(e) => {
                    onChangeProductInfo("description", e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item name="content" label="Nội dung">
                <ReactQuill
                  placeholder="Nhập nội dung chi tiết sản phẩm"
                  value={formData.content}
                  modules={modules} // Cấu hình toolbar, hotkey, clipboard, v.v.
                  formats={formats} // Danh sách các định dạng hỗ trợ (bold, italic, underline, v.v.)
                  onChange={(value) => onChangeProductInfo("content", value)}
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
                    allowClear
                    onChange={(value) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].color = value;
                      setVariants(updatedVariants);
                    }}
                  >
                    {getAvailableColors(variant.size, index)?.map((color) => (
                      <Option key={color.id} value={color.id}>
                        {color.code}
                      </Option>
                    ))}
                  </Select>

                  <Select
                    placeholder="Chọn size"
                    value={variant.size}
                    allowClear
                    onChange={(value) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].size = value;
                      setVariants(updatedVariants);
                    }}
                  >
                    {getAvailableSizes(variant.color, index)?.map((size) => (
                      <Option key={size.id} value={size.id}>
                        {size.size}
                      </Option>
                    ))}
                  </Select>

                  <QuantitySelector
                    style={{
                      height: 32,
                    }}
                    value={variant.quantity}
                    min={1}
                    readonly={false}
                    onChange={(value: number) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].quantity = value || 1;
                      setVariants(updatedVariants);
                    }}
                  />

                  {/* <InputNumber
                    className="!w-full"
                    controls={false}
                    min={0}
                    value={variant.price}
                    onChange={(value) => {
                      const updatedVariants = [...variants];
                      updatedVariants[index].price = value || 0;
                      setVariants(updatedVariants);
                    }}
                  /> */}

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
                  setVariants([...variants, { id: Date.now(), quantity: 1 }])
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
                name="image"
                // validateStatus={thumbnailError ? "error" : ""}
                // help={thumbnailError ? "Vui lòng tải lên ảnh đại diện!" : ""}
                rules={[
                  { required: true, message: "Vui lòng chọn ảnh đại diện!" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  maxCount={1}
                  fileList={thumbnail ? [thumbnail] : []}
                  onChange={handleThumbnailChange}
                  beforeUpload={() => false}
                  showUploadList={{ showPreviewIcon: false }} // Ẩn icon preview
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
                  showUploadList={{ showPreviewIcon: false }} // Ẩn icon preview
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
