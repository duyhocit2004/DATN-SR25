import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { cloneDeep } from "lodash";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { HttpCodeString } from "@/utils/constants";
import { useAuth } from "@/context/AuthContext";
import { showToast } from "@/components/toast"; // Import showToast
import adminApi from "@/api/adminApi";

interface IFormData {
  email: string;
  password: string;
}
const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  /**
   * Thay đổi dữ liệu tưng element trong form
   * @param {*} key
   * @param {*} value
   */
  const onChangeData = (key: string, value: any) => {
    const data = cloneDeep(formData);
    data[key as keyof IFormData] = value;
    setFormData(data);
    form.setFieldsValue(data);
  };

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      // Gửi request API đăng nhập tại đây
      const response = await adminApi.loginAdmin(values);

      if (response.status === HttpCodeString.SUCCESS) {
        login(response.data.accessToken);
        showToast({
          content: "Đăng nhập thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/admin");
      } else {
        showToast({
          content: "Tài khoản hoặc mật khẩu không đúng!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="admin-login-container">
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
          <Spin size="large" />
        </div>
      )}
      <div className="form-login">
        <div className="title font-bold text-3xl text-center mb-4">
          Đăng nhập
        </div>
        <Form
          name={"form"}
          form={form}
          initialValues={formData}
          labelCol={{ span: 24 }}
          onFinish={handleLogin}
        >
          <Form.Item
            label={"Tài khoản"}
            name={"email"}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (!value) {
                    callback("Tài khoản không được để trống");
                  } else {
                    const valueTrim = value.trim();
                    if (valueTrim?.length === 0) {
                      callback("Tài khoản không được để trống");
                    } else if (value?.length < 6) {
                      callback("Tài khoản tối thiểu 6 kí tự");
                    }
                    callback();
                  }
                },
              },
            ]}
          >
            <Input
              value={formData.email}
              placeholder={"Tài khoản"}
              maxLength={150}
              //   suffix={formData.name?.length + "/150"}
              onChange={(event) => {
                onChangeData("email", event.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label={"Mật khẩu"}
            name={"password"}
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (!value) {
                    callback("Mật khẩu không được để trống");
                  } else {
                    const valueTrim = value.trim();
                    if (valueTrim?.length === 0) {
                      callback("Mật khẩu không được để trống");
                    } else if (value?.length < 6) {
                      callback("Mật khẩu tối thiểu 6 kí tự");
                    }
                    callback();
                  }
                },
              },
            ]}
          >
            <Input.Password
              value={formData.password}
              placeholder={"Mật khẩu"}
              maxLength={150}
              //   suffix={formData.name?.length + "/150"}
              onChange={(event) => {
                onChangeData("password", event.target.value);
              }}
            />
          </Form.Item>
          <div className="actions flex justify-center items-center mt-10">
            <Button
              className="!bg-blue-500 !text-white"
              htmlType="submit"
              block
            >
              Đăng nhập
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default AdminLogin;
