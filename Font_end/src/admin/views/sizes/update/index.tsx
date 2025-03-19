import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedSize } from "@/store/reducers/adminSizeSlice";
import { ISize } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form } from "antd";
import { useEffect, useState } from "react";

interface ISizeForm {
  id: number | null;
  size: string;
}

interface IProps {
  refreshData: () => void;
}

const UpdateSizeModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const { selectedSize } = useAppSelector((state) => state.adminSize);
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<ISizeForm>({
    id: null,
    size: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedSize) {
      setFormValue(selectedSize);
    } else {
      resetForm();
    }
  }, [selectedSize]);

  const resetForm = () => {
    setFormData({ id: null, size: "" }); // Reset state
    form.resetFields(); // Reset form
  };

  const setFormValue = (currentSize: ISize) => {
    setFormData({ ...currentSize });
    form.setFieldsValue({
      size: currentSize.size,
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
      const response = await adminApi.updateSize(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Cập nhật kích thước thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Cập nhật kích thước thất bại",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    dispatch(setSelectedSize(null));
  };

  return (
    <Modal
      title="Cập nhật kích thước"
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

export default UpdateSizeModal;
