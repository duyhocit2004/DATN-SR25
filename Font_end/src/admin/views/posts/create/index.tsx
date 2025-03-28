import {
  Input,
  Button,
  Form,
  Upload,
  message,
  UploadFile,
  Select,
  Spin,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RcFile } from "antd/es/upload";
import "./index.scss";
import { objectToFormData } from "@/utils/functions";
import postApi from "@/api/postApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast"; // Import showToast
import { cloneDeep, debounce } from "lodash";
import { IProduct } from "../types";
import productApi from "@/api/productApi";

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

interface IFormData {
  title: string;
  image: UploadFile | null;
  description: string;
  content: string;
}

interface IPayloadSearchProduct {
  name: string;
  pageNum: number;
  pageSize: number;
}

const pageSize = 10;

const { Option } = Select;

const CreatePost: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IFormData>({
    title: "",
    image: null,
    description: "",
    content: "",
  });
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [searchProductName, setSearchProductName] = useState<string>("");

  useEffect(() => {
    const payload = {
      pageNum: 1,
      pageSize: pageSize,
      name: "",
    };
    fetchProducts(payload);
  }, []);

  // Hàm cập nhật state & form
  const onChangeFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    form.setFieldsValue({ [key]: value });
  };

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
      setFormData((prev) => {
        return {
          ...prev,
          image: null,
        };
      });
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
    setFormData((prev) => {
      return {
        ...prev,
        image: imageData,
      };
    });
    form.setFieldValue("image", imageData);
  };

  // Xử lý submit form
  const onFinish = async (values: any) => {
    console.log("formData:", formData);
    console.log("values:", values);

    const payload = {
      ...formData,
      image: formData.image?.originFileObj,
    };

    const payloadFormData = objectToFormData(payload);

    try {
      const response = await postApi.createPost(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Thêm bài viết thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/admin/posts");
      } else {
        showToast({
          content: "Thêm bài viết thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch {}
  };

  // Giả sử API của bạn có thể lọc sản phẩm dựa trên từ khóa và phân trang
  const fetchProducts = async (payload: IPayloadSearchProduct) => {
    setLoading(true);
    try {
      const response = await productApi.getProductsByFilter(payload);
      if (response.status === HttpCodeString.SUCCESS) {
        const newProducts = [...products, ...response.data.data];
        setProducts(newProducts as IProduct[]);
        setHasMore(newProducts?.length < response.data.total); // Giả sử mỗi lần tải 10 sản phẩm
      } else {
        setHasMore(false); // Nếu không còn dữ liệu
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  // Khi người dùng cuộn đến cuối danh sách, tải thêm dữ liệu
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement; // Ép kiểu đúng cho e.target
    const bottom =
      target.scrollHeight === target.scrollTop + target.clientHeight;
    if (bottom && hasMore && !loading) {
      setPage((prev) => prev + 1);
      const payload = {
        pageNum: page,
        pageSize: pageSize,
        name: searchProductName,
      };
      fetchProducts(payload);
    }
  };

  // Debounce tìm kiếm (sử dụng lodash để tránh gọi API quá nhanh khi người dùng gõ)
  const handleSearch = debounce((value: string) => {
    setSearchProductName(value);
    setProducts([]); // Reset lại danh sách sản phẩm khi người dùng thay đổi từ khóa tìm kiếm
    setPage(1); // Reset lại trang để tải lại từ đầu
    const payload = {
      pageNum: 1,
      pageSize: pageSize,
      name: value,
    };
    fetchProducts(payload);
  }, 500);

  return (
    <div className="create-post-container bg-white">
      
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Thêm mới bài viết</h2>
        <div>
          <Button onClick={() => navigate("/admin/posts")} className="mr-3">
            Hủy
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
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
          {/* Tiêu đề */}
          <Form.Item
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: "Vui lòng nhập tiêu đề!" }]}
          >
            <Input
              value={formData.title}
              onChange={(e) => onChangeFormData("title", e.target.value)}
            />
          </Form.Item>

          {/* Mô tả ngắn */}
          <Form.Item label="Mô tả ngắn" name="description">
            <Input.TextArea
              value={formData.description}
              onChange={(e) => onChangeFormData("description", e.target.value)}
              rows={3}
            />
          </Form.Item>

          {/* Ảnh Thumbnail */}
          <Form.Item
            label="Ảnh đại diện"
            name="image"
            // validateStatus={thumbnailError ? "error" : ""}
            // help={thumbnailError ? "Vui lòng tải lên ảnh đại diện!" : ""}
            rules={[{ required: true, message: "Vui lòng chọn ảnh đại diện!" }]}
          >
            <Upload
              listType="picture-card"
              maxCount={1}
              fileList={formData.image ? [formData.image] : []}
              onChange={handleThumbnailChange}
              beforeUpload={() => false}
              showUploadList={{ showPreviewIcon: false }} // Ẩn icon preview
            >
              {!formData.image && (
                <div>
                  <UploadOutlined /> <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item label="Sản phẩm" name="title">
            <Select
              showSearch
              placeholder="Chọn sản phẩm"
              style={{ width: "100%" }}
              onSearch={handleSearch} // Lắng nghe sự kiện tìm kiếm
              filterOption={false} // Tắt filter để tránh tìm kiếm không cần thiết
              notFoundContent={loading ? <Spin size="small" /> : null}
              dropdownRender={(menu) => (
                <div
                  onScroll={handleScroll}
                  style={{ maxHeight: 300, overflowY: "auto" }}
                >
                  {menu}
                </div>
              )}
            >
              {products.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* Nội dung bài viết */}
          <Form.Item
            label="Nội dung"
            name="content"
            rules={[
              { required: true, message: "Vui lòng nhập nội dung bài viết!" },
            ]}
          >
            <ReactQuill
              value={formData.content}
              modules={modules} // Cấu hình toolbar, hotkey, clipboard, v.v.
              formats={formats} // Danh sách các định dạng hỗ trợ (bold, italic, underline, v.v.)
              onChange={(value) => onChangeFormData("content", value)}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreatePost;
