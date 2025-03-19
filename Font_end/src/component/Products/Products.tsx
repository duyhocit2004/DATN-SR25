import React from "react";
import { useCart } from "../../contexts/CartContext";


interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [];

const Products: React.FC = () => {
  const { addProductToCart } = useCart();

  const handleAddToCart = async (productId: string) => {
    await addProductToCart(productId, 1);
    alert("Đã thêm sản phẩm vào giỏ hàng!");
  };

  return (
    <div>
      <h2>Sản phẩm</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - {product.price.toLocaleString()}
            <button onClick={() => handleAddToCart(product.id)}>Thêm vào giỏ</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;