import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, UploadFile } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
import { showToast } from "@/components/toast"; // Import showToast
import { cloneDeep } from "lodash";
import { objectToFormData } from "@/utils/functions";
import { HttpCodeString } from "@/utils/constants";
import homeApi from "@/api/homeApi";
import { IListCategory } from "@/types/interface";
import adminApi from "@/api/adminApi";

const { Option } = Select;

interface IFormData {
  id: number | null;
  image: UploadFile | null;
  name: string;
  gender: string;
  parentId: number | null;
  description: string;
}

const AddCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<IListCategory[]>([]);
  const [formData, setFormData] = useState<IFormData>({
    id: null,
    image: null,
    name: "",
    gender: "",
    parentId: null,
    description: "",
  });

  useEffect(() => {
    getCategories();
    if (categoryId) {
      getCategoryDetail(Number(categoryId));
    }
  }, [categoryId]);
  
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

  const getCategoryDetail = async (categoryId: number) => {
    try {
      const response = await homeApi.getCategoryDetail(categoryId);
      if (response?.status === HttpCodeString.SUCCESS) {
        const category = response.data;
        setFormData({
          name: category.name,
          parentId: category.parent_id,
          description: category.description,
        });
        form.setFieldsValue({
          name: category.name,
          parentId: category.parent_id,
          description: category.description,
        });
      } else {
        showToast({
          content: "Lấy chi tiết danh mục thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch {}
  };

  // Xử lý submit form
  const onFinish = async (values: any) => {
    console.log("formData:", formData);
    console.log("values:", values);

    const payload = {
      ...formData,
      categoryId: formData?.parentId ? formData.parentId : null,
    };

    const payloadFormData = objectToFormData(payload);

    try {
      const response = await adminApi.updateCategory(payloadFormData);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Cập nhật danh mục thành công!",
          duration: 5,
          type: "success",
        });
        navigate("/admin/categories");
      } else {
        showToast({
          content: "Cập nhật danh mục thất bại!",
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

  return (
    <div className="update-category-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Cập nhật danh mục</h2>
        <div>
          <Button
            onClick={() => navigate("/admin/categories")}
            className="mr-3"
          >
            Hủy
          </Button>
          <Button type="primary" onClick={() => form.submit()}>
            Cập nhật
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
            <div className="grid grid-cols-2 gap-2">
              <Form.Item
                name="name"
                label="Tên danh mục"
                rules={[
                  { required: true, message: "Vui lòng nhập tên danh mục!" },
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
        </Form>
      </div>
    </div>
  );
};

export default AddCategory;
