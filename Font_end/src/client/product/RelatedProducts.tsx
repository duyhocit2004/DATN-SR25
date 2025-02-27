import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ListProduct } from '../../service/products/productService';
import { IProducts } from '../../interface/Products';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from './ProductCard';

const RelatedProducts: React.FC = () => {
    const [products, setProducts] = useState<IProducts[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) return <div className="loading"></div>;
    if (error) return <div className="error">{error}</div>;

    const owlOptions = {
        dots: false,
        nav: true,
        items: 5,
        margin: 20,
        loop: true,
        responsive: {
            0: { items: 1 },
            576: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 5 }
        }
    };

    return (
        <section className="featured-products-section">
            <div className="container">
                <h2 className="section-title heading-border ls-20 border-0">Related Products</h2>

                <OwlCarousel 
                    className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center" 
                    {...owlOptions}
                >
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </OwlCarousel>
            </div>
        </section>
    );
};

export default RelatedProducts; 