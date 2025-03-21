import { useState } from "react";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Drawer, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './index.scss'

const categories = ["Áo sơ mi", "Quần jean", "Giày dép", "Phụ kiện"];

const Header: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const menuCategories = (
    <Menu>
      {categories.map((category) => (
        <Menu.Item key={category}>
          <Link to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
            {category}
          </Link>
        </Menu.Item>
      ))}
    </Menu>
  );

  // Giả sử lấy số lượng sản phẩm từ state hoặc context
  const wishlistCount = 30;
  const cartCount = 5;
  const user = { name: "John Doe" }; // null nếu chưa đăng nhập
//   const user = null

  const userMenu = (
    <Menu>
      {user ? (
        <>
        <div className="user-info">
            {user?.name}
            </div>
          {/* <Menu.Item key="user" disabled> */}
            
          {/* </Menu.Item> */}
          <Menu.Item key="account" onClick={() => navigate("/my-account")}>My Account</Menu.Item>
          <Menu.Item key="logout" onClick={() => alert("Logged out!")}>Logout</Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" onClick={() => navigate("/login")}>Login</Menu.Item>
          <Menu.Item key="register" onClick={() => navigate("/register")}>Register</Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <header className="header-container bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          LOGO
        </Link>

        {/* Middle: Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Dropdown overlay={menuCategories} trigger={["hover"]}>
            <span className="hover:text-blue-500 cursor-pointer">Danh mục</span>
          </Dropdown>
          <Link to="/blog" className="hover:text-blue-500">Blog</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact Us</Link>
        </nav>

        {/* Right: Wishlist, Cart, User */}
        <div className="flex items-center gap-4">
          <Badge count={wishlistCount > 9 ? "9+" : wishlistCount} size="small">
            <HeartOutlined className="text-xl cursor-pointer" onClick={() => navigate("/wishlist")} />
          </Badge>
          <Badge count={cartCount > 9 ? "9+" : cartCount} size="small">
            <ShoppingCartOutlined className="text-xl cursor-pointer" onClick={() => navigate("/cart")} />
          </Badge>
          <Dropdown overlay={userMenu} trigger={["click"]} placement="bottomRight">
            <UserOutlined className="text-xl cursor-pointer hover:text-green-500" />
          </Dropdown>

          {/* Mobile Menu Button (Hidden on larger screens) */}
          <MenuOutlined className="text-xl cursor-pointer md:!hidden" onClick={() => setOpenDrawer(true)} />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} placement="left">
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="text-lg" onClick={() => setOpenDrawer(false)}>Home</Link>
          <Dropdown overlay={menuCategories} trigger={["click"]}>
            <span className="text-lg cursor-pointer" onClick={(e) => e.preventDefault()}>Danh mục</span>
          </Dropdown>
          <Link to="/blog" className="text-lg" onClick={() => setOpenDrawer(false)}>Blog</Link>
          <Link to="/contact" className="text-lg" onClick={() => setOpenDrawer(false)}>Contact Us</Link>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
