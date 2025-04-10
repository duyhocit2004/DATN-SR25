import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { cloneDeep } from "lodash";
import {
  ActiveStatusData,
  PersonTypeData,
  RoleData,
} from "@/utils/constantData";
import { showToast } from "@/components/toast";
import { HttpCodeString } from "@/utils/constants";
import { objectToFormData } from "@/utils/functions";
import adminApi from "@/api/adminApi";

interface IFormData {
  id: number | null;
  name: string;
  password: string;
  status: string;
  phoneNumber: string;
  email: string;
  gender: string | null;
  role: string | null;
}

const UpdateAccountForm: React.FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    id: null,
    name: "",
    password: "",
    phoneNumber: "",
    status: "",
    email: "",
    gender: null,
    role: null,
  });

  useEffect(() => {
    if (email) {
      getAccountDetail();
    }
  }, [email]);

  const getAccountDetail = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getUserByEmail({ email: email });
      if (response?.status === HttpCodeString.SUCCESS) {
        const account = response.data;
        const data: IFormData = {
          id: account.id,
          name: account.name,
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

  const onFinish = async (values: any) => {
    setLoading(true);

  const payload = {
    ...formData,  
    ...values,    
  };
    const payloadFormData = objectToFormData(payload);

    try {
      const response = await adminApi.updateUser(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Cập nhật tài khoản thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/admin/accounts");
      } else {
        showToast({
          content: "Cập nhật tài khoản thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-category-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Cập nhật tài khoản</h2>
        <div>
          <Button onClick={() => navigate("/admin/accounts")} className="mr-3">
            Hủy
          </Button>
          <Button
            type="primary"
            loading={loading}
            onClick={() => form.submit()}
          >
            Cập nhật
          </Button>
        </div>
      </div>
      <div className="body-area pt-6 relative">
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <Spin />
          </div>
        )}
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={cloneDeep(formData)}
          onFinish={onFinish}
        >
          <div className="form-body">
            <div className="flex gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <Form.Item
                  label="Họ và tên"
                  name="name"
                >
                  <Input placeholder="Nhập họ và tên" disabled />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                >
                  <Input placeholder="Nhập email" disabled />
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
                  <Input placeholder="Nhập số điện thoại" disabled/>
                </Form.Item>

                <Form.Item
                  label="Giới tính"
                  name="gender"
                >
                  <Select
                    placeholder="Chọn giới tính"
                    options={PersonTypeData}
                    disabled
                  ></Select>
                </Form.Item>

                <Form.Item
                  label="Vai trò"
                  name="role"
                >
                  <Select
                    placeholder="Chọn vai trò"
                    options={RoleData}
                    disabled
                  ></Select>
                </Form.Item>
                <Form.Item
                  label="Trạng thái"
                  name="status"
                  rules={[
                    { required: true, message: "Vui lòng chọn trạng thái" },
                  ]}
                >
                  <Select
                    placeholder="Chọn trạng thái"
                    options={ActiveStatusData}
                  ></Select>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UpdateAccountForm;
