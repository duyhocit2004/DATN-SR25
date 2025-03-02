import React from 'react';
import { Link } from 'react-router-dom';
import { IProducts } from '../../interface/Products';

interface ProductCardProps {
    product: IProducts;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div key={product.id} className="product-default appear-animate" data-animation-name="fadeInRightShorter">
            <figure>
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} width="220" height="220" alt={product.name_product} />
                </Link>
                <div className="label-group">
                    <div className="product-label label-hot">HOT</div>
                    {product.discount && (
                        <div className="product-label label-sale">
                            -{Math.round((product.discount / product.price_regular) * 100)}%
                        </div>
                    )}
                </div>
            </figure>
            <div className="product-details">
                {product.category && (
                    <div className="category-list">
                        <Link to={`/category/${product.category}`} className="product-category">
                            {product.category}
                        </Link>
                    </div>
                )}
                <h3 className="product-title">
                    <Link to={`/product/${product.id}`}>{product.name_product}</Link>
                </h3>
                <div className="ratings-container">
                    <div className="product-ratings">
                        <span
                            className="ratings"
                            style={{ width: `${(product.rating || 0) * 20}%` }}
                        ></span>
                        <span className="tooltiptext tooltip-top"></span>
                    </div>
                </div>
                <div className="price-box">
                    {product.discount && (
                        <del className="old-price">${product.price_regular.toFixed(2)}</del>
                    )}
                    <span className="product-price">
                        ${(product.discount
                            ? product.price_regular - product.discount
                            : product.price_regular
                        ).toFixed(2)}
                    </span>
                </div>
                <div className="product-action">
                    <Link to="/wishlist" className="btn-icon-wish" title="wishlist">
                        <i className="icon-heart"></i>
                    </Link>
                    <Link to={`/product/${product.id}`} className="btn-icon btn-add-cart">
                        <i className="fa fa-arrow-right"></i>
                        <span>SELECT OPTIONS</span>
                    </Link>
                    <a href="#" className="btn-quickview" title="Quick View" onClick={(e) => {
                        e.preventDefault();
                        // Add quick view logic here
                    }}>
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 