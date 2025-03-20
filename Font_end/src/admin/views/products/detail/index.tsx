import React, { useEffect, useState } from "react";
import { Button, Image, Space, Typography, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { IColor, IProductDetail, ISize } from "@/types/interface";
import { showToast } from "@/components/toast";
import { getNameOfItemListByValue } from "@/utils/functions";
import "./index.scss";

const { Title, Text } = Typography;

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [product, setProduct] = useState<IProductDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [colors, setColors] = useState<IColor[]>([]);
  const [sizes, setSizes] = useState<ISize[]>([]);

  useEffect(() => {
    getColors();
    getSizes();
    fetchProductDetail();
  }, []);

  const getColors = async () => {
    try {
      const response = await productApi.getAllColors();
      if (response?.status === HttpCodeString.SUCCESS) {
        setColors(response.data as IColor[]);
      } else {
        setColors([]);
      }
    } catch {
      setColors([]);
    }
  };
  const getSizes = async () => {
    try {
      const response = await productApi.getAllSizes();
      if (response?.status === HttpCodeString.SUCCESS) {
        setSizes(response.data as ISize[]);
      } else {
        setSizes([]);
      }
    } catch {
      setSizes([]);
    }
  };
  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const response = await productApi.getProductVariant(Number(productId));
      if (response?.status === HttpCodeString.SUCCESS) {
        setProduct(response.data);
      } else {
        showToast({
          content: "Lỗi khi lấy chi tiết sản phẩm!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-detail-container bg-white">
      {/* Header */}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Chi tiết sản phẩm</h2>
        <div className="action flex justify-end items-center gap-2">
          <Button onClick={() => navigate("/admin/products")}>Quay lại</Button>
          <Button
            type="primary"
            onClick={() => navigate("/admin/products/update/" + productId)}
          >
            Sửa
          </Button>
        </div>
      </div>

      {/* Body */}
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
            <Spin size="large" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cột trái: Thông tin sản phẩm */}
          <div className="product-info">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Text strong>Tên sản phẩm:</Text>
                <p>{product?.name}</p>
              </div>
              <div>
                <Text strong>Danh mục:</Text>
                <p>{product?.categoriesName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Text strong>Giá gốc:</Text>
                <p>{product?.priceRegular?.toLocaleString()} VND</p>
              </div>
              <div>
                <Text strong>Giá khuyến mãi:</Text>
                <p>{product?.priceSale?.toLocaleString()} VND</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Text strong>Giảm giá:</Text>
                <p>
                  {product?.discount ? `${product?.discount}%` : "Không có"}
                </p>
              </div>
              <div>
                <Text strong>Số lượng:</Text>
                <p>{product?.quantity}</p>
              </div>
            </div>

            <div className="mt-4">
              <Text strong>Mô tả:</Text>
              <p>{product?.description}</p>
            </div>

            <div className="mt-4">
              <Text strong>Nội dung chi tiết:</Text>
              <div
                dangerouslySetInnerHTML={{ __html: product?.content || "" }}
              ></div>
            </div>

            {/* Biến thể sản phẩm */}
            <div className="mt-6">
              <Title level={4}>Biến thể sản phẩm</Title>
              <table className="border border-solid border-collapse w-full">
                <thead>
                  <tr className="border border-solid">
                    <th className="border border-solid p-2">Màu</th>
                    <th className="border border-solid p-2">Kích thước</th>
                    <th className="border border-solid p-2">Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.variants.map((variant) => {
                    return (
                      <tr key={variant.id} className="border border-solid">
                        <td className="border border-solid p-2 font-semibold">
                          <div className="flex gap-3">
                            <div className="code">
                              {getNameOfItemListByValue(
                                colors,
                                variant.colorId,
                                "id",
                                "code"
                              )}
                            </div>
                            <div
                              className={`color w-6 h-6 shrink-0 rounded-[50%]`}
                              style={{
                                backgroundColor: getNameOfItemListByValue(
                                  colors,
                                  variant.colorId,
                                  "id",
                                  "code"
                                ),
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className="border border-solid p-2 font-semibold text-center">
                          {getNameOfItemListByValue(
                            sizes,
                            variant.sizeId,
                            "id",
                            "size"
                          )}
                        </td>
                        <td className="border border-solid p-2 font-semibold text-center">
                          {variant.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cột phải: Hình ảnh */}
          <div className="images">
            <Title level={4}>Ảnh đại diện</Title>
            <Image width={150} src={product?.image} alt="Thumbnail" />

            <Title level={4} className="mt-4">
              Album ảnh
            </Title>
            <Space>
              {product?.listImage.map((img, index) => (
                <Image key={index} width={100} src={img} alt={`Ảnh ${index}`} />
              ))}
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
