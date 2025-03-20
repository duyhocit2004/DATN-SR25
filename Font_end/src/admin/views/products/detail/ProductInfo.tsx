import React from "react";
import { UploadFile } from "antd";

interface Variant {
  id: number;
  color?: number;
  size?: number;
  quantity: number;
}

interface ProductInfoProps {
  name: string;
  categoryId: number[] | null;
  discount: number | null;
  price: number | null;
  description: string;
  content: string;
  variants: Variant[];
  thumbnail: UploadFile | null;
  album: UploadFile[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  categoryId,
  discount,
  price,
  description,
  content,
  variants,
  thumbnail,
  album,
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Category ID: {categoryId?.join(", ")}</p>
      <p>Price: ${price}</p>
      <p>Discount: {discount}%</p>
      <p>Description: {description}</p>
      <p>Content: {content}</p>
      
      <h3>Variants</h3>
      <ul>
        {variants.map((variant, index) => (
          <li key={index}>
            Color: {variant.color}, Size: {variant.size}, Quantity: {variant.quantity}
          </li>
        ))}
      </ul>
      
      <h3>Images</h3>
      {thumbnail && <img src={thumbnail.url} alt="Thumbnail" width={150} />}
      <div>
        {album.map((img, index) => (
          <img key={index} src={img.url} alt={`Product ${index}`} width={100} />
        ))}
      </div>
    </div>
  );
};

export default ProductInfo;