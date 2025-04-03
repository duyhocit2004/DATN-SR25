import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminVoucherSlice";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form, InputNumber } from "antd";
import { useState } from "react";

interface IVoucherForm {
  voucherCode: string;
  quantity: number | null;
  voucherPrice: number | null;
  description: string;
}

interface IProps {
  refreshData: () => void;
}
const AddVoucherModal: React.FC<IProps> = ({refreshData}) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<IVoucherForm>({
    voucherCode: "",
    quantity: null,
    voucherPrice: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({
      voucherCode: "",
      quantity: null,
      voucherPrice: null,
      description: "",
    }); // Reset state
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
      const response = await adminApi.addVoucher(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Thêm voucher thành công!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Thêm voucher thất bại!",
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
      title="Thêm mới voucher"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {/* Chọn màu */}
        <Form.Item
          label="Mã voucher"
          name="voucherCode"
          rules={[{ required: true, message: "Vui lòng nhập mã voucher!" }]}
        >
          <Input
            value={formData.voucherCode}
            onChange={(e) => onChangeFormData("voucherCode", e.target.value)}
            placeholder="Nhập mã voucher"
          />
        </Form.Item>
        <Form.Item
          name="voucherPrice"
          label="Giá giảm"
          rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
        >
          <InputNumber
            className="!w-full"
            controls={false}
            placeholder="Nhập giá giảm"
            min={0}
            onChange={(value) => {
              onChangeFormData("voucherPrice", value);
            }}
          />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
        >
          <InputNumber
            className="!w-full"
            controls={false}
            placeholder="Nhập số lượng"
            min={0}
            onChange={(value) => {
              onChangeFormData("quantity", value);
            }}
          />
        </Form.Item>

        {/* Nhập mô tả */}
        <Form.Item label="Mô tả" name="description">
          <Input.TextArea
            value={formData.description}
            onChange={(e) => onChangeFormData("description", e.target.value)}
            placeholder="Nhập mô tả..."
            rows={3}
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

export default AddVoucherModal;
