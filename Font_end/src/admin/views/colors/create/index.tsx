import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminColorSlice";
import { HttpCodeString } from "@/utils/constants";
import { Modal, ColorPicker, Button, Form } from "antd";
import { useState } from "react";

interface IColorForm {
  color: string;
}
interface IProps {
  refreshData: () => void;
}
const AddColorModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<IColorForm>({
    color: "",
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ color: "" }); // Reset state
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
      const response = await adminApi.addColor(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Thêm màu thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Thêm màu thất bại",
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
      title="Thêm mới màu"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {/* Chọn màu */}
        <Form.Item
          label="Chọn màu"
          name="color"
          rules={[{ required: true, message: "Vui lòng chọn màu!" }]}
        >
          <ColorPicker
            value={formData.color}
            onChange={(color) => onChangeFormData("color", color.toHexString())}
            showText
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

export default AddColorModal;
