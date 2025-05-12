import { theme } from "antd";
import UserDropdown from "./components/UserDropdown";
import './Header.scss'
import { useEffect, useState } from 'react';
import NotificationDropdown from '@/components/Notification/NotificationDropdown';
// @ts-ignore
import Echo from 'laravel-echo';
// @ts-ignore
import Pusher from 'pusher-js';

const HeaderAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Khởi tạo Echo
    window.Pusher = Pusher;
    const echo = new Echo({
      broadcaster: 'pusher',
      key: '28fd8f5a2470ad573279',  
      cluster: 'ap1', 
      wsHost: window.location.hostname,
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });

    // Lắng nghe channel admin.new-order
    echo.private('admin.new-order')
      .listen('NewOrderCreated', (e: any) => {
        setNotifications(prev => [
          {
            id: Date.now().toString(),
            title: 'Đơn hàng mới',
            content: e.message,
            data: e.data,
            status: 'unread',
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
        setUnreadCount(count => count + 1);
      });

    return () => {
      echo.disconnect();
    };
  }, []);

  const handleViewDetail = (notification: any) => {
    if (notification.data && notification.data.id) {
      window.location.href = `/admin/orders`;
    } else {
      window.location.href = `/admin/orders`;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'read' } : n));
    setUnreadCount(count => (count > 0 ? count - 1 : 0));
  };

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
          <div className="flex items-center gap-2 2xsm:gap-3">
            {/* Chuông thông báo */}
            <NotificationDropdown
              notifications={notifications}
              unreadCount={unreadCount}
              onViewDetail={handleViewDetail}
              onMarkAsRead={handleMarkAsRead}
            />
          </div>
          {/* <!-- User Area --> */}
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};
export default HeaderAdmin;
