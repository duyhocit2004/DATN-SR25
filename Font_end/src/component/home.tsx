import React from "react";

export default function Home() {
    return (
        <main className="main">
           <div className="home-slider slide-animate owl-carousel owl-theme show-nav-hover nav-big mb-2 text-uppercase" data-owl-options="{
                        'loop': false
                    }">
                <div className="home-slide home-slide1 banner">
                    <img className="slide-bg" src="/assets/images/demoes/demo4/slider/slide-1.jpg" width="1903" height="499" alt="slider image" />
                    <div className="container d-flex align-items-center">
                        <div className="banner-layer appear-animate" data-animation-name="fadeInUpShorter">
                            <h4 className="text-transform-none m-b-3">Find the Boundaries. Push Through!</h4>
                            <h2 className="text-transform-none mb-0">Summer Sale</h2>
                            <h3 className="m-b-3">70% Off</h3>
                            <h5 className="d-inline-block mb-0">
                                <span>Starting At</span>
                                <b className="coupon-sale-text text-white bg-secondary align-middle"><sup>$</sup><em
										className="align-text-top">199</em><sup>99</sup></b>
                            </h5>
                            <a href="category.html" className="btn btn-dark btn-lg">Shop Now!</a>
                        </div>
                        
                    </div>
                </div>
               

                <div className="home-slide home-slide2 banner banner-md-vw">
                    <img className="slide-bg" style={{backgroundColor: '#ccc', width:1903, height:499}} src="/assets/images/demoes/demo4/slider/slide-2.jpg" alt="slider image"/>
                    <div className="container d-flex align-items-center">
                        <div className="banner-layer d-flex justify-content-center appear-animate" data-animation-name="fadeInUpShorter">
                            <div className="mx-auto">
                                <h4 className="m-b-1">Extra</h4>
                                <h3 className="m-b-2">20% off</h3>
                                <h3 className="mb-2 heading-border">Accessories</h3>
                                <h2 className="text-transform-none m-b-4">Summer Sale</h2>
                                <a href="category.html" className="btn btn-block btn-dark">Shop All Sale</a>
                            </div>
                        </div>
                       
                    </div>
                </div>
              
            </div>


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


                <div className="banners-container mb-2">
                    <div className="banners-slider owl-carousel owl-theme" data-owl-options="{
                    'dots': false
                }">
                        <div className="banner banner1 banner-sm-vw d-flex align-items-center appear-animate"
                            style={{backgroundColor: '#ccc'}} data-animation-name="fadeInLeftShorter"
                            data-animation-delay="500">
                            <figure className="w-100">
                                <img src="assets/images/demoes/demo4/banners/banner-1.jpg" alt="banner" width="380"
                                    height="175" />
                            </figure>
                            <div className="banner-layer">
                                <h3 className="m-b-2">Porto Watches</h3>
                                <h4 className="m-b-3 text-primary"><sup
                                    className="text-dark"><del>20%</del></sup>30%<sup>OFF</sup></h4>
                                <a href="category.html" className="btn btn-sm btn-dark">Shop Now</a>
                            </div>
                        </div>


                        <div className="banner banner2 banner-sm-vw text-uppercase d-flex align-items-center appear-animate"
                            data-animation-name="fadeInUpShorter" data-animation-delay="200">
                            <figure className="w-100">
                                <img src="assets/images/demoes/demo4/banners/banner-2.jpg"
                                    style={{backgroundColor: '#ccc', alt:"banner", width:"380",height:"175"}} />
                            </figure>
                            <div className="banner-layer text-center">
                                <div className="row align-items-lg-center">
                                    <div className="col-lg-7 text-lg-right">
                                        <h3>Deal Promos</h3>
                                        <h4 className="pb-4 pb-lg-0 mb-0 text-body">Starting at $99</h4>
                                    </div>
                                    <div className="col-lg-5 text-lg-left px-0 px-xl-3">
                                        <a href="category.html" className="btn btn-sm btn-dark">Shop Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="banner banner3 banner-sm-vw d-flex align-items-center appear-animate"
                             style={{backgroundColor: '#ccc'}} data-animation-name="fadeInRightShorter"
                            data-animation-delay="500">
                            <figure className="w-100">
                                <img src="src/assets/images/demoes/demo4/banners/banner-3.jpg" alt="banner" width="380"
                                    height="175" />
                            </figure>
                            <div className="banner-layer text-right">
                                <h3 className="m-b-2">Handbags</h3>
                                <h4 className="m-b-2 text-secondary text-uppercase">Starting at $99</h4>
                                <a href="category.html" className="btn btn-sm btn-dark">Shop Now</a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <section className="featured-products-section">
                <div className="container">
                    <h2 className="section-title heading-border ls-20 border-0">Featured Products</h2>

                    <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center"
                        data-owl-options="{
                                            'dots': false,
                                            'nav': true
                                                }">
                        <div className="product-default appear-animate" data-animation-name="fadeInRightShorter">
                            <figure>
                                <a href="product.html">
                                    <img src="assets/images/products/product-1.jpg" width="280" height="280"
                                        alt="product" />
                                    <img src="assets/images/products/product-1-2.jpg" width="280" height="280"
                                        alt="product" />
                                </a>
                                <div className="label-group">
                                    <div className="product-label label-hot">HOT</div>
                                    <div className="product-label label-sale">-20%</div>
                                </div>
                            </figure>
                            <div className="product-details">
                                <div className="category-list">
                                    <a href="category.html" className="product-category">Category</a>
                                </div>
                                <h3 className="product-title">
                                    <a href="product.html">Ultimate 3D Bluetooth Speaker</a>
                                </h3>
                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style={{width:'80%'}}></span>

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
                                    <a href="product.html" className="btn-icon btn-add-cart"><i
                                        className="fa fa-arrow-right"></i><span>SELECT
                                            OPTIONS</span></a>
                                    <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View"><i
                                        className="fas fa-external-link-alt"></i></a>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            <section className="new-products-section">
                <div className="container">
                    <h2 className="section-title heading-border ls-20 border-0">New Arrivals</h2>

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
                                        <span className="ratings" style={{width:'80%'}}></span>

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


                    <div className="banner banner-big-sale appear-animate" data-animation-delay="200"
                        data-animation-name="fadeInUpShorter"
                        style={{  backgroundColor: '#2A95CB', // Màu nền
                            backgroundImage: "url('/assets/images/demoes/demo4/banners/banner-4.jpg')", // Ảnh nền
                            backgroundPosition: 'center', // Căn giữa ảnh
                            backgroundSize: 'cover', // Hiển thị ảnh toàn bộ mà không bị méo
                            backgroundRepeat: 'no-repeat' // Không lặp lại ảnh
                            }}>
                        <div className="banner-content row align-items-center mx-0">
                            <div className="col-md-9 col-sm-8">
                                <h2 className="text-white text-uppercase text-center text-sm-left ls-n-20 mb-md-0 px-4">
                                    <b className="d-inline-block mr-3 mb-1 mb-md-0">Big Sale</b> All new fashion brands
                                    items up to 70% off
                                    <small className="text-transform-none align-middle">Online Purchases Only</small>
                                </h2>
                            </div>
                            <div className="col-md-3 col-sm-4 text-center text-sm-right">
                                <a className="btn btn-light btn-white btn-lg" href="category.html">View Sale</a>
                            </div>
                        </div>
                    </div>

                    <h2 className="section-title categories-section-title heading-border border-0 ls-0 appear-animate"
                        data-animation-delay="100" data-animation-name="fadeInUpShorter">Danh mục sản phẩmphẩm
                    </h2>

                    <div className="categories-slider owl-carousel owl-theme show-nav-hover nav-outer">
                        <div className="product-category appear-animate" data-animation-name="fadeInUpShorter">
                            <a href="category.html">
                                <figure>
                                    <img src="src/assets/images/demoes/demo4/products/categories/category-1.jpg"
                                        alt="category" width="280" height="240" />
                                </figure>
                                <div className="category-content">
                                    <h3>Dress</h3>
                                    <span><mark className="count">3</mark> products</span>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            <section className="feature-boxes-container">
                <div className="container appear-animate" data-animation-name="fadeInUpShorter">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="feature-box px-sm-5 feature-box-simple text-center">
                                <div className="feature-box-icon">
                                    <i className="icon-earphones-alt"></i>
                                </div>

                                <div className="feature-box-content p-0">
                                    <h3>Hỗ trợ khách hàng</h3>
                                    <h5>Bạn sẽ không đơn độc</h5>

                                    <p>Chúng tôi thực sự quan tâm đến bạn và trang web của bạn nhiều như bạn vậy. Khi
                                        mua tại YounggStyle hoặc bất kỳ chủ đề nào khác từ chúng tôi, bạn sẽ được hỗ trợ
                                        miễn phí 100%.</p>
                                </div>

                            </div>

                        </div>


                        <div className="col-md-4">
                            <div className="feature-box px-sm-5 feature-box-simple text-center">
                                <div className="feature-box-icon">
                                    <i className="icon-credit-card"></i>
                                </div>

                                <div className="feature-box-content p-0">
                                    <h3>Có thể tùy chỉnh hoàn toàn</h3>
                                    <h5>Hàng tấn tùy chọn </h5>

                                    <p>Với YoungStyleYoungStyle, bạn có thể tùy chỉnh bố cục, màu sắc và kiểu dáng chỉ
                                        trong vài phút. Hãy bắt đầu tạo một trang web tuyệt vời ngay bây giờ!</p>
                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">
                            <div className="feature-box px-sm-5 feature-box-simple text-center">
                                <div className="feature-box-icon">
                                    <i className="icon-action-undo"></i>
                                </div>
                                <div className="feature-box-content p-0">
                                    <h3>Quản trị mạnh mẽ</h3>
                                    <h5>Được tạo ra để giúp bạn</h5>

                                    <p>YoungStyleYoungStyle có các tính năng quản trị rất mạnh mẽ để giúp khách hàng xây
                                        dựng cửa hàng của riêng họ trong vài phút mà không cần bất kỳ kỹ năng đặc biệt
                                        nào trong phát triển web.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="promo-section bg-dark" data-parallax="{'speed': 2, 'enableOnMobile': true}"
                data-image-src="src/assets/images/demoes/demo4/banners/banner-5.jpg">
                <div className="promo-banner banner container text-uppercase">
                    <div className="banner-content row align-items-center text-center">
                        <div className="col-md-4 ml-xl-auto text-md-right appear-animate"
                            data-animation-name="fadeInRightShorter" data-animation-delay="600">
                            <h2 className="mb-md-0 text-white">Top Fashion<br />Deals</h2>
                        </div>
                        <div className="col-md-4 col-xl-3 pb-4 pb-md-0 appear-animate" data-animation-name="fadeIn"
                            data-animation-delay="300">
                            <a href="category.html" className="btn btn-dark btn-black ls-10">View Sale</a>
                        </div>
                        <div className="col-md-4 mr-xl-auto text-md-left appear-animate"
                            data-animation-name="fadeInLeftShorter" data-animation-delay="600">
                            <h4 className="mb-1 mt-1 font1 coupon-sale-text p-0 d-block ls-n-10 text-transform-none">
                                <b>Exclusive
                                    COUPON</b>
                            </h4>
                            <h5 className="mb-1 coupon-sale-text text-white ls-10 p-0"><i className="ls-0">UP TO</i><b
                                className="text-white bg-secondary ls-n-10">$100</b> OFF</h5>
                        </div>
                    </div>
                </div>
            </section>

            
            </main>
        );
}