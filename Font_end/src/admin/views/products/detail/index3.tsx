import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductInfo from "./ProductInfo";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { urlToFile } from "@/utils/functions";
import { UploadFile } from "antd";

const DetailProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    if (!productId) return;
    try {
      const response = await productApi.getProduct(Number(productId));
      if (response?.status === HttpCodeString.SUCCESS) {
        const product = response.data;
        const thumbnailFile = await urlToFile(product.image, "thumbnail.jpg");
        const thumbnailUploadFile: UploadFile = {
          uid: "-1",
          name: thumbnailFile.name,
          status: "done",
          url: product.image,
          originFileObj: thumbnailFile,
        };

        const albumUploadFiles: UploadFile[] = await Promise.all(
          product.albumImage?.map(async (imgUrl: string, index: number) => {
            const file = await urlToFile(imgUrl, `album-${index}.jpg`);
            return {
              uid: `${index}`,
              name: file.name,
              status: "done",
              url: imgUrl,
              originFileObj: file,
            };
          })
        );

        setProduct({
          ...product,
          thumbnail: thumbnailUploadFile,
          album: albumUploadFiles,
        });
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <ProductInfo
      name={product.name}
      categoryId={product.categoryId}
      discount={product.discount}
      price={product.price}
      description={product.description}
      content={product.content}
      variants={product.variants}
      thumbnail={product.thumbnail}
      album={product.album}
      status={product.status}
      id={product.id}     
      createdAt={product.createdAt}
      updatedAt={product.updatedAt}
      createdBy={product.createdBy}
      updatedBy={product.updatedBy} 
      productId={productId}
      setProduct={setProduct}
      setLoading={setLoading}
      setError={setError}
      fetchProductDetails={fetchProductDetails}
      setFormValue={setProduct} // Assuming you want to set the form value here 
      setFormData={setProduct} // Assuming you want to set the form data here
    />
  );
};

export default DetailProduct;