import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedVoucher } from "@/store/reducers/adminVoucherSlice";
import { IVoucher } from "@/types/interface";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";
interface IVoucherForm {
  id: number | null;
  code: string;
  quantity: number | null;
  voucherPrice: number | null;
  used: number | null;
  description: string;
}

interface IProps {
  refreshData: () => void;
}
const UpdateVoucherModal: React.FC<IProps> = ({refreshData}) => {
  const dispatch = useAppDispatch();
  const { selectedVoucher } = useAppSelector((state) => state.adminVoucher);
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<IVoucherForm>({
    id: null,
    code: "",
    quantity: null,
    used: null,
    voucherPrice: null,
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedVoucher) {
      setFormValue(selectedVoucher);
    } else {
      resetForm();
    }
  }, [selectedVoucher]);

  const resetForm = () => {
    setFormData({
      id: null,
      code: "",
      quantity: null,
      used: null,
      voucherPrice: null,
      description: "",
    }); // Reset state
    form.resetFields(); // Reset form
  };

  const setFormValue = (currentVoucher: IVoucher) => {
    setFormData({
      id: currentVoucher.id,
      code: currentVoucher.code,
      quantity: currentVoucher.quantity,
      used: currentVoucher.used,
      voucherPrice: currentVoucher.voucherPrice,
      description: currentVoucher.description || "",
    });
    form.setFieldsValue({
      code: currentVoucher.code,
      quantity: currentVoucher.quantity,
      used: currentVoucher.used,
      voucherPrice: currentVoucher.voucherPrice,
      description: currentVoucher.description || "",
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
      const response = await adminApi.updateVoucher(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Cập nhật voucher thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Cập nhật voucher thất bại",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const onClose = () => {
    dispatch(setSelectedVoucher(null));
  };

  return (
    <Modal
      title="Cập nhật voucher"
      open={true}
      maskClosable={false}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical">
        {/* Chọn màu */}
        <Form.Item
          label="Mã voucher"
          name="code"
          rules={[{ required: true, message: "Vui lòng nhập mã voucher!" }]}
        >
          <Input
            value={formData.code}
            onChange={(e) => onChangeFormData("code", e.target.value)}
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
        <Form.Item
          name="used"
          label="Số lượng đã dùng"
        >
          <InputNumber
            className="!w-full"
            controls={false}
            placeholder="Nhập số lượng"
            min={0}
            disabled={true}
            onChange={(value) => {
              onChangeFormData("used", value);
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

export default UpdateVoucherModal;
