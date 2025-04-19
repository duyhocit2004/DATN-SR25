import { useEffect, useState } from "react";
import {
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HeartOutlined,
  AuditOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Drawer, Badge, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./index.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { dispatchAction } from "@/store/actionHelper";
import homeApi from "@/api/homeApi";
import { HttpCodeString } from "@/utils/constants";
import { IListCategory } from "@/types/interface";
import CategoryPopover, { IDataItem } from "@/components/category-popover";
import { useAuth } from "@/context/AuthContext";
import cartApi from "@/api/cartApi";
import productApi from "@/api/productApi";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlistCount = useAppSelector((state) => state.wishlist.count);
  const cartCount = useAppSelector((state) => state.cart.count);
  const { user, token, logout } = useAuth();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState<IListCategory[]>([]);

  useEffect(() => {
    getCartInfo();
    getWishList();
    getTreeCategories();
  }, [token]);

  //   const user = null

  const handleLogout = () => {
    //call api logout
    logout();
    navigate("/");
  };

  const getCartInfo = async () => {
    try {
      if (token) {
        //callapi get
        const response = await cartApi.getCartByUserId();
        if (response.status === HttpCodeString.SUCCESS) {
          dispatch(dispatchAction("cart/setCartCount", response.data?.length));
        }
      } else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = [...cart];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(dispatchAction("cart/setCartCount", updatedCart?.length));
      }
    } catch {
      dispatch(dispatchAction("cart/setCartCount", 0));
    }
  };
  const getWishList = async () => {
    try {
      if (token) {
        //callapi get
        const response = await productApi.getWishListByUserId();
        if (response.status === HttpCodeString.SUCCESS) {
          dispatch(
            dispatchAction("wishlist/setWishlistCount", response.data?.length)
          );
          dispatch(
            dispatchAction("wishlist/setListWishlist", response.data || [])
          );
        }
      } else {
        const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const updatedWishlist = [...wishlist];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        dispatch(
          dispatchAction("wishlist/setWishlistCount", updatedWishlist?.length)
        );
        dispatch(
          dispatchAction("wishlist/setListWishlist", updatedWishlist || [])
        );
      }
    } catch {
      dispatch(dispatchAction("wishlist/setWishlistCount", 0));
    }
  };

  const userMenu = (
    <Menu>
      {user ? (
        <>
          <div className="user-info">{user?.name}</div>
          {/* <Menu.Item key="user" disabled> */}

          {/* </Menu.Item> */}
          <Menu.Item key="account" onClick={() => navigate("/my-account")}>
            Tài Khoản
          </Menu.Item>
          <Menu.Item key="logout" onClick={() => handleLogout()}>
            Đăng Xuất
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="login" onClick={() => navigate("/login")}>
            Đăng Nhập
          </Menu.Item>
          <Menu.Item key="register" onClick={() => navigate("/register")}>
            Đăng Kí
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  const getTreeCategories = async () => {
    try {
      const response = await homeApi.getAllCategories();
      if (response?.status === HttpCodeString.SUCCESS) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch {
      setCategories([]);
    }
  };

  const handleNavigateToProducts = (values: IDataItem[]) => {
    navigate(
      "products" +
      (values?.length > 0
        ? "?categoryId=" + values[values?.length - 1]?.id
        : "")
    );
  };

  return (
    <header className="header-container bg-white shadow-md fixed top-0 left-0 w-full z-[1031]">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left: Logo */}
        <Link to="/">
          <img src="public/images/logo/SKY.png" alt="Logo" className="h-25" />
        </Link>

        {/* Middle: Navigation (Hidden on small screens) */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-blue-500">
            Trang Chủ
          </Link>
          {/* <Dropdown overlay={menuCategories} trigger={["hover"]}>
            <span className="hover:text-blue-500 cursor-pointer">Danh mục</span>
          </Dropdown> */}

          <CategoryPopover
            dataItems={categories}
            onChange={(values) => {
              handleNavigateToProducts(values);
            }}
          />
          {/* <Link to="/blog" className="hover:text-blue-500">
            Blog
          </Link> */}
          <Link to="/products" className="hover:text-blue-500">
            Sản phẩm
          </Link>
          <Link to="/contact" className="hover:text-blue-500">
            Liên Hệ
          </Link>
        </nav>

        {/* Right: Wishlist, Cart, User */}
        <div className="flex items-center gap-4">
          <Tooltip title="Đơn hàng">
            <AuditOutlined
              className="text-xl cursor-pointer"
              onClick={() => navigate("/order-history")}
            />
          </Tooltip>
          <Badge count={wishlistCount > 9 ? "9+" : wishlistCount} size="small">
            <Tooltip title="Sản phẩm yêu thích">
              <HeartOutlined
                className="text-xl cursor-pointer"
                onClick={() => navigate("/wishlist")}
              />
            </Tooltip>
          </Badge>
          <Badge count={cartCount > 9 ? "9+" : cartCount} size="small">
            <Tooltip title="Giỏ hàng">
              <ShoppingCartOutlined
                className="text-xl cursor-pointer"
                onClick={() => navigate("/cart")}
              />
            </Tooltip>
          </Badge>
          <Dropdown
            overlay={userMenu}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Tooltip title="Tài khoản">
              <UserOutlined className="text-xl cursor-pointer hover:text-green-500" />
            </Tooltip>
          </Dropdown>

          {/* Mobile Menu Button (Hidden on larger screens) */}
          <MenuOutlined
            className="text-xl cursor-pointer md:!hidden"
            onClick={() => setOpenDrawer(true)}
          />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        placement="left"
      >
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="text-lg" onClick={() => setOpenDrawer(false)}>
            Home
          </Link>
          <CategoryPopover
            dataItems={categories}
            isMobile={true}
            onChange={(values) => {
              handleNavigateToProducts(values);
            }}
          />
          {/* <Link
            to="/blog"
            className="text-lg"
            onClick={() => setOpenDrawer(false)}
          >
            Blog
          </Link> */}
          <Link to="/products" className="text-lg">
            Sản phẩm
          </Link>
          <Link
            to="/contact"
            className="text-lg"
            onClick={() => setOpenDrawer(false)}
          >
            Thông Tin Liên Hệ
          </Link>
        </nav>
      </Drawer>
    </header>
  );
};

export default Header;
