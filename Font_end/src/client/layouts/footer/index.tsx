import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* ABOUT US */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/store-location" className="text-gray-400 hover:text-white">
                  Store location
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/order-tracking" className="text-gray-400 hover:text-white">
                  Orders tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">USEFUL LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/support-policy" className="text-gray-400 hover:text-white">
                  Support Policy
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white">
                  Size guide
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="text-lg font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* SUBSCRIBE */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SUBSCRIBE</h3>
            <p className="text-gray-400 mb-3">
              Get E-mail updates about our latest shop and special offers.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full p-2 rounded-l bg-gray-800 text-white border border-gray-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-500 rounded-r hover:bg-red-600 transition"
              >
                SUBSCRIBE
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} Flone. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
