import React from 'react';
import { Link } from 'react-router-dom';

const Product = () => {
    return (
        <div className="page-wrapper">
            <main className="main">
                <div className="category-banner-container bg-gray">
                    <div className="category-banner banner text-uppercase" style={{
                        backgroundImage: "url('/assets/images/banners/banner-top.jpg')",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        backgroundSize: "cover"
                    }}>
                        <div className="container position-relative">
                            <div className="row">
                                <div className="pl-lg-5 pb-5 pb-md-0 col-sm-5 col-xl-4 col-lg-4 offset-1">
                                    <h3>Electronic<br/>Deals</h3>
                                    <a href="category.html" className="btn btn-dark">Get Yours!</a>
                                </div>
                                <div className="pl-lg-3 col-sm-4 offset-sm-0 offset-1 pt-3">
                                    <div className="coupon-sale-content">
                                        <h4 className="m-b-1 coupon-sale-text bg-white text-transform-none">Exclusive COUPON
                                        </h4>
                                        <h5 className="mb-2 coupon-sale-text d-block ls-10 p-0"><i className="ls-0">UP TO</i><b className="text-dark">$100</b> OFF</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <nav aria-label="breadcrumb" className="breadcrumb-nav">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><a href="index.html"><i className="icon-home"></i></a></li>
                            <li className="breadcrumb-item"><a href="#">Men</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Accessories</li>
                        </ol>
                    </nav>

                    <div className="row">
                        <div className="col-lg-9 main-content">
                            <nav className="toolbox sticky-header" data-sticky-options="{'mobile': true}">
                                <div className="toolbox-left">
                                    <a href="#" className="sidebar-toggle">
                                        <svg data-name="Layer 3" id="Layer_3" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <line x1="15" x2="26" y1="9" y2="9" className="cls-1"></line>
                                            <line x1="6" x2="9" y1="9" y2="9" className="cls-1"></line>
                                            <line x1="23" x2="26" y1="16" y2="16" className="cls-1"></line>
                                            <line x1="6" x2="17" y1="16" y2="16" className="cls-1"></line>
                                            <line x1="17" x2="26" y1="23" y2="23" className="cls-1"></line>
                                            <line x1="6" x2="11" y1="23" y2="23" className="cls-1"></line>
                                            <path
                                                d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
                                                className="cls-2"></path>
                                            <path d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z" className="cls-2"></path>
                                            <path d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z" className="cls-3"></path>
                                            <path
                                                d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
                                                className="cls-2"></path>
                                        </svg>
                                        <span>Filter</span>
                                    </a>

                                    <div className="toolbox-item toolbox-sort">
                                        <label>Sắp xếp theo:</label>

                                        <div className="select-custom">
                                            <select name="orderby" className="form-control" defaultValue="menu_order">
                                                <option value="menu_order" >Default sorting</option>
                                                <option value="popularity">Sort by popularity</option>
                                                <option value="rating">Sort by average rating</option>
                                                <option value="date">Sort by newness</option>
                                                <option value="price">Sort by price: low to high</option>
                                                <option value="price-desc">Sort by price: high to low</option>
                                            </select>
                                        </div>


                                    </div>
                                </div>

                                <div className="toolbox-right">
                                    <div className="toolbox-item toolbox-show">
                                        <label>Show:</label>

                                        <div className="select-custom">
                                            <select name="count" className="form-control">
                                                <option value="12">12</option>
                                                <option value="24">24</option>
                                                <option value="36">36</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="toolbox-item layout-modes">
                                        <a href="category.html" className="layout-btn btn-grid active" title="Grid">
                                            <i className="icon-mode-grid"></i>
                                        </a>
                                        <a href="category-list.html" className="layout-btn btn-list" title="List">
                                            <i className="icon-mode-list"></i>
                                        </a>
                                    </div>
                                </div>
                            </nav>

                            <div className="row">
                                <div className="col-6 col-sm-4">
                                    <div className="product-default">
                                        <figure>
                                            <a href="productdetail">
                                                <img src="assets/images/products/product-1.jpg" width="280" height="280" alt="product" />
                                                <img src="assets/images/products/product-1-2.jpg" width="280" height="280" alt="product" />
                                            </a>

                                            <div className="label-group">
                                                <div className="product-label label-hot">HOT</div>
                                                <div className="product-label label-sale">-20%</div>
                                            </div>
                                        </figure>

                                        <div className="product-details">
                                            <div className="category-wrap">
                                                <div className="category-list">
                                                    <a href="category.html" className="product-category">category</a>
                                                </div>
                                            </div>

                                            <h3 className="product-title"> <a href="product.html">Ultimate 3D Bluetooth
                                                Speaker</a> </h3>

                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{width:'100%'}}></span>
                                                    <span className="tooltiptext tooltip-top"></span>
                                                </div>
                                            </div>

                                            <div className="price-box">
                                                <span className="old-price">$90.00</span>
                                                <span className="product-price">$70.00</span>
                                            </div>

                                            <div className="product-action">
                                                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i
                                                    className="icon-heart"></i></a>
                                                <a href="product.html" className="btn-icon btn-add-cart"><i
                                                    className="fa fa-arrow-right"></i><span>SELECT
                                                        OPTIONS</span></a>
                                                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 col-sm-4">
                                    <div className="product-default">
                                        <figure>
                                            <a href="productdetail">
                                                <img src="assets/images/products/product-2.jpg" width="280" height="280" alt="product" />
                                                <img src="assets/images/products/product-2-2.jpg" width="280" height="280" alt="product" />
                                            </a>
                                        </figure>

                                        <div className="product-details">
                                            <div className="category-wrap">
                                                <div className="category-list">
                                                    <a href="category.html" className="product-category">category</a>
                                                </div>
                                            </div>

                                            <h3 className="product-title"> <a href="product.html">Brown Women Casual HandBag</a>
                                            </h3>

                                            <div className="ratings-container">
                                                <div className="product-ratings">
                                                    <span className="ratings" style={{width:'100%'}}></span>
                                                    <span className="tooltiptext tooltip-top"></span>
                                                </div>
                                            </div>

                                            <div className="price-box">
                                                <span className="product-price">$33.00</span>
                                            </div>

                                            <div className="product-action">
                                                <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i
                                                    className="icon-heart"></i></a>
                                                <a href="product.html" className="btn-icon btn-add-cart"><i
                                                    className="fa fa-arrow-right"></i><span>SELECT
                                                        OPTIONS</span></a>
                                                <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i className="fas fa-external-link-alt"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <nav className="toolbox toolbox-pagination">
                                <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                        <select name="count" className="form-control">
                                            <option value="12">12</option>
                                            <option value="24">24</option>
                                            <option value="36">36</option>
                                        </select>
                                    </div>
                                </div>

                                <ul className="pagination toolbox-item">
                                    <li className="page-item disabled">
                                        <a className="page-link page-link-btn" href="#"><i className="icon-angle-left"></i></a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
                                    </li>
                                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                                    <li className="page-item"><span className="page-link">...</span></li>
                                    <li className="page-item">
                                        <a className="page-link page-link-btn" href="#"><i className="icon-angle-right"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="sidebar-overlay"></div>
                        <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
                            <div className="sidebar-wrapper">
                                <div className="widget">
                                    <h3 className="widget-title">
                                        <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Categories</a>
                                    </h3>

                                    <div className="collapse show" id="widget-body-2">
                                        <div className="widget-body">
                                            <ul className="cat-list">
                                                <li>
                                                    <a href="#widget-category-1" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="widget-category-1">
                                                        Accessories<span className="products-count">(3)</span>
                                                        <span className="toggle"></span>
                                                    </a>
                                                    <div className="collapse show" id="widget-category-1">
                                                        <ul className="cat-sublist">
                                                            <li>Caps<span className="products-count">(1)</span></li>
                                                            <li>Watches<span className="products-count">(2)</span></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a href="#widget-category-2" className="collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="widget-category-2">
                                                        Dress<span className="products-count">(4)</span>
                                                        <span className="toggle"></span>
                                                    </a>
                                                    <div className="collapse" id="widget-category-2">
                                                        <ul className="cat-sublist">
                                                            <li>Clothing<span className="products-count">(4)</span></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a href="#widget-category-3" className="collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="widget-category-3">
                                                        Electronics<span className="products-count">(2)</span>
                                                        <span className="toggle"></span>
                                                    </a>
                                                    <div className="collapse" id="widget-category-3">
                                                        <ul className="cat-sublist">
                                                            <li>Headphone<span className="products-count">(1)</span></li>
                                                            <li>Watch<span className="products-count">(1)</span></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li>
                                                    <a href="#widget-category-4" className="collapsed" data-toggle="collapse" role="button" aria-expanded="false" aria-controls="widget-category-4">
                                                        Fashion<span className="products-count">(6)</span>
                                                        <span className="toggle"></span>
                                                    </a>
                                                    <div className="collapse" id="widget-category-4">
                                                        <ul className="cat-sublist">
                                                            <li>Shoes<span className="products-count">(4)</span></li>
                                                            <li>Bag<span className="products-count">(2)</span></li>
                                                        </ul>
                                                    </div>
                                                </li>
                                                <li><a href="#">Music<span className="products-count">(2)</span></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget">
                                    <h3 className="widget-title">
                                        <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true" aria-controls="widget-body-3">Price</a>
                                    </h3>

                                    <div className="collapse show" id="widget-body-3">
                                        <div className="widget-body pb-0">
                                            <form action="#">
                                                <div className="price-slider-wrapper">
                                                    <div id="price-slider"></div>
                                                </div>

                                                <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                                                    <div className="filter-price-text">
                                                        Price:
                                                        <span id="filter-price-range"></span>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary">Filter</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget widget-color">
                                    <h3 className="widget-title">
                                        <a data-toggle="collapse" href="#widget-body-4" role="button" aria-expanded="true" aria-controls="widget-body-4">Color</a>
                                    </h3>

                                    <div className="collapse show" id="widget-body-4">
                                        <div className="widget-body pb-0">
                                            <ul className="config-swatch-list">
                                                <li className="active">
                                                    <a href="#" style={{backgroundColor: '#000'}}></a>
                                                </li>
                                                <li>
                                                    <a href="#" style={{backgroundColor: '#0188cc'}}></a>
                                                </li>
                                                <li>
                                                    <a href="#" style={{backgroundColor: '#81d742'}}></a>
                                                </li>
                                                <li>
                                                    <a href="#" style={{backgroundColor: '#6085a5'}}></a>
                                                </li>
                                                <li>
                                                    <a href="#" style={{backgroundColor: '#ab6e6e'}}></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget widget-size">
                                    <h3 className="widget-title">
                                        <a data-toggle="collapse" href="#widget-body-5" role="button" aria-expanded="true" aria-controls="widget-body-5">Sizes</a>
                                    </h3>

                                    <div className="collapse show" id="widget-body-5">
                                        <div className="widget-body pb-0">
                                            <ul className="config-size-list">
                                                <li className="active"><a href="#">XL</a></li>
                                                <li><a href="#">L</a></li>
                                                <li><a href="#">M</a></li>
                                                <li><a href="#">S</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="widget widget-featured">
                                    <h3 className="widget-title">Nổi bật</h3>

                                    <div className="widget-body">
                                        <div className="owl-carousel widget-featured-products">
                                            <div className="featured-col">
                                                <div className="product-default left-details product-widget">
                                                    <figure>
                                                        <a href="product.html">
                                                            <img src="assets/images/products/small/product-4.jpg" width="75" height="75" alt="product" />
                                                            <img src="assets/images/products/small/product-4-2.jpg" width="75" height="75" alt="product" />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h3 className="product-title"> <a href="productdetail">Blue Backpack for
                                                            the Young - S</a> </h3>
                                                        <div className="ratings-container">
                                                            <div className="product-ratings">
                                                                <span className="ratings" style={{width:'100%'}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="price-box">
                                                            <span className="product-price">$49.00</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="featured-col">
                                                <div className="product-default left-details product-widget">
                                                    <figure>
                                                        <a href="product.html">
                                                            <img src="assets/images/products/small/product-1.jpg" width="75" height="75" alt="product" />
                                                            <img src="assets/images/products/small/product-1-2.jpg" width="75" height="75" alt="product" />
                                                        </a>
                                                    </figure>
                                                    <div className="product-details">
                                                        <h3 className="product-title"> <a href="productdetail">Ultimate 3D
                                                            Bluetooth Speaker</a> </h3>
                                                        <div className="ratings-container">
                                                            <div className="product-ratings">
                                                                <span className="ratings" style={{width:'100%'}}></span>
                                                                <span className="tooltiptext tooltip-top"></span>
                                                            </div>
                                                        </div>
                                                        <div className="price-box">
                                                            <span className="product-price">$49.00</span>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </aside>
                    </div>
                </div>

                <div className="mb-4"></div>

            </main>
        </div>


    );
};

export default Product;