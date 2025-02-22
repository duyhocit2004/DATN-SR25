import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../service/auth/authService';

const ProductDetails: React.FC = () => {
    const params = useParams<{ id?: string }>();
const id = params.id ?? "";
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]); // Gọi lại khi id thay đổi

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="page-wrapper">
            <main className="main">
                <div className="container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="icon-home"></i></a></li>
                            <li className="breadcrumb-item"><a href="#">Products</a></li>
                        </ol>
                    </nav>

                    <div className="product-single-container product-single-default">
                        <div className="cart-message d-none">
                            <strong className="single-cart-notice">{product.name}</strong>
                            <span>has been added to your cart.</span>
                        </div>

                        <div className="row">
                            <div className="col-lg-5 col-md-6 product-single-gallery">
                                <div className="product-slider-container">
                                    <div className="label-group">
                                        <div className="product-label label-hot">HOT</div>
                                        <div className="product-label label-sale">-16%</div>
                                    </div>

                                    <div className="product-single-carousel owl-carousel owl-theme show-nav-hover">
                                        {product.images.map((image: string, index: number) => (
                                            <div className="product-item" key={index}>
                                                <img className="product-single-image" src={image} alt={product.name} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-7 col-md-6 product-single-details">
                                <h1 className="product-title">{product.name}</h1>
                                <div className="price-box">
                                    <span className="old-price">${product.oldPrice}</span>
                                    <span className="new-price">${product.newPrice}</span>
                                </div>
                                <div className="product-desc">
                                    <p>{product.description}</p>
                                </div>
                                <div className="product-action">
                                    <input className="horizontal-quantity form-control" type="text" defaultValue="1" />
                                    <a href="javascript:;" className="btn btn-dark add-cart mr-2">Add to Cart</a>
                                </div>
                            </div>
                        </div>

                        {/* Các tab chi tiết sản phẩm */}
                        <div className="product-single-tabs">
                            <ul className="nav nav-tabs" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="product-tab-desc" data-toggle="tab" href="#product-desc-content" role="tab">Description</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="product-tab-size" data-toggle="tab" href="#product-size-content" role="tab">Size Guide</a>
                                </li>
                            </ul>

                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="product-desc-content" role="tabpanel">
                                    <p>{product.fullDescription}</p>
                                </div>
                                <div className="tab-pane fade" id="product-size-content" role="tabpanel">
                                    {/* Thêm thông tin kích thước nếu có */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductDetails;