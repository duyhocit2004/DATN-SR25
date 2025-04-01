import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminSizeSlice";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";

interface ISizeForm {
  size: string;
}

interface IProps {
  refreshData: () => void;
}

const AddSizeModal: React.FC<IProps> = ({refreshData}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<ISizeForm>({
    size: "",
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ size: "" }); // Reset state
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
    const payload = { ...formData };
    setLoading(true);
    try {
      const response = await adminApi.addSize(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData()
        resetForm();
        onClose();
        showToast({
          content: "Thêm kích thước thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Thêm kích thước thất bại",
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

  return (
    <Modal
      title="Thêm mới kích thước"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {/* Chọn màu */}
        <Form.Item
          label="Kích thước"
          name="size"
          rules={[{ required: true, message: "Vui lòng nhập kích thước!" }]}
        >
          <Input
            value={formData.size}
            onChange={(e) => onChangeFormData("size", e.target.value)}
            placeholder="Nhập kích thước"
          />
        </Form.Item>

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

export default AddSizeModal;
