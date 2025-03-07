import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { GetProductById } from '../service/products/productService';
import { IProducts } from '../interface/Products';
import { AddToCart } from '../service/cart/cartService';
import { ICart } from '../interface/Cart';
import '../component/css/productDetail.css'


const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IProducts | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [colors, setColors] = useState<{ id: number; name: string }[]>([]);
    const [sizes, setSizes] = useState<{ id: number; name: string }[]>([]);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const nav = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id || isNaN(Number(id))) {
                setError("Không có ID sản phẩm hợp lệ!");
                setLoading(false);
                return;
            }
            try {
                const data = await GetProductById(Number(id));
                setProduct(data?.data ? data.data[0] : null);
            } catch (err) {
                setError("Lỗi khi tải sản phẩm");
            } finally {
                setLoading(false);
            }
        };
        const fetchColorsAndSizes = async () => {
            try {
                const [colorRes, sizeRes] = await Promise.all([
                    fetch("http://127.0.0.1:8000/api/colors").then(res => res.json()),
                    fetch("http://127.0.0.1:8000/api/sizes").then(res => res.json())
                ]);
                setColors(Array.isArray(colorRes) ? colorRes : []);
                setSizes(Array.isArray(sizeRes) ? sizeRes : []);
            } catch (err) {
                console.error("Lỗi khi tải màu sắc và kích thước:", err);
            }
        };

        fetchProduct();
        fetchColorsAndSizes();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) {
            console.error("Không có sản phẩm để thêm vào giỏ hàng!");
            return;
        }
        if (!selectedColor || !selectedSize) {
            alert("Vui lòng chọn đầy đủ màu sắc và kích thước!");
            return;
        }

        const cartItem: ICart = {
            id: product.id,
            name: product.name_product,
            price: product.price_sale,
            quantity: Math.max(1, quantity),
            image: product.image,
            color: selectedColor,
            size: selectedSize,
        };

        console.log("Dữ liệu trước khi thêm vào giỏ hàng:", cartItem);
        AddToCart(cartItem);
        alert("Sản phẩm đã được thêm vào giỏ hàng! 🛒");
        nav("/");
    };


    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="not-found">Không tìm thấy sản phẩm!</div>;

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                {product.image ? (
                    <img src={product.image} alt="Hình ảnh sản phẩm" className="product-image" />
                ) : (
                    <p>Không có hình ảnh</p>
                )}
                <div className="product-info">
                    <h1 className="product-title">{product.name_product}</h1>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">
                        <span className="old-price">{product.price_regular ? product.price_regular + " VND" : "N/A"}</span>
                        <span className="new-price">{product.price_sale ? product.price_sale + " VND" : "N/A"}</span>
                    </p>


                    {/* Chọn màu sắc */}
                    <div className="product-colors">
                        <p>Chọn màu sắc:</p>
                        {colors.map(color => (
                            <button
                                key={color.id}
                                className={`color-btn ${selectedColor === color.name ? 'selected' : ''}`}
                                onClick={() => setSelectedColor(color.name)}
                            >
                                {color.name}
                            </button>
                        ))}
                    </div>

                    {/* Chọn kích thước */}
                    <div className="product-sizes">
                        <p>Chọn kích thước:</p>
                        {sizes.map(size => (
                            <button
                                key={size.id}
                                className={`size-btn ${selectedSize === size.name ? 'selected' : ''}`}
                                onClick={() => setSelectedSize(size.name)}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>

                    {/* Chọn số lượng */}
                    <div className="product-quantity">
                        <p>Số lượng:</p>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>

                    <button className="btn-add-cart" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
