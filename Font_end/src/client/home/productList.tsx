import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProducts } from '../../interface/Products';
import { ListProduct } from '../../service/products/productService';
import '../css/listproduct.css';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ListProduct();
                setProducts(response);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (id: number) => {
        console.log(id);
        navigate(`/product/${id}`);
    };

    return (
        <div className="product-list">
            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img
                            src={product.image}
                            alt={product.name_product}
                            className="product-image"
                            onClick={() => handleProductClick(Number(product.id))}
                            style={{ cursor: 'pointer' }}
                        />
                        <div>{product.id}</div>
                        <div className="product-info">
                            <h2 className="product-title">{product.name_product}</h2>
                            <p className="product-description">{product.description}</p>
                            <p className="product-price">{product.price_regular} VND</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>Không có sản phẩm nào để hiển thị.</p>
            )}
        </div>
    );
};

export default ProductList;
