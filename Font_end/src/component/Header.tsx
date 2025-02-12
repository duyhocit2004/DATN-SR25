import React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="header">
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
                  <li><NavLink to="/dashboard">My Account</NavLink></li>
                  <li><NavLink to="/about">About Us</NavLink></li>
                  <li><NavLink to="/blog">Blog</NavLink></li>
                  <li><NavLink to="/wishlist">My Wishlist</NavLink></li>
                  <li><NavLink to="/cart">Cart</NavLink></li>
                  <li><NavLink to="/login" className="login-link">Log In</NavLink></li>
                </ul>
              </div>
            </div>

            <span className="separator"></span>

            <div className="header-dropdown">
              <a href="javascript:void(0);">
                <i className="flag-us flag"></i> ENG
              </a>
              <div className="header-menu">
                <ul>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="flag-us flag mr-2"></i> ENG
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0);">
                      <i className="flag-fr flag mr-2"></i> FRA
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-middle sticky-header" data-sticky-options="{'mobile': true}">
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
            <NavLink to="/login" className="header-icon" title="Login">
              <i className="icon-user-2"></i>
            </NavLink>

            <NavLink to="/wishlist" className="header-icon" title="Wishlist">
              <i className="icon-wishlist-2"></i>
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
