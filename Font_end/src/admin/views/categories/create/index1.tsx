import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Select, Upload, UploadFile } from "antd";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { cloneDeep } from "lodash";
import { objectToFormData } from "@/utils/functions";
import { HttpCodeString } from "@/utils/constants";
import homeApi from "@/api/homeApi";
import { IListCategory } from "@/types/interface";
import { UploadOutlined } from "@ant-design/icons";
import { RcFile } from "antd/es/upload";
import { showToast } from "@/components/toast"; // Import showToast
import adminApi from "@/api/adminApi";
import { PersonTypeData } from "@/utils/constantData";

const { Option } = Select;

interface IFormData {
  image: UploadFile | null;
  name: string;
  gender: string;
  parentId: number | null;
  description: string;
}

const AddCategory: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [thumbnailError, setThumbnailError] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    image: null,
    name: "",
    gender: "",
    parentId: null,
    description: "",
  });

  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    try {
      const response = await homeApi.getParentCategories();
      if (response?.status === HttpCodeString.SUCCESS) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };

  // Xử lý submit form
  const onFinish = async (values: any) => {
    console.log("formData:", formData);
    console.log("values:", values);

    if (!formData.image) {
      setThumbnailError(true);
      showToast({
        content: "Vui lòng tải lên ảnh danh mục sản phẩm!",
        duration: 5,
        type: "error",
      });
      return;
    }

    const payload = {
      ...formData,
      image: formData.image?.originFileObj,
    };

    const payloadFormData = objectToFormData(payload);

    try {
      const response = await adminApi.addCategory(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Thêm danh mục thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/admin/categories");
      } else {
        showToast({
          content: "Thêm danh mục thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch {}
  };

  const onChangeCategoryInfo = (key: string, value: any) => {
    setFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    form.setFieldValue(key, value);
  };

  // Xử lý chọn ảnh đại diện
  const handleThumbnailChange = ({ fileList }: { fileList: UploadFile[] }) => {
    // if (file?.status === "removed") {
    //   setThumbnail(null);
    //   return;
    // }
    // setThumbnail({
    //   ...file,
    //   originFileObj: file as RcFile
    // });
    if (fileList.length === 0) {
      setFormData((prev) => {
        return {
          ...prev,
          image: null,
        };
      });
      form.setFieldValue("image", null);
      return;
    }
    const latestFile = fileList[fileList.length - 1]; // Lấy file mới nhất
    const imageData = {
      ...latestFile,
      url: latestFile.originFileObj
        ? URL.createObjectURL(latestFile.originFileObj as RcFile)
        : latestFile.url, // Giữ URL cũ nếu có
    };
    setFormData((prev) => {
      return {
        ...prev,
        image: imageData,
      };
    });
    form.setFieldValue("image", imageData);
    setThumbnailError(false);
  };

  return (
    <div className="create-category-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Thêm mới danh mục</h2>
        <div>
          <Button
            onClick={() => navigate("/admin/categories")}
            className="mr-3"
          >
            Hủy
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Thêm mới
          </Button>
        </div>
      </div>
      <div className="body-area pt-6">
        {/* Form */}
        <Form
          form={form}
          layout="vertical"
          initialValues={cloneDeep(formData)}
          onFinish={onFinish}
        >
          <div className="form-body">
            <div className="flex gap-4">
              <div>
                <Form.Item
                  label="Ảnh đại diện"
                  name="image"
                  // validateStatus={thumbnailError ? "error" : ""}
                  // help={thumbnailError ? "Vui lòng tải lên ảnh đại diện!" : ""}
                  rules={[
                    { required: true, message: "Vui lòng chọn ảnh đại diện!" },
                  ]}
                >
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    fileList={formData.image ? [formData.image] : []}
                    onChange={handleThumbnailChange}
                    beforeUpload={() => false}
                    showUploadList={{ showPreviewIcon: false }} // Ẩn icon preview
                  >
                    {!formData.image && (
                      <div>
                        <UploadOutlined /> <div>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <Form.Item
                    name="name"
                    label="Tên danh mục"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên danh mục!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Nhập tên danh mục"
                      onChange={(e) => {
                        onChangeCategoryInfo("name", e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="parentId" label="Danh mục cha">
                    <Select
                      placeholder="Chọn danh mục cha"
                      onChange={(value) => {
                        onChangeCategoryInfo("parentId", value);
                      }}
                    >
                      {categories?.map((v) => {
                        return <Option value={v.id}>{v.name}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item name="gender" label="Giới tính">
                    <Radio.Group
                      options={PersonTypeData}
                      onChange={(e) => {
                        onChangeCategoryInfo("gender", e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
                <Form.Item name="description" label="Mô tả">
                  <Input.TextArea
                    rows={3}
                    placeholder="Nhập mô tả danh mục"
                    onChange={(e) => {
                      onChangeCategoryInfo("description", e.target.value);
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
