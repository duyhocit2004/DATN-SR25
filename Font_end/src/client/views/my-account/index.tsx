import React, { useEffect, useState } from "react";
import { Form, Input, Button, Spin, UploadFile, Select, Upload, message } from "antd";
import { useAuth } from "@/context/AuthContext";
import { HttpCodeString } from "@/utils/constants";
import { urlToFile } from "@/utils/functions";
import { showToast } from "@/components/toast";
import { PersonTypeData } from "@/utils/constantData";
import { cloneDeep } from "lodash";
import adminApi from "@/api/adminApi";
import { LoadingOutlined, PlusOutlined, UserOutlined, ShoppingOutlined, NotificationOutlined, WalletOutlined, LockOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import axiosClient from "@/configs/axiosClient";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "@/components/Notification";
import { NotificationContainer } from "@/components/Notification";
import LocationManager from '@/components/LocationManager';
import ListOrder from "@/client/views/order-history/ListOrder";
import OrderDetail from "@/client/views/order-history/detail";
import './styles.css';

interface IFormData {
  id: number;
  name: string;
  image: UploadFile | null;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  status: string;
  phoneNumber: string;
  gender: string | null;
  role: string | null;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Ảnh phải nhỏ hơn 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const MyAccount: React.FC = () => {
  const { user, refreshUserInfo } = useAuth();
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const [formData, setFormData] = useState<IFormData>({
    id: 0,
    name: "",
    image: null,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    status: "",
    phoneNumber: "",
    gender: null,
    role: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false);
  const navigate = useNavigate();
  const [tempImageFile, setTempImageFile] = useState<RcFile | null>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'password' | 'address' | 'orders'>('profile');

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
        
        // Set image URL if exists using userImage field
        if (account.userImage) {
          setImageUrl(account.userImage);
          const thumbnailFile = await urlToFile(account.userImage, "thumbnail.jpg");
          thumbnailUploadFile = {
            uid: "-1",
            name: thumbnailFile.name,
            status: "done",
            url: account.userImage,
            originFileObj: thumbnailFile,
          };
        }
        
        const data: IFormData = {
          id: Number(account.id),
          name: account.name,
          image: thumbnailUploadFile,
          oldPassword: "",
          status: account.status,
          phoneNumber: account.phoneNumber,
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

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
      return;
    }

    if (info.file.status === 'done') {
      const file = info.file.originFileObj as RcFile;
      setTempImageFile(file);
      getBase64(file, (url) => {
        setTempImageUrl(url);
        setUploading(false);
      });
    }
  };

  const onUpdate = async (values: Partial<IFormData>) => {
    setLoading(true);
    try {
      // Get current user data first
      const userResponse = await adminApi.getUserByEmail({ email: user?.email });
      if (userResponse?.status !== HttpCodeString.SUCCESS) {
        showToast({
          content: "Không thể lấy thông tin người dùng!",
          type: "error",
        });
        return;
      }

      const currentUser = userResponse.data;
      const formData = new FormData();
      
      // Always include current user ID
      formData.append('id', String(currentUser.id));
      
      // Add updated values or fallback to current values
      formData.append('name', values.name || currentUser.name);
      formData.append('phoneNumber', values.phoneNumber || currentUser.phoneNumber);
      formData.append('gender', values.gender || currentUser.gender || '');
      
      // If there's a temp image file, append it
      if (tempImageFile) {
        formData.append('image', tempImageFile);
      }

      const response = await adminApi.updateUser(formData);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Cập nhật thông tin thành công!",
          type: "success",
        });
        refreshUserInfo();
      } else {
        showToast({
          content: response?.message || "Cập nhật thông tin thất bại!",
          type: "error",
        });
      }
    } catch (error) {
      showToast({
        content: "Lỗi hệ thống. Vui lòng thử lại!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const onUpdatePassword = async (values: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
    setLoading(true);
    try {
      // Get current user data first
      const userResponse = await adminApi.getUserByEmail({ email: user?.email });
      if (userResponse?.status !== HttpCodeString.SUCCESS) {
        showToast({
          content: "Không thể lấy thông tin người dùng!",
          type: "error",
        });
        return;
      }

      const currentUser = userResponse.data;
      const formData = new FormData();
      
      // Always include current user ID
      formData.append('id', String(currentUser.id));
      
      // Add password fields
      formData.append('oldPassword', values.oldPassword);
      formData.append('newPassword', values.newPassword);
      formData.append('confirmPassword', values.confirmPassword);

      // Gửi request và kiểm tra response
      const response = await adminApi.updateUser(formData);
      
      // Kiểm tra response status
      if (response?.status === HttpCodeString.SUCCESS || response?.status === 200) {
        showToast({
          content: "Cập nhật mật khẩu thành công!",
          type: "success",
        });
        passwordForm.resetFields();
        setShowPasswordFields(false);
      } else {
        // Xử lý các trường hợp lỗi cụ thể
        let errorMessage = "Đổi mật khẩu thất bại!";
        if (response?.data?.messageKey === "old.password.incorrect") {
          errorMessage = "Mật khẩu cũ không chính xác!";
        } else if (response?.data?.messageKey === "new.password.too.short") {
          errorMessage = "Mật khẩu mới phải có ít nhất 8 ký tự!";
        } else if (response?.data?.messageKey === "new.password.no.uppercase") {
          errorMessage = "Mật khẩu mới phải chứa ít nhất 1 chữ hoa!";
        } else if (response?.data?.messageKey === "new.password.no.lowercase") {
          errorMessage = "Mật khẩu mới phải chứa ít nhất 1 chữ thường!";
        } else if (response?.data?.messageKey === "new.password.no.number") {
          errorMessage = "Mật khẩu mới phải chứa ít nhất 1 số!";
        } else if (response?.data?.messageKey === "password.confirmation.mismatch") {
          errorMessage = "Xác nhận mật khẩu không khớp!";
        } else if (response?.data?.messageKey === "new.password.same.as.old") {
          errorMessage = "Mật khẩu mới không được trùng với mật khẩu cũ!";
        } else if (response?.data?.message) {
          errorMessage = response.data.message;
        }

        showToast({
          content: errorMessage,
          type: "error",
        });
      }
    } catch (error: any) {
      showToast({
        content: error?.response?.data?.message || error?.message || "Lỗi hệ thống. Vui lòng thử lại!",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="w-[220px] flex-shrink-0">
            <div className="flex items-center space-x-3 p-4 border-b">
              <Upload
                name="image"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
                customRequest={({ file, onSuccess }) => {
                  setTimeout(() => {
                    onSuccess?.("ok");
                  }, 0);
                }}
              >
                <div className="relative group cursor-pointer">
                  {tempImageUrl || imageUrl ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img 
                        src={tempImageUrl || imageUrl} 
                        alt="avatar" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-opacity">
                        <div className="text-white text-xs">Thay đổi</div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <UserOutlined className="text-xl text-gray-500" />
                    </div>
                  )}
                </div>
              </Upload>
              <div>
                <div className="font-medium">{formData.name}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div 
                className={`flex items-center space-x-2 px-4 py-3 cursor-pointer ${
                  activeSection === 'profile' 
                    ? 'text-orange-500 bg-gray-100' 
                    : 'hover:text-orange-500'
                }`}
                onClick={() => setActiveSection('profile')}
              >
                <UserOutlined />
                <span>Tài khoản của tôi</span>
              </div>
              <div 
                className={`flex items-center space-x-2 px-4 py-3 cursor-pointer ${
                  activeSection === 'password' 
                    ? 'text-orange-500 bg-gray-100' 
                    : 'hover:text-orange-500'
                }`}
                onClick={() => setActiveSection('password')}
              >
                <LockOutlined />
                <span>Đổi mật khẩu</span>
              </div>
              <div 
                className={`flex items-center space-x-2 px-4 py-3 cursor-pointer ${
                  activeSection === 'address' 
                    ? 'text-orange-500 bg-gray-100' 
                    : 'hover:text-orange-500'
                }`}
                onClick={() => setActiveSection('address')}
              >
                <EnvironmentOutlined />
                <span>Địa chỉ nhận hàng</span>
              </div>
              <div 
                className={`flex items-center space-x-2 px-4 py-3 cursor-pointer ${
                  activeSection === 'orders' 
                    ? 'text-orange-500 bg-gray-100' 
                    : 'hover:text-orange-500'
                }`}
                onClick={() => setActiveSection('orders')}
              >
                <ShoppingOutlined />
                <span>Đơn mua</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'profile' ? (
              <div className="bg-white rounded shadow-sm">
                <div className="px-8 py-4 border-b">
                  <h1 className="text-lg font-medium">Hồ Sơ Của Tôi</h1>
                  <div className="text-gray-500 text-sm">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                </div>

                <div className="p-8">
                  <Form
                    layout="horizontal"
                    onFinish={onUpdate}
                    initialValues={cloneDeep(formData)}
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                  >
                    <Form.Item
                      label="Tên đăng nhập"
                    >
                      <div className="text-gray-800">{user?.email}</div>
                    </Form.Item>

                    <Form.Item
                      label="Họ và tên"
                      name="name"
                      rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                    >
                      <Input placeholder="Nhập họ và tên" className="h-10" />
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
                      <Input placeholder="Nhập số điện thoại" className="h-10" />
                    </Form.Item>

                    <Form.Item
                      label="Giới tính"
                      name="gender"
                      rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                    >
                      <Select
                        placeholder="Chọn giới tính"
                        options={PersonTypeData}
                        className="h-10"
                      />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="bg-orange-500 hover:bg-orange-600 h-10 px-8"
                      >
                        Lưu thay đổi
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : activeSection === 'password' ? (
              <div className="bg-white rounded shadow-sm">
                <div className="px-8 py-4 border-b">
                  <h1 className="text-lg font-medium">Đổi Mật Khẩu</h1>
                  <div className="text-gray-500 text-sm">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
                </div>

                <div className="p-8">
                  <Form
                    form={passwordForm}
                    layout="horizontal"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={onUpdatePassword}
                    onValuesChange={(changedValues) => {
                      if ("oldPassword" in changedValues) {
                        setShowPasswordFields(!!changedValues.oldPassword);
                      }
                    }}
                  >
                    <Form.Item
                      label="Mật khẩu hiện tại"
                      name="oldPassword"
                      rules={[
                        { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
                      ]}
                    >
                      <Input.Password placeholder="Nhập mật khẩu hiện tại" className="h-10" autoComplete="current-password" />
                    </Form.Item>

                    {showPasswordFields && (
                      <>
                        <Form.Item
                          label="Mật khẩu mới"
                          name="newPassword"
                          rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu mới" },
                            { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự" },
                            {
                              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                              message: "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và có thể chứa ký tự đặc biệt"
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('oldPassword') !== value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu mới không được trùng với mật khẩu cũ'));
                              },
                            }),
                          ]}
                        >
                          <Input.Password placeholder="Nhập mật khẩu mới" className="h-10" autoComplete="new-password" />
                        </Form.Item>

                        <Form.Item
                          label="Xác nhận mật khẩu"
                          name="confirmPassword"
                          dependencies={['newPassword']}
                          rules={[
                            { required: true, message: "Vui lòng xác nhận mật khẩu" },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                              },
                            }),
                          ]}
                        >
                          <Input.Password placeholder="Nhập lại mật khẩu mới" className="h-10" autoComplete="new-password" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="bg-orange-500 hover:bg-orange-600 h-10 px-8"
                          >
                            Đổi mật khẩu
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form>
                </div>
              </div>
            ) : activeSection === 'address' ? (
              <div className="bg-white rounded shadow-sm">
                <div className="px-8 py-4 border-b">
                  <h1 className="text-lg font-medium">Quản lý địa chỉ nhận hàng</h1>
                  <div className="text-gray-500 text-sm">Thêm, sửa, xóa các địa chỉ nhận hàng của bạn</div>
                </div>
                <div className="p-8">
                  <LocationManager />
                </div>
              </div>
            ) : activeSection === 'orders' ? (
              <div className="bg-white rounded shadow-sm p-8">
                <ListOrder />
                <OrderDetail />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
