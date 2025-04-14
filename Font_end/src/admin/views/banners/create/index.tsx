import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminBannerSlice";
import { BannerTypeData } from "@/utils/constantData";
import { HttpCodeString } from "@/utils/constants";
import { objectToFormData } from "@/utils/functions";
import { UploadOutlined } from "@ant-design/icons";
import { Modal, Button, Form, UploadFile, Upload, Select, Input } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

interface IBannerForm {
  image: UploadFile | null;
  type: string;
  status: boolean | null;
  link: string;
  product_id: string;
}

interface IProps {
  refreshData: () => void;
}

const AddBannerModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<IBannerForm>({
    image: null,
    type: "",
    status: null,
    link: "",
    product_id: "",
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ image: null, type: "", status: null }); // Reset state
    form.resetFields(); // Reset form
  };

  // Hàm cập nhật state & form
  const onChangeFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    form.setFieldsValue({ [key]: value });
  };

  // Lưu dữ liệu
  const handleSave = () => {
    form
      .validateFields()
      .then(() => {
        onSave();
      })
      .catch(() => console.log("Validation failed!"));
  };

  const onSave = async () => {
    const payload = {
      ...formData,
      image: formData.image?.originFileObj,
    };

    const payloadFormData = objectToFormData(payload);

    setLoading(true);

    try {
      const response = await adminApi.addBanner(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Thêm banner thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Thêm banner thất bại",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    dispatch(setShowAddModal(false));
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
      title="Thêm mới banner"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Chọn ảnh"
          name="image"
          rules={[{ required: true, message: "Vui lòng chọn ảnh!" }]}
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
        <Form.Item
          label="Loại banner"
          name="type"
          rules={[{ required: true, message: "Vui lòng chọn loại banner!" }]}
        >
          <Select
            placeholder="Chọn loại banner"
            options={BannerTypeData}
            onChange={(value) => {
              onChangeFormData("type", value);
            }}
          />
        </Form.Item>
        {/* <Form.Item
          label="ID sản phẩm"
          name="product_id"
          rules={[{ required: true, message: "Vui lòng nhập ID sản phẩm!" }]}
        >
          <Input
            placeholder="VD: 123"
            value={formData.product_id}
            onChange={(e) => onChangeFormData("product_id", e.target.value)}
          />
        </Form.Item> */}

        <Form.Item
          label="Link sản phẩm sale"
          name="link"
          rules={[{ required: true, message: "Vui lòng nhập link!" }]}
        >
          <Input
            placeholder="https://example.com/products/123"
            value={formData.link}
            onChange={(e) => onChangeFormData("link", e.target.value)}
          />
        </Form.Item>

        {/* Nhập mô tả */}
        {/* <Form.Item label="Mô tả" name="description">
          <Input.TextArea
            value={formData.description}
            onChange={(e) => onChangeFormData("description", e.target.value)}
            placeholder="Nhập mô tả banner..."
            rows={3}
          />
        </Form.Item> */}

        {/* Nút hành động */}
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" loading={loading} onClick={handleSave}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddBannerModal;
