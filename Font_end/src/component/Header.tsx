import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="page-wrapper">
      <header className="header">
        {/* TOP */}
        <div className="header-top">
          <div className="container">
            <div className="header-left d-none d-sm-block">
              <p className="top-message text-uppercase">
                FREE Returns. Standard Shipping Orders $99+
              </p>
            </div>

            <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
              <div className="header-dropdown dropdown-expanded d-none d-lg-block">
                <a href="javascript:void(0);">Links</a>
                <div className="header-menu">
                  <ul>
                    <li><NavLink to="/my_account">My Account</NavLink></li>
                    {/* <li><NavLink to="/about">About Us</NavLink></li>
                    <li><NavLink to="/blog">Blog</NavLink></li>
                    <li><NavLink to="/wishlist">My Wishlist</NavLink></li>
                    <li><NavLink to="/cart">Cart</NavLink></li> */}
                    <li><NavLink to="/login" >Log In</NavLink></li>
                  </ul>
                </div>
              </div>

              <span className="separator"></span>

              <div className="header-dropdown">
                <a href="#"><i className="flag-us flag"></i>ENG</a>
                <div className="header-menu">
                  <ul>
                    <li><a href="#"><i className="flag-us flag mr-2"></i>ENG</a>
                    </li>
                    <li><a href="#"><i className="flag-fr flag mr-2"></i>FRA</a></li>
                  </ul>
                </div>
              </div>

              <div className="header-dropdown mr-auto mr-sm-3 mr-md-0">
                <a href="#">USD</a>
                <div className="header-menu">
                  <ul>
                    <li><a href="#">EUR</a></li>
                    <li><a href="#">USD</a></li>
                  </ul>
                </div>

              </div>

              <span className="separator"></span>

              <div className="social-icons">
                <a href="#" className="social-icon social-facebook icon-facebook" target="_blank"></a>
                <a href="#" className="social-icon social-twitter icon-twitter" target="_blank"></a>
                <a href="#" className="social-icon social-instagram icon-instagram" target="_blank"></a>
              </div>

            </div>
          </div>
        </div>
        {/* MID */}
        {/* <div className="header-middle sticky-header" data-sticky-options="{'mobile': true}">
          <div className="container">
            <div className="header-left col-lg-2 w-auto pl-0">
              <button className="mobile-menu-toggler text-primary mr-2" type="button">
                <i className="fas fa-bars"></i>
              </button>
              <NavLink to="/" className="logo">
                <img src="assets/images/logo.png" width="111" height="44" alt="Porto Logo" />
              </NavLink>
            </div>
            <div className="header-right w-lg-max">
                    <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
                        <a href="#" className="search-toggle" role="button"><i className="icon-search-3"></i></a>
                        <form action="#" method="get">
                            <div className="header-search-wrapper">
                                <input type="search" className="form-control" name="q" id="q" placeholder="Search..." required />
                                <div className="select-custom">
                                    <select id="cat" name="cat">
                                        <option value="">All Categories</option>
                                    </select> 
                                </div>
                                <button className="btn icon-magnifier p-0" title="search" type="submit"></button>
                            </div>
                        </form>
                    </div>
                                     <div className="header-contact d-none d-lg-flex pl-4 pr-4">
                        <img alt="phone" src="assets/images/phone.png" width="30" height="30" className="pb-1"/>
                        <h6><span>Call us now</span><a href="tel:#" className="text-dark font1">+123 5678 890</a></h6>
                    </div>
            <div className="header-right w-lg-max">
              <NavLink to="/login" className="header-icon" title="Login">
                <i className="icon-user-2"></i>
              </NavLink>

              <NavLink to="/wishlist" className="header-icon" title="Wishlist">
                <i className="icon-wishlist-2"></i>
              </NavLink>
            </div>
          </div>
        </div> */}
        <div className="header-middle sticky-header" data-sticky-options="{'mobile': true}">
          <div className="container">
            <div className="header-left col-lg-2 w-auto pl-0">
              <button className="mobile-menu-toggler text-primary mr-2" type="button">
                <i className="fas fa-bars"></i>
              </button>
              {/* <NavLink to="/" className="logo">
                <img src="assets/images/logo.png" width="111" height="44" alt="Porto Logo" />
              </NavLink> */}
              <a href="/" className="logo">
                <img src="assets/images/logo.png" width="111" height="44" alt="Porto Logo" />
              </a>
            </div>


            <div className="header-right w-lg-max">
              <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
                <a href="#" className="search-toggle" role="button"><i className="icon-search-3"></i></a>
                <form action="#" method="get">
                  <div className="header-search-wrapper">
                    <input type="search" className="form-control" name="q" id="q" placeholder="Search..." required />

                    <button className="btn icon-magnifier p-0" title="search" type="submit"></button>
                  </div>
                </form>
              </div>

              <div className="header-contact d-none d-lg-flex pl-4 pr-4">
                <img alt="phone" src="assets/images/phone.png" width="30" height="30" className="pb-1" />
                <h6><span>Liên hệ</span><a href="tel:#" className="text-dark font1">+0962139512</a></h6>
              </div>

              <NavLink to="/login" className="header-icon" title="Login">
                <i className="icon-user-2"></i>
              </NavLink>

              <NavLink to="/wishlist" className="header-icon" title="Wishlist">
                <i className="icon-wishlist-2"></i>
              </NavLink>

              <div className="dropdown cart-dropdown">
                <a href="/cart" title="Cart">
                  <i className="minicart-icon"></i>
                </a>


                {/* <div className="dropdown-menu mobile-cart">
                  <a href="#" title="Close (Esc)" className="btn-close">×</a>

                  <div className="dropdownmenu-wrapper custom-scrollbar">
                    <div className="dropdown-cart-header">Shopping Cart</div>

                    <div className="dropdown-cart-products">
                      <div className="product">
                        <div className="product-details">
                          <h4 className="product-title">
                            <a href="product.html">Ultimate 3D Bluetooth Speaker</a>
                          </h4>

                          <span className="cart-product-info">
                            <span className="cart-product-qty">1</span> × $99.00
                          </span>
                        </div>


                        <figure className="product-image-container">
                          <a href="product.html" className="product-image">
                            <img src="assets/images/products/product-1.jpg" alt="product" width="80" height="80" />
                          </a>

                          <a href="#" className="btn-remove" title="Remove Product"><span>×</span></a>
                        </figure>
                      </div>

                    </div>

                    <div className="dropdown-cart-total">
                      <span>SUBTOTAL:</span>

                      <span className="cart-total-price float-right">$134.00</span>
                    </div>

                    <div className="dropdown-cart-action">
                      <a href="cart.html" className="btn btn-gray btn-block view-cart">View
                        Cart</a>
                      <a href="checkout.html" className="btn btn-dark btn-block">Checkout</a>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>


        <div className="header-bottom sticky-header d-none d-lg-block" data-sticky-options="{'mobile': false}">
          <div className="container">
            <nav className="main-nav w-100">
              <ul className="menu">
                <li className="active">
                  <a href="/">Trang Chủ</a>
                </li>
                <li>
                  <a href="category">Categories</a>
                </li>
                <li>
                  <a href="products">Sản phẩm</a>

                </li>
                <li>
                  <a href="#">Pages</a>

                </li>
                <li><a href="blog.html">Blog</a></li>
                <li>
                  <a href="#">Elements</a>
                  <ul className="custom-scrollbar">

                    <li><a href="element-products.html">Products</a></li>
                    <li><a href="element-product-categories.html">Product Categories</a></li>
                  </ul>
                </li>
                <li><a href="contact.html">Contact Us</a></li>
                <li className="float-right"><a href="#" className="pl-5">Special Offer!</a></li>
              </ul>
            </nav>
          </div>
        </div>

      </header>
    </div>
  );
};

export default Header;
