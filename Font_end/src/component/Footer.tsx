import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="footer bg-dark">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Contact Info</h4>
                                <ul className="contact-info">
                                    <li>
                                        <span className="contact-info-label">Address:</span>
                                        123 Street Name, City, England
                                    </li>
                                    <li>
                                        <span className="contact-info-label">Phone:</span>
                                        <a href="tel:+1234567890">(123) 456-7890</a>
                                    </li>
                                    <li>
                                        <span className="contact-info-label">Email:</span>
                                        <a href="mailto:info@example.com">info@example.com</a>
                                    </li>
                                    <li>
                                        <span className="contact-info-label">Working Days/Hours:</span>
                                        Mon - Sun / 9:00 AM - 8:00 PM
                                    </li>
                                </ul>
                                <div className="social-icons">
                                    <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook" aria-label="Facebook"></a>
                                    <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter" aria-label="Twitter"></a>
                                    <a href="#" className="social-icon social-instagram icon-instagram" target="_blank" title="Instagram" aria-label="Instagram"></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Customer Service</h4>
                                <ul className="links">
                                    <li><a href="#">Help & FAQs</a></li>
                                    <li><a href="#">Order Tracking</a></li>
                                    <li><a href="#">Shipping & Delivery</a></li>
                                    <li><a href="#">Orders History</a></li>
                                    <li><a href="#">Advanced Search</a></li>
                                    <li><a href="#">My Account</a></li>
                                    <li><a href="#">Careers</a></li>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Corporate Sales</a></li>
                                    <li><a href="#">Privacy</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Popular Tags</h4>
                                <div className="tagcloud">
                                    <a href="#">Bag</a>
                                    <a href="#">Black</a>
                                    <a href="#">Blue</a>
                                    <a href="#">Clothes</a>
                                    <a href="#">Fashion</a>
                                    <a href="#">Hub</a>
                                    <a href="#">Shirt</a>
                                    <a href="#">Shoes</a>
                                    <a href="#">Skirt</a>
                                    <a href="#">Sports</a>
                                    <a href="#">Sweater</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="widget widget-newsletter">
                                <h4 className="widget-title">Subscribe Newsletter</h4>
                                <p>Get all the latest information on events, sales, and offers. Sign up for our newsletter:</p>
                                <form action="#" className="mb-0">
                                    <input type="email" className="form-control mb-3" placeholder="Email address" required />
                                    <button type="submit" className="btn btn-primary shadow-none">Subscribe</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="footer-bottom">
                    <div className="container d-sm-flex align-items-center">
                        <div className="footer-left">
                            <span className="footer-copyright">© Porto eCommerce. 2021. All Rights Reserved</span>
                        </div>

                        <div className="footer-right ml-auto mt-1 mt-sm-0">
                            <div className="payment-icons">
                                <span
                                    className="payment-icon visa"
                                    style={{ backgroundImage: 'url(assets/images/payments/payment-visa.svg)' }}
                                    aria-label="Visa"
                                ></span>
                                <span
                                    className="payment-icon paypal"
                                    style={{ backgroundImage: 'url(assets/images/payments/payment-paypal.svg)' }}
                                    aria-label="PayPal"
                                ></span>
                                <span
                                    className="payment-icon stripe"
                                    style={{ backgroundImage: 'url(assets/images/payments/payment-stripe.png)' }}
                                    aria-label="Stripe"
                                ></span>
                                <span
                                    className="payment-icon verisign"
                                    style={{ backgroundImage: 'url(assets/images/payments/payment-verisign.svg)' }}
                                    aria-label="Verisign"
                                ></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
