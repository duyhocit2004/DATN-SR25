import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaWikipediaW } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* ABOUT US */}
          <div>
            <h3 className="text-lg font-semibold mb-4">THÔNG TIN CỬA HÀNG </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Thông Tin
                </Link>
              </li>
              {/* <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Địa Chỉ 
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Liên Hệ 
                </Link>
              </li> */}
              <li>
                <Link to="/order-history" className="text-gray-400 hover:text-white">
                  Theo Dõi Đơn Hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* USEFUL LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SẢN PHẨM </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                Sản Phẩm Bán Chạy
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white">
                Sản Phẩm Mới
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-400 hover:text-white">
                Sản Phẩm Giảm Giá
                </Link>
              </li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div>
            <h3 className="text-lg font-semibold mb-4">THEO DÕI CHÚNG TÔI </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/caodangfptpolytechnic"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://www.youtube.com/@FPTPoly"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaYoutube size={20} />
              </a>
              <a
                href="https://vi.wikipedia.org/wiki/Tr%C6%B0%E1%BB%9Dng_Cao_%C4%91%E1%BA%B3ng_Th%E1%BB%B1c_h%C3%A0nh_FPT"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaWikipediaW size={20} />
              </a>

              <a
                href="https://www.tiktok.com/@fpt.polytechnic.official"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTiktok size={20} />
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
          © {new Date().getFullYear()} FPT POLYTECHNIC 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
