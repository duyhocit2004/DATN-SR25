import AdminLoginWrap from "@/admin/views/login/AdminLoginWrap";
import ForgotPassword from "@/client/views/auth/ForgotPassword";
import VNPayReturn from "@/client/views/payment/components/VNPayReturn";
import React from "react";

const Cart = React.lazy(() => import("@/client/views/cart"));
const Wishlist = React.lazy(() => import("@/client/views/wish-list"));
const Payment = React.lazy(() => import("@/client/views/payment"));
const OrderHistory = React.lazy(() => import("@/client/views/order-history"));
const Home = React.lazy(() => import("@/client/views/home"));
const ProductDetail = React.lazy(() => import("@/client/views/product/detail"));
const ProductList = React.lazy(() => import("@/client/views/product/list"));
const Login = React.lazy(() => import("@/client/views/auth/Login"));
const Register = React.lazy(() => import("@/client/views/auth/Register"));
const Contact = React.lazy(() => import("@/client/views/contact"));
const MyAccount = React.lazy(() => import("@/client/views/my-account"));

const AdminDashboard = React.lazy(() => import("@/admin/views/dashboard"));
const AdminListProduct = React.lazy(
  () => import("@/admin/views/products/index")
);
const AdminProductDetail = React.lazy(
  () => import("@/admin/views/products/detail")
);
const AdminProductCreate = React.lazy(
  () => import("@/admin/views/products/create")
);
const AdminProductUpdate = React.lazy(
  () => import("@/admin/views/products/update")
);
const AdminListCategory = React.lazy(() => import("@/admin/views/categories"));
// const AdminCreateCategory = React.lazy(
//   () => import("@/admin/views/categories/create")
// );
// const AdminUpdateCategory = React.lazy(
//   () => import("@/admin/views/categories/")
// );
const AdminListReview = React.lazy(() => import("@/admin/views/reviews"));
const AdminReviewDetail = React.lazy(
  () => import("@/admin/views/reviews/detail")
);
const AdminListOrder = React.lazy(() => import("@/admin/views/orders"));
const AdminOrderDetail = React.lazy(
  () => import("@/admin/views/orders/detail")
);
const AdminListColor = React.lazy(() => import("@/admin/views/colors"));
const AdminListSize = React.lazy(() => import("@/admin/views/sizes"));
const AdminListBanner = React.lazy(() => import("@/admin/views/banners"));
const AdminListVoucher = React.lazy(() => import("@/admin/views/vouchers"));

const AdminListPost = React.lazy(() => import("@/admin/views/posts"));
const AdminListAccount = React.lazy(() => import("@/admin/views/accounts"));
const AdminAccountUpdate = React.lazy(
  () => import("@/admin/views/accounts/update")
);
const AdminCreatePost = React.lazy(() => import("@/admin/views/posts/create"));
const NotFound = React.lazy(() => import("@/pages/NotFound"));

export const clientRoutes = [
  { path: "/", exact: true, name: "Client", element: Home },
  {
    path: "/products",
    name: "ProductList",
    element: ProductList,
  },
  {
    path: "/products/:productId",
    name: "ProductDetail",
    element: ProductDetail,
  },
  { path: "/vnpay-return", name: "VNPayReturn", element: VNPayReturn },
  { path: "/cart", name: "Cart", element: Cart },
  { path: "/wishlist", name: "Wishlist", element: Wishlist },
  { path: "/payment", name: "Payment", element: Payment },
  { path: "/order-history", name: "OrderHistory", element: OrderHistory },
  { path: "/login", name: "Login", element: Login },
  { path: "/register", name: "Register", element: Register },
  { path: "/forgot-password", name: "ForgotPassưord", element: ForgotPassword },
  { path: "/contact", name: "Contact", element: Contact },
  { path: "/my-account", name: "MyAccount", element: MyAccount },
  {
    path: "/*",
    name: "NotFound",
    element: NotFound,
  },
];
export const adminRoutes = [
  { path: "/admin", name: "AdminDashboard", element: AdminDashboard },
  {
    path: "/admin/products",
    name: "AdminListProduct",
    element: AdminListProduct,
  },
  {
    path: "/admin/products/:productId",
    name: "AdminProductDetail",
    element: AdminProductDetail,
  },
  {
    path: "/admin/products/create",
    name: "AdminProductCreate",
    element: AdminProductCreate,
  },
  {
    path: "/admin/products/update/:productId",
    name: "AdminProductUpdate",
    element: AdminProductUpdate,
  },
  {
    path: "/admin/categories",
    name: "AdminListCategory",
    element: AdminListCategory,
  },
  // {
  //   path: "/admin/categories/create",
  //   name: "AdminCreateCategory",
  //   element: AdminCreateCategory,
  // },
  // {
  //   path: "/admin/categories/update/:categoryId",
  //   name: "AdminUpdateCategory",
  //   element: AdminUpdateCategory,
  // },
  {
    path: "/admin/reviews",
    name: "AdminListReview",
    element: AdminListReview,
  },
  {
    path: "/admin/reviews/:reviewId",
    name: "AdminReviewDetail",
    element: AdminReviewDetail,
  },
  {
    path: "/admin/posts",
    name: "AdminListPost",
    element: AdminListPost,
  },
  {
    path: "/admin/posts/create",
    name: "AdminCreatePost",
    element: AdminCreatePost,
  },
  {
    path: "/admin/colors",
    name: "AdminListColor",
    element: AdminListColor,
  },
  {
    path: "/admin/sizes",
    name: "AdminListSize",
    element: AdminListSize,
  },
  {
    path: "/admin/banners",
    name: "AdminListBanner",
    element: AdminListBanner,
  },
  {
    path: "/admin/vouchers",
    name: "AdminListVoucher",
    element: AdminListVoucher,
  },
  {
    path: "/admin/accounts",
    name: "AdminListAccount",
    element: AdminListAccount,
  },
  {
    path: "/admin/accounts/:email",
    name: "AdminAccountUpdate",
    element: AdminAccountUpdate,
  },
  {
    path: "/admin/reviews/:reviewId",
    name: "AdminReviewDetail",
    element: AdminReviewDetail,
  },
  {
    path: "/admin/orders",
    name: "AdminListOrder",
    element: AdminListOrder,
  },
  {
    path: "/admin/orders/:orderCode",
    name: "AdminOrderDetail",
    element: AdminOrderDetail,
  },
  {
    path: "/admin/*",
    name: "NotFound",
    element: NotFound,
  },
];

export const adminLoginRoutes = [
  { path: "/admin-login", name: "AdminLogin", element: AdminLoginWrap },
];
