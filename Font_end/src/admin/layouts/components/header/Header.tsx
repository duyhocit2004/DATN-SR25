import { theme } from "antd";
import UserDropdown from "./components/UserDropdown";
import './Header.scss'

const HeaderAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div className="header-contaier">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div></div>
        <div
          className={`${
            "flex"
            // isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
        >
          {/* <div className="flex items-center gap-2 2xsm:gap-3">
            {/* <!-- Dark Mode Toggler --> */}
          {/* <ThemeToggleButton /> */}
          {/* <!-- Dark Mode Toggler --> */}
          {/* <NotificationDropdown /> */}
          {/* <!-- Notification Menu Area --> */}
          {/* </div> */}
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};
export default HeaderAdmin;
