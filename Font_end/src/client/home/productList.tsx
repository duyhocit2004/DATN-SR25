import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IProducts } from '../../interface/Products';
import { ListProduct } from '../../service/products/productService';
import '../css/listproduct.css';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ListProduct();
                setProducts(response);
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
                setError('Không thể tải sản phẩm. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleProductClick = (id: number) => {
        navigate(`/product/${id}`);
    };

    if (loading) {
        return <div className="loading"></div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="product-list">

            {products.length > 0 ? (
                products.map((product) => (
                    <div key={product.id} className="product-card" onClick={() => handleProductClick(Number(product.id))}>
                        <div className="product-image-container">
                            <img
                                src={product.image}
                                alt={product.name_product}
                                className="product-image"
                            />
                            <div className="product-label">HOT</div>
                            <button
                                className="add-to-cart-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // Ngăn chặn sự kiện click từ cha
                                    console.log('Thêm vào giỏ hàng:', product.id);
                                }}
                            >
                                <i className="fas fa-shopping-cart"></i> Thêm vào giỏ
                            </button>
                        </div>
                        <div className="product-info">
                            <h2 className="product-title">{product.name_product}</h2>
                            <div className="product-rating">
                                {[...Array(5)].map((_, index) => (
                                    <i
                                        key={index}
                                        className={`fas fa-star ${index < (product.rating || 0) ? 'active' : ''}`}
                                    ></i>
                                ))}
                            </div>
                            <p className="product-description">{product.description}</p>
                            <div className="product-price">
                                {product.discount ? (
                                    <>
                                        <span className="original-price">{product.price_regular} VND</span>
                                        <span className="discounted-price">
                                            {product.price_regular - product.discount} VND
                                        </span>
                                    </>
                                ) : (
                                    <span>{product.price_regular} VND</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-products">Không có sản phẩm nào để hiển thị.</p>
            )}
        </div>
    );
};

export default ProductList;