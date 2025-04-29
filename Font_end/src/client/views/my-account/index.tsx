import React, { useEffect, useState } from "react";
import { Form, Input, Button, Spin, UploadFile, Select, Upload, message } from "antd";
import { useAuth } from "@/context/AuthContext";
import { HttpCodeString } from "@/utils/constants";
import { urlToFile } from "@/utils/functions";
import { showToast } from "@/components/toast";
import { PersonTypeData } from "@/utils/constantData";
import { cloneDeep } from "lodash";
import adminApi from "@/api/adminApi";
import { LoadingOutlined, PlusOutlined, UserOutlined, ShoppingOutlined, NotificationOutlined, WalletOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile } from 'antd/es/upload/interface';
import axiosClient from "@/configs/axiosClient";
import { useNavigate } from "react-router-dom";
import { NotificationModal } from "@/components/Notification";
import { NotificationContainer } from "@/components/Notification";
import './styles.css';

interface IFormData {
  id: number | null;
  name: string;
  image: UploadFile | null;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  status: string;
  phoneNumber: string;
  email: string;
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
  const [formData, setFormData] = useState<IFormData>({
    id: null,
    name: "",
    image: null,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    status: "",
    phoneNumber: "",
    email: "",
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
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications'>('profile');

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
          id: account.id,
          name: account.name,
          image: thumbnailUploadFile,
          oldPassword: account.password,
          status: account.status,
          phoneNumber: account.phoneNumber,
          email: account.email ? account.email.trim() : "",
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
      formData.append('id', currentUser.id.toString());
      
      // Add updated values or fallback to current values
      formData.append('name', values.name || currentUser.name);
      formData.append('email', values.email || currentUser.email);
      formData.append('phoneNumber', values.phoneNumber || currentUser.phoneNumber);
      formData.append('gender', values.gender || currentUser.gender || '');
      
      // Handle password change
      if (values.oldPassword) {
        formData.append('oldPassword', values.oldPassword);
      }
      if (values.newPassword) {
        formData.append('newPassword', values.newPassword);
      }

      // If there's a temp image file, append it
      if (tempImageFile) {
        formData.append('image', tempImageFile);
      }

      const response = await adminApi.updateUser(formData);
      
      // Kiểm tra nếu response có status là 200 nhưng có messageKey (lỗi)
      if (response.status === HttpCodeString.SUCCESS && !response.messageKey) {
        showToast({
          content: "Cập nhật thông tin thành công!",
          type: "success",
        });
        
        // Update the displayed image only after successful save
        if (tempImageUrl) {
          setImageUrl(tempImageUrl);
          setTempImageUrl(null);
        }
        if (tempImageFile) {
          setTempImageFile(null);
        }
        
        setFormData(prev => ({ ...prev, ...values }));
        await refreshUserInfo();
      } else {
        // Hiển thị thông báo lỗi cụ thể từ backend
        const errorMessage = response.message || "Cập nhật thất bại! Vui lòng thử lại.";
        showToast({
          content: errorMessage,
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Lỗi khi cập nhật:", error);
      // Hiển thị thông báo lỗi từ response nếu có
      const errorMessage = error.response?.data?.message || "Có lỗi xảy ra khi cập nhật!";
      showToast({
        content: errorMessage,
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
                className="flex items-center space-x-2 px-4 py-3 hover:text-orange-500 cursor-pointer"
                onClick={() => navigate('/order-history')}
              >
                <ShoppingOutlined />
                <span>Đơn mua</span>
              </div>
              {/* <div 
                className={`flex items-center space-x-2 px-4 py-3 cursor-pointer ${
                  activeSection === 'notifications' 
                    ? 'text-orange-500 bg-gray-100' 
                    : 'hover:text-orange-500'
                }`}
                onClick={() => setActiveSection('notifications')}
              >
                <NotificationOutlined />
                <span>Thông báo</span>
              </div> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeSection === 'profile' ? (
              <>
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
                      onValuesChange={(changedValues) => {
                        if ("oldPassword" in changedValues) {
                          setShowPasswordFields(!!changedValues.oldPassword);
                        }
                      }}
                    >
                      <Form.Item
                        label="Tên đăng nhập"
                      >
                        <div className="text-gray-800">{formData.email}</div>
                      </Form.Item>

                      <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                      >
                        <Input placeholder="Nhập họ và tên" className="h-10" />
                      </Form.Item>

                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          { required: true, message: "Vui lòng nhập email" },
                          { 
                            type: "email", 
                            message: "Vui lòng nhập email hợp lệ",
                            transform: (value) => value?.trim()
                          },
                        ]}
                      >
                        <Input placeholder="Nhập email" className="h-10" />
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

                {/* Password Section */}
                <div className="bg-white rounded shadow-sm mt-6">
                  <div className="px-8 py-4 border-b">
                    <h1 className="text-lg font-medium">Đổi Mật Khẩu</h1>
                    <div className="text-gray-500 text-sm">Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</div>
                  </div>

                  <div className="p-8">
                    <Form
                      layout="horizontal"
                      labelCol={{ span: 6 }}
                      wrapperCol={{ span: 14 }}
                      onFinish={onUpdate}
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
                        <Input.Password placeholder="Nhập mật khẩu hiện tại" className="h-10" />
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
                            <Input.Password placeholder="Nhập mật khẩu mới" className="h-10" />
                          </Form.Item>

                          <Form.Item
                            label="Xác nhận mật khẩu"
                            name="confirmPassword"
                            dependencies={["newPassword"]}
                            rules={[
                              { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue("newPassword") === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error("Xác nhận mật khẩu không khớp"));
                                },
                              }),
                            ]}
                          >
                            <Input.Password placeholder="Xác nhận mật khẩu mới" className="h-10" />
                          </Form.Item>
                        </>
                      )}

                      <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          className="bg-orange-500 hover:bg-orange-600 h-10 px-8"
                        >
                          Xác nhận
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded shadow-sm">
                <div className="px-8 py-4 border-b">
                  <h1 className="text-lg font-medium">Thông Báo Của Tôi</h1>
                  <div className="text-gray-500 text-sm">Quản lý thông báo về đơn hàng, cập nhật và các hoạt động khác</div>
                </div>
                <NotificationContainer />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
