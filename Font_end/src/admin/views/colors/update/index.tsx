import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedColor } from "@/store/reducers/adminColorSlice";
import { IColor } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form } from "antd";
import { useEffect, useState } from "react";

interface IColorForm {
  id: number | null;
  name: string;
}

interface IProps {
  refreshData: () => void;
}

const UpdateColorModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const { selectedColor } = useAppSelector((state) => state.adminColor);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<IColorForm>({
    id: null,
    name: "",
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
    setFormData({ id: null, name: "" });
    form.resetFields();
    selectedColor && dispatch(setSelectedColor(null));
    form.setFieldsValue({ name: "" });
  };

  const setFormValue = (currentColor: IColor) => {
    setFormData({
      id: currentColor.id,
      name: currentColor.name || "",
    });
    form.setFieldsValue({
      name: currentColor.name || "",
    });
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
      id: formData.id,
      name: formData.name
    };
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
      title="Cập nhật màu"
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
