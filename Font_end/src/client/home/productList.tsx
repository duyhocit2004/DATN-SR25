// src/client/home/ProductList.tsx
import React, { useEffect, useState } from 'react';
import { IProducts } from '../../interface/Products';
import { getProducts } from '../../sevice/productSevice';


const ProductList: React.FC = () => {
    const [products, setProducts] = useState<IProducts[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                console.log("Dữ liệu sản phẩm nhận được:", response); // Kiểm tra dữ liệu
                if (Array.isArray(response)) {
                    setProducts(response);
                } else {
                    console.error('Dữ liệu không phải là mảng trong `data`:', response);
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
      
        fetchProducts();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
        {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
                <div key={product.categories_id} className="border rounded-xl shadow-lg p-4">
                    <img src={product.image} alt={product.name_product} className="w-full h-48 object-cover rounded-md" />
                    <h2 className="text-xl font-bold mt-2">{product.name_product}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-red-500 font-semibold">{product.price_regular} VND</p>
                </div>
            ))
        ) : (
            <p>Không có sản phẩm nào để hiển thị.</p> // Hiển thị thông báo nếu không có sản phẩm
        )}
    </div>
    );
};

export default ProductList;




