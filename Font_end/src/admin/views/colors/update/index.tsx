import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedColor } from "@/store/reducers/adminColorSlice";
import { IColor } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Modal, ColorPicker, Button, Form } from "antd";
import { useEffect, useState } from "react";

interface IColorForm {
  id: number | null;
  color: string;
}

interface IProps {
  refreshData: () => void;
}

const UpdateColorModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const { selectedColor } = useAppSelector((state) => state.adminColor);
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<IColorForm>({
    id: null,
    color: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedColor) {
      setFormValue(selectedColor);
    } else {
      resetForm();
    }
  }, [selectedColor]);

  const resetForm = () => {
    setFormData({ id: null, color: ""}); // Reset state
    form.resetFields(); // Reset form
  };
  const setFormValue = (currentColor: IColor) => {
    setFormData({
      id: currentColor.id,
      color: currentColor.code,
    });
    form.setFieldsValue({
      color: currentColor.code,
    });
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
      const response = await adminApi.updateColor(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Cập nhật màu thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Cập nhật màu thất bại",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    dispatch(setSelectedColor(null));
  };

  return (
    <Modal
      title="Cập nhât màu"
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

export default UpdateColorModal;
