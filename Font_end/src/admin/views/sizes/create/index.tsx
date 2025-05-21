import adminApi from "@/api/adminApi";
import { showToast } from "@/components/toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setShowAddModal } from "@/store/reducers/adminSizeSlice";
import { HttpCodeString } from "@/utils/constants";
import { Modal, Input, Button, Form } from "antd";
import { useState } from "react";

interface ISizeForm {
  size: string;
  type: 'numeric' | 'text';
}

interface IProps {
  refreshData: () => void;
}

const AddSizeModal: React.FC<IProps> = ({refreshData}) => {
  const dispatch = useAppDispatch();
  const { filter } = useAppSelector((state) => state.adminSize);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<ISizeForm>({
    size: "",
    type: filter.type || 'numeric'
  });
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData({ size: "", type: filter.type || 'numeric' });
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
      .catch(() => console.log("Validation failed!"));
  };

  const onSave = async () => {
    const payload = { ...formData };
    setLoading(true);
    try {
      const response = await adminApi.addSize(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        refreshData();
        resetForm();
        onClose();
        showToast({
          content: "Thêm kích thước thành công",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: response?.message || "Thêm kích thước thất bại",
          duration: 5,
          type: "error",
        });
      }
    } catch (error: any) {
      showToast({
        content: error?.response?.data?.message || "Thêm kích thước thất bại",
        duration: 5,
        type: "error",
      });
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
      width={400}
      className="add-size-modal"
      destroyOnClose={true}
      centered
      closable={false}
      bodyStyle={{ padding: "20px 24px" }}
      style={{ top: 20 }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Kích thước"
          name="size"
          rules={[
            { required: true, message: "Vui lòng nhập kích thước!" },
            { 
              validator: async (_, value) => {
                if (formData.type === 'numeric' && isNaN(Number(value))) {
                  throw new Error('Kích thước số phải là một số!');
                }
                if (formData.type === 'text' && !isNaN(Number(value))) {
                  throw new Error('Kích thước chữ không được là số!');
                }
              }
            }
          ]}
        >
          <Input
            value={formData.size}
            onChange={(e) => onChangeFormData("size", e.target.value)}
            placeholder={`Nhập kích thước ${formData.type === 'numeric' ? 'số' : 'chữ'}`}
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

export default AddSizeModal;
