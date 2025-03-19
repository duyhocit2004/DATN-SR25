import { useEffect, useState } from "react";
import { IProduct } from "@/types/interface";
import ProductItem from "@/client/components/ProductItem";
import { Spin } from "antd";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast";

interface IRelatedProductsProps {
  product: IProduct | null;
}
const RelatedProducts = ({ product }: IRelatedProductsProps) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      getRelatedProduct();
    }
  }, [product]);

  const getRelatedProduct = async () => {
    try {
      setLoading(true);
      const payload = {
        categoryId: product?.categoriesId,
        pageNum: 1,
        pageSize: 5,
      };
      const response = await productApi.getRelatedProduct(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        setProducts(response.data);
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
    <div className="related-product-container">
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
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Sản phẩm liên quan</h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
        >
          {products?.map((product) => {
            return <ProductItem product={product} />;
          })}
        </div>
      </section>
    </div>
  );
};
export default RelatedProducts;
