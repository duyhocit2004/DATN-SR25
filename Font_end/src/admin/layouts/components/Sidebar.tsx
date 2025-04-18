import { Layout, Menu, MenuProps } from "antd";
import {
  BgColorsOutlined,
  ColumnWidthOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MoneyCollectOutlined,
  PicLeftOutlined,
  PieChartOutlined,
  ReadOutlined,
  StarOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const siderStyle: React.CSSProperties = {
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  // scrollbarGutter: "stable",
};
const menuStyle: React.CSSProperties = {
  overflow: "auto",
  height: "calc(100% - 64px)",
};

function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link to={"/admin"}>Trang chủ</Link>,
    "/admin/hi",
    <PieChartOutlined />
  ),
  getItem(
    <Link to={"/admin/products"}>Sản phẩm</Link>,
    "/admin/products",
    <DesktopOutlined />
  ),
  getItem(
    <Link to={"/admin/categories"}>Danh mục</Link>,
    "/admin/categories",
    <UnorderedListOutlined />
  ),
  getItem(
    <Link to={"/admin/accounts"}>Tài khoản</Link>,
    "/admin/accounts",
    <UserOutlined />
  ),
  getItem(
    <Link to={"/admin/orders"}>Đơn hàng</Link>,
    "/admin/orders",
    <ContainerOutlined />
  ),
  getItem(
    <Link to={"/admin/reviews"}>Đánh giá sản phẩm</Link>,
    "/admin/reviews",
    <StarOutlined />
  ),
  // getItem(
  //   <Link to={"/admin/posts"}>Bài viết</Link>,
  //   "/admin/posts",
  //   <ReadOutlined />
  // ),
  getItem(
    <Link to={"/admin/colors"}>Màu</Link>,
    "/admin/colors",
    <BgColorsOutlined />
  ),
  getItem(
    <Link to={"/admin/sizes"}>Kích thước</Link>,
    "/admin/sizes",
    <ColumnWidthOutlined />
  ),
  getItem(
    <Link to={"/admin/banners"}>Banner</Link>,
    "/admin/banners",
    <PicLeftOutlined />
  ),
  getItem(
    <Link to={"/admin/vouchers"}>Vouchers</Link>,
    "/admin/vouchers",
    <MoneyCollectOutlined />
  ),
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];

const Sidebar = () => {
  const location = useLocation(); // Lấy pathname hiện tại
  const [collapsed, setCollapsed] = useState(false);

  // Tự động chọn menu dựa vào route
  const selectedKey = items.find((item) =>
    location.pathname.startsWith(item?.key as string)
  )?.key;
  return (
    <Sider
      style={siderStyle}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="flex justify-center items-center h-20">
        <Link to="/admin">
          <img src="/images/logo/SKYLER.png" alt="Logo" className="h-23" />
        </Link>
      </div>

      <Menu
        style={menuStyle}
        theme="dark"
        selectedKeys={selectedKey ? [String(selectedKey)] : []}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};
export default Sidebar;
