import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetProductById } from '../service/products/productService';
import { IProducts } from '../interface/Products';


const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProducts>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                if (id == null){
                    throw new Error("Không có ID sản phẩm!");
                } else {
                    const data = await GetProductById(Number(id));
                    console.log("Dữ liệu sản phẩm:", data);
                    setProduct(data?.data);
                }
            } catch (err) {
                console.error("Lỗi khi tải sản phẩm:", err);
                setError('Lỗi khi tải sản phẩm');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="not-found">Không tìm thấy sản phẩm!</div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <img src={product.image} alt={product.name_product} className="product-image" />
                <div className="product-info">
                    <h1 className="product-title">{product.name_product}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">
                        <span className="old-price">{product.price_regular} VND</span>
                        <span className="new-price">{product.price_sale} VND</span>
                    </p>
                    <button className="btn-add-cart">Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
