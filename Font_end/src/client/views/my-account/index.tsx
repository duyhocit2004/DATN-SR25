import React, { useEffect, useState } from "react";
import { Form, Input, Button, Spin, UploadFile, Select } from "antd";
import { useAuth } from "@/context/AuthContext";
import { HttpCodeString } from "@/utils/constants";
import { urlToFile } from "@/utils/functions";
import { showToast } from "@/components/toast";
import { PersonTypeData } from "@/utils/constantData";
import { cloneDeep } from "lodash";
import adminApi from "@/api/adminApi";

interface IFormData {
  id: number | null;
  name: string;
  image: UploadFile | null;
  password: string;
  status: string;
  phoneNumber: string;
  email: string;
  gender: string | null;
  role: string | null;
}

const MyAccount: React.FC = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<IFormData>({
    id: null,
    name: "",
    image: null,
    password: "",
    phoneNumber: "",
    status: "",
    email: "",
    gender: null,
    role: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, [user]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getUserByEmail({ email: user?.email });
      if (response?.status === HttpCodeString.SUCCESS) {
        const account = response.data;
        let thumbnailUploadFile: UploadFile | null = null;
        if (account.image) {
          const thumbnailFile = await urlToFile(account.image, "thumbnail.jpg");
          thumbnailUploadFile = {
            uid: "-1",
            name: thumbnailFile.name,
            status: "done",
            url: account.image, // Giữ nguyên URL
            originFileObj: thumbnailFile, // Gán file để khi submit có file gửi lên
          };
        }
        const data: IFormData = {
          id: account.id,
          name: account.name,
          image: thumbnailUploadFile,
          password: account.password,
          status: account.status,
          phoneNumber: account.phoneNumber,
          email: account.email,
          gender: account.gender,
          role: account.role,
        };
        setFormData(data);
        form.setFieldsValue(data);
      } else {
        showToast({
          content: "Lấy chi tiết tài khoản thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (values: Partial<IFormData>) => {
    setLoading(true);
    try {
      const updatedData: Partial<IFormData> = {
        id: formData.id,
        name: values.name,
        password: values.password,
        status: values.status,
        phoneNumber: values.phoneNumber,
        email: values.email,
        gender: values.gender,
        role: values.role,
      };
  
      console.log("Dữ liệu gửi lên API:", updatedData); // Log request để kiểm tra
  
      const response = await adminApi.updateUser(updatedData);
  
      console.log("Phản hồi từ API:", response); // Log response để xem API có lỗi không
  
      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Cập nhật thông tin thành công!",
          type: "success",
        });
  
        setFormData(prev => ({ ...prev, ...updatedData }));
      } else {
        showToast({
          content: "Cập nhật thất bại! Vui lòng thử lại.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error); // Log lỗi nếu có
      showToast({
        content: "Có lỗi xảy ra khi cập nhật!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  

  if (loading)
    return <Spin size="large" className="flex justify-center mt-10" />;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Tài khoản của tôi</h1>
      <Form
        layout="vertical"
        onFinish={onUpdate}
        initialValues={cloneDeep(formData)}
        className="space-y-4"
        form={form}
      >
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
        >
          <Input placeholder="Nhập họ và tên" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Vui lòng nhập email hợp lệ",
            },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại" },
            {
              pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
        >
          <Select
            placeholder="Chọn giới tính"
            options={PersonTypeData}
          ></Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Cập nhật thông tin
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyAccount;