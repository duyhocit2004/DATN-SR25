import adminApi from "@/api/adminApi";
import homeApi from "@/api/homeApi";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedCategory } from "@/store/reducers/adminCategorySlice";
import { IListCategory } from "@/types/interface";
import { PersonTypeData } from "@/utils/constantData";
import { HttpCodeString } from "@/utils/constants";
import { objectToFormData, urlToFile } from "@/utils/functions";
import { UploadOutlined } from "@ant-design/icons";
import {
  Modal,
  Button,
  Form,
  UploadFile,
  Upload,
  Select,
  Input,
  Radio,
} from "antd";
import { RcFile } from "antd/es/upload";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import { IResponseCategory } from "../types";

interface IFormData {
  id: number | null;
  image: UploadFile | null;
  name: string;
  gender: string;
  parentId: number[] | null;
  description: string;
}

interface IProps {
  refreshData: () => void;
}

const UpdateCategoryModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const { selectedCategory } = useAppSelector((state) => state.adminCategory);
  const [form] = Form.useForm(); // Khởi tạo form
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [formData, setFormData] = useState<IFormData>({
    id: null,
    image: null,
    name: "",
    gender: "",
    parentId: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
    if (selectedCategory) {
      setFormValue(selectedCategory);
    }
  }, [selectedCategory]);

  const getCategories = async () => {
    try {
      const response = await homeApi.getParentCategories();
      if (response?.status === HttpCodeString.SUCCESS) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };

  const setFormValue = async (currentCategory: IResponseCategory) => {
    // Chuyển đổi thumbnail từ URL thành UploadFile
    const thumbnailFile = await urlToFile(
      currentCategory.image,
      "thumbnail.jpg"
    );
    const thumbnailUploadFile: UploadFile = {
      uid: "-1",
      name: thumbnailFile.name,
      status: "done",
      url: currentCategory.image, // Giữ nguyên URL
      originFileObj: thumbnailFile, // Gán file để khi submit có file gửi lên
    };
    setFormData({
      id: currentCategory.id,
      image: thumbnailUploadFile,
      name: currentCategory.name,
      gender: currentCategory.gender,
      parentId: currentCategory.parentId
        ? [currentCategory.parentId, currentCategory.id]
        : null,
      description: currentCategory.description,
    });
    form.setFieldsValue({
      image: thumbnailUploadFile,
      name: currentCategory.name,
      gender: currentCategory.gender,
      parentId: currentCategory.parentId,
      description: currentCategory.description,
    });
  };

  const resetForm = () => {
    setFormData({
      id: null,
      image: null,
      name: "",
      gender: "",
      parentId: null,
      description: "",
    }); // Reset state
    form.resetFields(); // Reset form
  };

  // Hàm cập nhật state & form
  const onChangeFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    form.setFieldsValue({ [key]: value });
  };

  // Xử lý submit form
  const onFinish = async () => {
    if (!formData.image) {
      showToast({
        content: "Vui lòng tải lên ảnh danh mục sản phẩm!",
        duration: 5,
        type: "error",
      });
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      image: formData.image?.originFileObj,
    };

    const payloadFormData = objectToFormData(payload);

    try {
      const response = await adminApi.updateCategory(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Cập nhật danh mục thành công!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Cập nhật danh mục thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    dispatch(setSelectedCategory(null));
  };

  // Xử lý chọn ảnh đại diện
  const handleThumbnailChange = ({ fileList }: { fileList: UploadFile[] }) => {
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

  return (
    <Modal
      title="Cập nhật danh mục"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
      // width={"60%"}
      className="!w-full lg:!w-3/5"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={cloneDeep(formData)}
        onFinish={onFinish}
      >
        <div className="form-body">
          <div className="flex gap-4">
            <div>
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
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <Form.Item
                  name="name"
                  label="Tên danh mục"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên danh mục!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Nhập tên danh mục"
                    onChange={(e) => {
                      onChangeFormData("name", e.target.value);
                    }}
                  />
                </Form.Item>
                <Form.Item name="parentId" label="Danh mục cha">
                  <Select
                    placeholder="Chọn danh mục cha"
                    options={categories}
                    fieldNames={{ value: "id", label: "name" }}
                    onChange={(value) => {
                      onChangeFormData("parentId", value);
                    }}
                  />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính">
                  <Radio.Group
                    options={PersonTypeData}
                    onChange={(e) => {
                      onChangeFormData("gender", e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
              <Form.Item name="description" label="Mô tả">
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập mô tả danh mục"
                  onChange={(e) => {
                    onChangeFormData("description", e.target.value);
                  }}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        {/* Nút hành động */}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Hủy</Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateCategoryModal;
