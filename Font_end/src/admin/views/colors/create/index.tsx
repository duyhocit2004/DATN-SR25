import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminColorSlice";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form, ColorPicker } from "antd";
import { useState } from "react";

interface IColorForm {
  name: string;
  code: string;
}

interface IProps {
  refreshData: () => void;
}

const AddColorModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<IColorForm>({
    name: "",
    code: "",
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ name: "", code: "" });
    form.resetFields();
  };

  const onChangeFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    form.setFieldsValue({ [key]: value });
  };

  const handleSave = () => {
    form
      .validateFields()
      .then(() => {
        onSave();
      })
      .catch(() => console.log("Lỗi xác thực!"));
  };

  const onSave = async () => {
    const payload = {
      name: formData.name,
      code: formData.code
    };
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
      title="Thêm màu mới"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên màu"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên màu!" }]}
        >
          <Input 
            placeholder="Nhập tên màu (ví dụ: Đỏ, Xanh, Vàng...)"
            value={formData.name}
            onChange={(e) => onChangeFormData("name", e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Mã màu"
          name="code"
          rules={[{ required: true, message: "Vui lòng chọn mã màu!" }]}
        >
          <ColorPicker
            format="hex"
            value={formData.code}
            onChange={(color) => onChangeFormData("code", color.toHexString())}
            showText
          />
        </Form.Item>

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
