import React from 'react';
import { Link } from 'react-router-dom';

const ProductDetail = () => {
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
                        <strong className="single-cart-notice">“Men Black Sports Shoes”</strong>
                        <span>has been added to your cart.</span>
                    </div>

                    <div className="row">
                        <div className="col-lg-5 col-md-6 product-single-gallery">
                            <div className="product-slider-container">
                                <div className="label-group">
                                    <div className="product-label label-hot">HOT</div>

                                    <div className="product-label label-sale">
                                        -16%
                                    </div>
                                </div>

                                <div className="product-single-carousel owl-carousel owl-theme show-nav-hover">
                                    <div className="product-item">
                                        <img className="product-single-image" src="assets/images/products/zoom/product-1-big.jpg" data-zoom-image="assets/images/products/zoom/product-1-big.jpg" width="468" height="468" alt="product" />
                                    </div>
                                    <div className="product-item">
                                        <img className="product-single-image" src="assets/images/products/zoom/product-2-big.jpg" data-zoom-image="assets/images/products/zoom/product-2-big.jpg" width="468" height="468" alt="product" />
                                    </div>
                                    <div className="product-item">
                                        <img className="product-single-image" src="assets/images/products/zoom/product-3-big.jpg" data-zoom-image="assets/images/products/zoom/product-3-big.jpg" width="468" height="468" alt="product" />
                                    </div>
                                    <div className="product-item">
                                        <img className="product-single-image" src="assets/images/products/zoom/product-4-big.jpg" data-zoom-image="assets/images/products/zoom/product-4-big.jpg" width="468" height="468" alt="product" />
                                    </div>
                                    <div className="product-item">
                                        <img className="product-single-image" src="assets/images/products/zoom/product-5-big.jpg" data-zoom-image="assets/images/products/zoom/product-5-big.jpg" width="468" height="468" alt="product" />
                                    </div>
                                </div>
                                <span className="prod-full-screen">
									<i className="icon-plus"></i>
								</span>
                            </div>

                            <div className="prod-thumbnail owl-dots">
                                <div className="owl-dot">
                                    <img src="assets/images/products/zoom/product-1.jpg" width="110" height="110" alt="product-thumbnail" />
                                </div>
                                <div className="owl-dot">
                                    <img src="assets/images/products/zoom/product-2.jpg" width="110" height="110" alt="product-thumbnail" />
                                </div>
                                <div className="owl-dot">
                                    <img src="assets/images/products/zoom/product-3.jpg" width="110" height="110" alt="product-thumbnail" />
                                </div>
                                <div className="owl-dot">
                                    <img src="assets/images/products/zoom/product-4.jpg" width="110" height="110" alt="product-thumbnail" />
                                </div>
                                <div className="owl-dot">
                                    <img src="assets/images/products/zoom/product-5.jpg" width="110" height="110" alt="product-thumbnail" />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-6 product-single-details">
                            <h1 className="product-title">Men Black Sports Shoes</h1>

                            <div className="product-nav">
                                <div className="product-prev">
                                    <a href="#">
                                        <span className="product-link"></span>

                                        <span className="product-popup">
											<span className="box-content">
												<img alt="product" width="150" height="150"
													src="assets/images/products/product-3.jpg"
													style={{paddingTop: '0px'}} />

												<span>Circled Ultimate 3D Speaker</span>
                                        </span>
                                        </span>
                                    </a>
                                </div>

                                <div className="product-next">
                                    <a href="#">
                                        <span className="product-link"></span>

                                        <span className="product-popup">
											<span className="box-content">
												<img alt="product" width="150" height="150"
													src="assets/images/products/product-4.jpg"
													style={{paddingTop: '0px'}} />

												<span>Blue Backpack for the Young</span>
                                        </span>
                                        </span>
                                    </a>
                                </div>
                            </div>

                            <div className="ratings-container">
                                <div className="product-ratings">
                                    <span className="ratings" style={{width: '60%'}}></span>
                                    <span className="tooltiptext tooltip-top"></span>
                                </div>

                                <a href="#" className="rating-link">( 6 Reviews )</a>
                            </div>

                            <hr className="short-divider" />

                            <div className="price-box">
                                <span className="old-price">$1,999.00</span>
                                <span className="new-price">$1,699.00</span>
                            </div>

                            <div className="product-desc">
                                <p>
                                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris
                                    placerat eleifend leo.
                                </p>
                            </div>

                            <ul className="single-info-list">

                                <li>
                                    SKU: <strong>654613612</strong>
                                </li>

                                <li>
                                    CATEGORY: <strong><a href="#" className="product-category">SHOES</a></strong>
                                </li>

                                <li>
                                    TAGs: <strong><a href="#" className="product-category">CLOTHES</a></strong>,
                                    <strong><a href="#" className="product-category">SWEATER</a></strong>
                                </li>
                            </ul>

                            <div className="product-action">
                                <div className="product-single-qty">
                                    <input className="horizontal-quantity form-control" type="text" />
                                </div>

                                <a href="javascript:;" className="btn btn-dark add-cart mr-2" title="Add to Cart">Add to
									Cart</a>

                                <a href="cart.html" className="btn btn-gray view-cart d-none">View cart</a>
                            </div>

                            <hr className="divider mb-0 mt-0" />

                            <div className="product-single-share mb-3">
                                <label className="sr-only">Share:</label>

                                <div className="social-icons mr-2">
                                    <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook"></a>
                                    <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter"></a>
                                    <a href="#" className="social-icon social-linkedin fab fa-linkedin-in" target="_blank" title="Linkedin"></a>
                                    <a href="#" className="social-icon social-gplus fab fa-google-plus-g" target="_blank" title="Google +"></a>
                                    <a href="#" className="social-icon social-mail icon-mail-alt" target="_blank" title="Mail"></a>
                                </div>

                                <a href="wishlist.html" className="btn-icon-wish add-wishlist" title="Add to Wishlist"><i
										className="icon-wishlist-2"></i><span>Add to
										Wishlist</span></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="product-single-tabs">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="product-tab-desc" data-toggle="tab" href="#product-desc-content" role="tab" aria-controls="product-desc-content" aria-selected="true">Description</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" id="product-tab-size" data-toggle="tab" href="#product-size-content" role="tab" aria-controls="product-size-content" aria-selected="true">Size Guide</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" id="product-tab-tags" data-toggle="tab" href="#product-tags-content" role="tab" aria-controls="product-tags-content" aria-selected="false">Additional
								Information</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" id="product-tab-reviews" data-toggle="tab" href="#product-reviews-content" role="tab" aria-controls="product-reviews-content" aria-selected="false">Reviews (1)</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="product-desc-content" role="tabpanel" aria-labelledby="product-tab-desc">
                            <div className="product-desc-content">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud ipsum consectetur sed do, quis nostrud exercitation ullamco laboris
                                    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.</p>
                                <ul>
                                    <li>Any Product types that You want - Simple, Configurable
                                    </li>
                                    <li>Downloadable/Digital Products, Virtual Products
                                    </li>
                                    <li>Inventory Management with Backordered items
                                    </li>
                                </ul>
                                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="product-size-content" role="tabpanel" aria-labelledby="product-tab-size">
                            <div className="product-size-content">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src="assets/images/products/single/body-shape.png" alt="body shape" width="217" height="398" />
                                    </div>

                                    <div className="col-md-8">
                                        <table className="table table-size">
                                            <thead>
                                                <tr>
                                                    <th>SIZE</th>
                                                    <th>CHEST(in.)</th>
                                                    <th>WAIST(in.)</th>
                                                    <th>HIPS(in.)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>XS</td>
                                                    <td>34-36</td>
                                                    <td>27-29</td>
                                                    <td>34.5-36.5</td>
                                                </tr>
                                                <tr>
                                                    <td>S</td>
                                                    <td>36-38</td>
                                                    <td>29-31</td>
                                                    <td>36.5-38.5</td>
                                                </tr>
                                                <tr>
                                                    <td>M</td>
                                                    <td>38-40</td>
                                                    <td>31-33</td>
                                                    <td>38.5-40.5</td>
                                                </tr>
                                                <tr>
                                                    <td>L</td>
                                                    <td>40-42</td>
                                                    <td>33-36</td>
                                                    <td>40.5-43.5</td>
                                                </tr>
                                                <tr>
                                                    <td>XL</td>
                                                    <td>42-45</td>
                                                    <td>36-40</td>
                                                    <td>43.5-47.5</td>
                                                </tr>
                                                <tr>
                                                    <td>XXL</td>
                                                    <td>45-48</td>
                                                    <td>40-44</td>
                                                    <td>47.5-51.5</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade" id="product-tags-content" role="tabpanel" aria-labelledby="product-tab-tags">
                            <table className="table table-striped mt-2">
                                <tbody>
                                    <tr>
                                        <th>Weight</th>
                                        <td>23 kg</td>
                                    </tr>

                                    <tr>
                                        <th>Dimensions</th>
                                        <td>12 × 24 × 35 cm</td>
                                    </tr>

                                    <tr>
                                        <th>Color</th>
                                        <td>Black, Green, Indigo</td>
                                    </tr>

                                    <tr>
                                        <th>Size</th>
                                        <td>Large, Medium, Small</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="tab-pane fade" id="product-reviews-content" role="tabpanel" aria-labelledby="product-tab-reviews">
                            <div className="product-reviews-content">
                                <h3 className="reviews-title">1 review for Men Black Sports Shoes</h3>

                                <div className="comment-list">
                                    <div className="comments">
                                        <figure className="img-thumbnail">
                                            <img src="assets/images/blog/author.jpg" alt="author" width="80" height="80" />
                                        </figure>

                                        <div className="comment-block">
                                            <div className="comment-header">
                                                <div className="comment-arrow"></div>

                                                <div className="ratings-container float-sm-right">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{width: '60%'}}></span>
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                                </div>

                                                <span className="comment-by">
													<strong>Joe Doe</strong> – April 12, 2018
												</span>
                                            </div>

                                            <div className="comment-content">
                                                <p>Excellent.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="divider"></div>

                                <div className="add-product-review">
                                    <h3 className="review-title">Add a review</h3>

                                    <form action="#" className="comment-form m-0">
                                        <div className="rating-form">
                                            <label htmlFor="rating">Your rating <span className="required">*</span></label>
                                            <span className="rating-stars">
												<a className="star-1" href="#">1</a>
												<a className="star-2" href="#">2</a>
												<a className="star-3" href="#">3</a>
												<a className="star-4" href="#">4</a>
												<a className="star-5" href="#">5</a>
											</span>

                                            <select name="rating" id="rating" required style={{display: "none"}}>
												<option value="">Rate…</option>
												<option value="5">Perfect</option>
												<option value="4">Good</option>
												<option value="3">Average</option>
												<option value="2">Not that bad</option>
												<option value="1">Very poor</option>
											</select>
                                        </div>

                                        <div className="form-group">
                                            <label>Your review <span className="required">*</span></label>
                                            <textarea cols={5} rows={6} className="form-control form-control-sm"></textarea>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6 col-xl-12">
                                                <div className="form-group">
                                                    <label>Name <span className="required">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" required />
                                                </div>
                                            </div>

                                            <div className="col-md-6 col-xl-12">
                                                <div className="form-group">
                                                    <label>Email <span className="required">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" required />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="save-name" />
                                                    <label className="custom-control-label mb-0" htmlFor="save-name">Save my
														name, email, and website in this browser for the next time I
														comment.</label>
                                                </div>
                                            </div>
                                        </div>

                                        <input type="submit" className="btn btn-primary" value="Submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="products-section pt-0">
                    <h2 className="section-title">Sản Phẩm Liên Quan</h2>

                    <div className="products-slider owl-carousel owl-theme dots-top dots-small">
                        <div className="product-default">
                            <figure>
                                <a href="product.html">
                                    <img src="assets/images/products/product-1.jpg" width="280" height="280" alt="product" />
                                    <img src="assets/images/products/product-1-2.jpg" width="280" height="280" alt="product" />
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
                                        <span className="ratings" style={{width: '80%'}}></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>
                                <div className="price-box">
                                    <del className="old-price">$59.00</del>
                                    <span className="product-price">$49.00</span>
                                </div>
                                <div className="product-action">
                                    <a href="wishlist.html" title="Wishlist" className="btn-icon-wish"><i
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

                <hr className="mt-0 m-b-5" />

                <div className="product-widgets-container row pb-2">
                    <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                        <h4 className="section-sub-title">Sản phẩm nổi bật</h4>
                        <div className="product-default left-details product-widget">
                            <figure>
                                <a href="product.html">
                                    <img src="assets/images/products/small/product-1.jpg" width="74" height="74" alt="product" />
                                    <img src="assets/images/products/small/product-1-2.jpg" width="74" height="74" alt="product" />
                                </a>
                            </figure>

                            <div className="product-details">
                                <h3 className="product-title"> <a href="product.html">Ultimate 3D Bluetooth Speaker</a>
                                </h3>

                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style={{width: '100%'}}></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>

                                <div className="price-box">
                                    <span className="product-price">$49.00</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                        <h4 className="section-sub-title">Sản phẩm bán chạy nhất</h4>
                        <div className="product-default left-details product-widget">
                            <figure>
                                <a href="product.html">
                                    <img src="assets/images/products/small/product-4.jpg" width="74" height="74" alt="product" />
                                    <img src="assets/images/products/small/product-4-2.jpg" width="74" height="74" alt="product" />
                                </a>
                            </figure>

                            <div className="product-details">
                                <h3 className="product-title"> <a href="product.html">Blue Backpack for the Young - S</a>
                                </h3>

                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style={{width: '100%'}}></span>
                                        <span className="tooltiptext tooltip-top">5.00</span>
                                    </div>
                                </div>

                                <div className="price-box">
                                    <span className="product-price">$49.00</span>
                                </div>
                            </div>
                        </div>

                       
                    </div>

                    <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                        <h4 className="section-sub-title">Sản phẩm mới nhất</h4>
                        <div className="product-default left-details product-widget">
                            <figure>
                                <a href="product.html">
                                    <img src="assets/images/products/small/product-7.jpg" width="74" height="74" alt="product" />
                                    <img src="assets/images/products/small/product-7-2.jpg" width="74" height="74" alt="product" />
                                </a>
                            </figure>

                            <div className="product-details">
                                <h3 className="product-title"> <a href="product.html">Men Black Sports Shoes</a> </h3>

                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style={{width: '100%'}}></span>
                                        <span className="tooltiptext tooltip-top"></span>
                                    </div>
                                </div>

                                <div className="price-box">
                                    <span className="product-price">$49.00</span>
                                </div>
                            </div>
                        </div>
      
                    </div>

                    <div className="col-lg-3 col-sm-6 pb-5 pb-md-0">
                        <h4 className="section-sub-title">Sản phẩm được đánh giá cao nhất</h4>
                        <div className="product-default left-details product-widget">
                            <figure>
                                <a href="product.html">
                                    <img src="assets/images/products/small/product-10.jpg" width="74" height="74" alt="product" />
                                    <img src="assets/images/products/small/product-10-2.jpg" width="74" height="74" alt="product" />
                                </a>
                            </figure>

                            <div className="product-details">
                                <h3 className="product-title"> <a href="product.html">Basketball Sports Blue Shoes</a> </h3>

                                <div className="ratings-container">
                                    <div className="product-ratings">
                                        <span className="ratings" style={{width: '100%'}}></span>
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
        </main>
      
    </div>
   
    );
};

export default ProductDetail;