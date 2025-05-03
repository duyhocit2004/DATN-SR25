import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Modal,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { ISize } from "@/types/interface";
import SizeTable from "./SizeTable";

const { Option } = Select;

const SizeManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [sizes, setSizes] = useState<ISize[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSize, setEditingSize] = useState<ISize | null>(null);
  const [sizeType, setSizeType] = useState<'numeric' | 'text'>('numeric');

  useEffect(() => {
    fetchSizes();
  }, [sizeType]);

  const fetchSizes = async () => {
    try {
      setLoading(true);
      const response = await productApi.getSizesByType(sizeType);
      if (response?.status === HttpCodeString.SUCCESS) {
        setSizes(response.data as ISize[]);
      }
    } catch (error) {
      message.error("Lỗi khi tải danh sách size");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSize(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (size: ISize) => {
    setEditingSize(size);
    form.setFieldsValue({
      size: size.size,
      type: size.type,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await productApi.deleteSize(id);
      if (response?.status === HttpCodeString.SUCCESS) {
        message.success("Xóa size thành công");
        fetchSizes();
      }
    } catch (error) {
      message.error("Lỗi khi xóa size");
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editingSize) {
        const response = await productApi.updateSize({
          id: editingSize.id,
          ...values,
        });
        if (response?.status === HttpCodeString.SUCCESS) {
          message.success("Cập nhật size thành công");
        }
      } else {
        const response = await productApi.addSize(values);
        if (response?.status === HttpCodeString.SUCCESS) {
          message.success("Thêm size thành công");
        }
      }
      setModalVisible(false);
      fetchSizes();
    } catch (error) {
      message.error("Lỗi khi lưu size");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Quản lý Size</h1>
        <div className="flex gap-4">
          <Select
            value={sizeType}
            onChange={setSizeType}
            style={{ width: 200 }}
          >
            <Option value="numeric">Size số</Option>
            <Option value="text">Size chữ</Option>
          </Select>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm size
          </Button>
        </div>
      </div>

      <SizeTable
        sizes={sizes}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        title={editingSize ? "Sửa size" : "Thêm size mới"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ type: sizeType }}
        >
          <Form.Item
            name="size"
            label="Size"
            rules={[{ required: true, message: "Vui lòng nhập size" }]}
          >
            <Input placeholder="Nhập size" />
          </Form.Item>

          <Form.Item
            name="type"
            label="Loại size"
            rules={[{ required: true, message: "Vui lòng chọn loại size" }]}
          >
            <Select>
              <Option value="numeric">Size số</Option>
              <Option value="text">Size chữ</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>Hủy</Button>
              <Button type="primary" htmlType="submit">
                {editingSize ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SizeManagement;
