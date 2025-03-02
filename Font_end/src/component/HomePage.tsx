import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../client/home/productList';
import { NavLink } from "react-router-dom";
import FeaturedProducts from '../client/product/RelatedProducts';



const HomePage = () => {

    return (
        <div className="page-wrapper">

            {/* Main Content */}
            <main className="main">
                {/* Home Slider */}
                <div className="home-slider slide-animate owl-carousel owl-theme show-nav-hover nav-big mb-2 text-uppercase"
                    data-owl-options="{'loop': false}">
                    <div className="home-slide home-slide1 banner">
                        <img className="slide-bg"
                            src="assets/images/demoes/demo4/slider/slide-1.jpg"
                            width="1903"
                            height="499"
                            alt="slider" />
                        <div className="container d-flex align-items-center">
                            <div className="banner-layer appear-animate" data-animation-name="fadeInUpShorter">
                                <h4 className="text-transform-none m-b-3">Find the Boundaries. Push Through!</h4>
                                <h2 className="text-transform-none mb-0">Summer Sale</h2>
                                <h3 className="m-b-3">70% Off</h3>
                                <h5 className="d-inline-block mb-0">
                                    <span>Starting At</span>
                                    <b className="coupon-sale-text text-white bg-secondary align-middle">
                                        <sup>$</sup>
                                        <em className="align-text-top">199</em>
                                        <sup>99</sup>
                                    </b>
                                </h5>
                                <Link to="/category" className="btn btn-dark btn-lg">Shop Now!</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Boxes */}
                <div className="container">
                    <div className="info-boxes-slider owl-carousel owl-theme mb-2" data-owl-options="{
                'dots': false,
                'loop': false,
                'responsive': {
                    '576': {
                        'items': 2
                    },
                    '992': {
                        'items': 3
                    }
                }
            }">
                        <div className="info-box info-box-icon-left">
                            <i className="icon-shipping"></i>

                            <div className="info-box-content">
                                <h4>FREE SHIPPING &amp; RETURN</h4>
                                <p className="text-body">Free shipping on all orders over $99.</p>
                            </div>

                        </div>


                        <div className="info-box info-box-icon-left">
                            <i className="icon-money"></i>

                            <div className="info-box-content">
                                <h4>MONEY BACK GUARANTEE</h4>
                                <p className="text-body">100% money back guarantee</p>
                            </div>

                        </div>


                        <div className="info-box info-box-icon-left">
                            <i className="icon-support"></i>

                            <div className="info-box-content">
                                <h4>ONLINE SUPPORT 24/7</h4>
                                <p className="text-body">Lorem ipsum dolor sit amet.</p>
                            </div>

                        </div>

                    </div>


                </div>
                {/* Banners Container */}
                <div className="container">
                    <div className="banners-container mb-2">
                        <div className="banners-slider owl-carousel owl-theme" data-owl-options="{'dots': false}">
                            <div className="banner banner1 banner-sm-vw d-flex align-items-center appear-animate"
                                style={{ backgroundColor: '#ccc' }}
                                data-animation-name="fadeInLeftShorter"
                                data-animation-delay="500">
                                <figure className="w-100">
                                    <img src="assets/images/demoes/demo4/banners/banner-1.jpg" alt="banner" width="380" height="175" />
                                </figure>
                                <div className="banner-layer">
                                    <h3 className="m-b-2">Porto Watches</h3>
                                    <h4 className="m-b-3 text-primary">
                                        <sup className="text-dark"><del>20%</del></sup>30%<sup>OFF</sup>
                                    </h4>
                                    <Link to="/category" className="btn btn-sm btn-dark">Shop Now</Link>
                                </div>
                            </div>

                            {/* Banner 2 */}
                            <div className="banner banner2 banner-sm-vw text-uppercase d-flex align-items-center appear-animate"
                                data-animation-name="fadeInUpShorter"
                                data-animation-delay="200">
                                <figure className="w-100">
                                    <img src="assets/images/demoes/demo4/banners/banner-2.jpg"
                                        style={{ backgroundColor: '#ccc' }}
                                        alt="banner"
                                        width="380"
                                        height="175" />
                                </figure>
                                <div className="banner-layer text-center">
                                    <div className="row align-items-lg-center">
                                        <div className="col-lg-7 text-lg-right">
                                            <h3>Deal Promos</h3>
                                            <h4 className="pb-4 pb-lg-0 mb-0 text-body">Starting at $99</h4>
                                        </div>
                                        <div className="col-lg-5 text-lg-left px-0 px-xl-3">
                                            <Link to="/category" className="btn btn-sm btn-dark">Shop Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Banner 3 */}
                            <div className="banner banner3 banner-sm-vw d-flex align-items-center appear-animate"
                                style={{ backgroundColor: '#ccc' }}
                                data-animation-name="fadeInRightShorter"
                                data-animation-delay="500">
                                <figure className="w-100">
                                    <img src="assets/images/demoes/demo4/banners/banner-3.jpg" alt="banner" width="380" height="175" />
                                </figure>
                                <div className="banner-layer text-right">
                                    <h3 className="m-b-2">Handbags</h3>
                                    <h4 className="m-b-2 text-secondary text-uppercase">Starting at $99</h4>
                                    <Link to="/category" className="btn btn-sm btn-dark">Shop Now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Products Section */}
                <FeaturedProducts />
                {/* <ProductList /> */}

                {/* New Arrivals Section */}
                <section className="new-products-section">
                    <div className="container">
                        <h2 className="section-title heading-border ls-20 border-0">Sản phẩm mới</h2>
                        <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center mb-2"
                            data-owl-options="{
                                'dots': false,
                                'nav': true,
                                'responsive': {
                                    '992': {
                                        'items': 4
                                    },
                                    '1200': {
                                        'items': 5
                                    }
                                }
                            }">
                            <div className="product-default appear-animate" data-animation-name="fadeInRightShorter">
                                <figure>
                                    <a href="product.html">
                                        <img src="assets/images/products/product-6.jpg" width="220" height="220"
                                            alt="product" />
                                        <img src="assets/images/products/product-6-2.jpg" width="220" height="220"
                                            alt="product" />
                                    </a>
                                    <div className="label-group">
                                        <div className="product-label label-hot">HOT</div>
                                    </div>
                                </figure>
                                <div className="product-details">
                                    <div className="category-list">
                                        <a href="category.html" className="product-category">Category</a>
                                    </div>
                                    <h3 className="product-title">
                                        <a href="product.html">Men Black Gentle Belt</a>
                                    </h3>
                                    <div className="ratings-container">
                                        <div className="product-ratings">
                                            <span className="ratings" style={{ width: '80%' }}></span>

                                            <span className="tooltiptext tooltip-top"></span>
                                        </div>

                                    </div>

                                    <div className="price-box">
                                        <del className="old-price">$59.00</del>
                                        <span className="product-price">$49.00</span>
                                    </div>

                                    <div className="product-action">
                                        <a href="wishlist.html" className="btn-icon-wish" title="wishlist"><i
                                            className="icon-heart"></i></a>
                                        <a href="#" className="btn-icon btn-add-cart product-type-simple"><i
                                            className="icon-shopping-cart"></i><span>ADD TO CART</span></a>
                                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i
                                            className="fas fa-external-link-alt"></i></a>
                                    </div>
                                </div>

                            </div>

                        </div>
                        {/* Add new arrivals products slider similar to featured products */}
                    </div>
                </section>

                {/* Brands Slider */}
                <div className="container">
                    <hr className="mt-0 m-b-5" />
                    <div className="brands-slider owl-carousel owl-theme images-center appear-animate"
                        data-animation-name="fadeIn"
                        data-animation-duration="500"
                        data-owl-options="{'margin': 0}">
                        <img src="assets/images/brands/brand1.png" width="130" height="56" alt="brand" />
                        <img src="assets/images/brands/brand2.png" width="130" height="56" alt="brand" />
                        <img src="assets/images/brands/brand3.png" width="130" height="56" alt="brand" />
                        <img src="assets/images/brands/brand4.png" width="130" height="56" alt="brand" />
                        <img src="assets/images/brands/brand5.png" width="130" height="56" alt="brand" />
                        <img src="assets/images/brands/brand6.png" width="130" height="56" alt="brand" />
                    </div>
                    <hr className="mt-4 m-b-5" />
                </div>


                {/* Product Widgets Container */}
                <div className="container">
                    <div className="product-widgets-container row pb-2">
                        {/* Featured Products Widget */}
                        <div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate"
                            data-animation-name="fadeInLeftShorter"
                            data-animation-delay="200">
                            <h4 className="section-sub-title">Featured Products</h4>
                            {/* Add featured product widgets */}
                        </div>

                        {/* Best Selling Products Widget */}
                        <div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate"
                            data-animation-name="fadeInLeftShorter"
                            data-animation-delay="500">
                            <h4 className="section-sub-title">Best Selling Products</h4>
                            {/* Add best selling product widgets */}
                        </div>

                        {/* Latest Products Widget */}
                        <div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate"
                            data-animation-name="fadeInLeftShorter"
                            data-animation-delay="800">
                            <h4 className="section-sub-title">Latest Products</h4>
                            {/* Add latest product widgets */}
                        </div>

                        {/* Top Rated Products Widget */}
                        <div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate"
                            data-animation-name="fadeInLeftShorter"
                            data-animation-delay="1100">
                            <h4 className="section-sub-title">Top Rated Products</h4>
                            {/* Add top rated product widgets */}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default HomePage;