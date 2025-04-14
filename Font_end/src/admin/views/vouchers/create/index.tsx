import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminVoucherSlice";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form, InputNumber, DatePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IVoucherForm {
  voucherCode: string;
  quantity: number | null;
  voucherPrice: number | null;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
  minOrderValue: string| null;
}

interface IProps {
  refreshData: () => void;
}
const AddVoucherModal: React.FC<IProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm(); // Khởi tạo form
  const [formData, setFormData] = useState<IVoucherForm>({
    voucherCode: "",
    quantity: null,
    startDate: null,
    endDate: null,
    voucherPrice: null,
    description: "",
    minOrderValue : null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      voucherCode: "",
      quantity: null,
      startDate: null,
      endDate: null,
      voucherPrice: null,
      description: "",
      minOrderValue : null,
    }); // Reset state
    form.resetFields(); // Reset form
  };

  const onChangeFormData = (key: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    form.setFieldsValue({ [key]: value });
  };



  const onSave = async () => {
    const payload = {
      voucherCode: formData.voucherCode,
      quantity: formData.quantity,
      voucherPrice: formData.voucherPrice,
      startDate: formData.startDate ? dayjs(formData.startDate).format("YYYY-MM-DD HH:mm:ss") : null,
      endDate: formData.endDate ? dayjs(formData.endDate).format("YYYY-MM-DD HH:mm:ss") : null,
      min_order_value: form.getFieldValue('minOrderValue'),
      description: formData.description,
    };

    if (!formData.startDate || !formData.endDate || moment(formData.startDate).isAfter(formData.endDate)) {
      showToast({
        content: "Ngày kết thúc phải lớn hơn ngày bắt đầu!",
        type: "error",
      });
      return;
    }

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
        navigate("/admin/vouchers");
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
          label="Giá trị đơn tối thiểu"
          name="minOrderValue"
          rules={[{ required: true, message: "Vui lòng nhập giá trị tối thiểu" }]}
        >
          <InputNumber
            min={0}
            className="!w-full"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
            addonAfter="VND"
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
          label="Ngày bắt đầu"
          name="startDate"
          rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={(current) => current && current < moment().startOf("day")}
            onChange={(date) => onChangeFormData("startDate", date)}
          />
        </Form.Item>

        <Form.Item
          label="Ngày kết thúc"
          name="endDate"
          rules={[
            { required: true, message: "Vui lòng chọn ngày kết thúc!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const startDate = getFieldValue("startDate");
                if (!value || !startDate) {
                  return Promise.resolve();
                }
                if (moment(value).isAfter(startDate)) {
                  return Promise.resolve();
                }
                if (moment(value).isSame(startDate, "day") && moment(value).isAfter(startDate)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Ngày kết thúc phải lớn hơn ngày bắt đầu!"));
              },
            }),
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            disabledDate={(current) => {
              const startDate = form.getFieldValue("startDate");
              return current && startDate && current < moment(startDate).startOf("day");
            }}
            onChange={(date) => onChangeFormData("endDate", date)}
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
          <Button type="primary" loading={loading} onClick={onSave}>
            Lưu
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddVoucherModal;
