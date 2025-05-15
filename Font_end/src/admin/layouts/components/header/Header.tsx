import { theme } from "antd";
import UserDropdown from "./components/UserDropdown";
import './Header.scss'
import { useEffect, useState } from 'react';
import NotificationDropdown from '@/components/Notification/NotificationDropdown';
// @ts-ignore
import Echo from 'laravel-echo';
// @ts-ignore
import Pusher from 'pusher-js';
import { jwtDecode } from "jwt-decode";
import axiosClient from '@/configs/axiosClient';
import adminApi from '@/api/adminApi';
import { HttpCodeString } from '@/utils/constants';
import { message } from 'antd';

declare global {
  interface Window {
    Pusher: any;
  }
}

const HeaderAdmin = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Đặt fetchNotifications ở ngoài useEffect để có thể gọi lại
  const fetchNotifications = async () => {
    try {
      const response = await adminApi.getAllNotifications();
      if (response?.status === 200 || response?.status === "200") {
        const notifications = (response.data || []).map((n: any) => ({
          ...n,
          is_read: n.isRead,
          created_at: n.createdAt,
          updated_at: n.updatedAt,
        }));
        setNotifications(notifications);
        setUnreadCount(notifications.filter((n: any) => n.is_read === false || n.status === 'unread').length);
      } else {
        message.error('Không thể tải thông báo');
      }
    } catch (error) {
      message.error('Không thể tải thông báo');
    }
  };

  useEffect(() => {
    window.Pusher = Pusher;
    const token = localStorage.getItem('token');
    const echo = new Echo({
      broadcaster: 'pusher',
      key: '28fd8f5a2470ad573279',  
      cluster: 'ap1', 
      wsHost: window.location.hostname,
      authEndpoint: import.meta.env.VITE_PUSHER_APP_AUTH_ENDPOINT || 'http://localhost:8000/broadcasting/auth',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
      auth: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    });

    // Lấy userId từ token
    type DecodedUser = { id: number };
    const user = token ? jwtDecode(token) as DecodedUser : null;
    const userId = user?.id;

    // Gọi API lấy danh sách notification qua service
    fetchNotifications();

    // Lắng nghe channel notification cá nhân
    if (userId) {
      echo.private(`notifications.${userId}`)
        .listen('new-notification', (data: any) => {
          setNotifications(prev => [data.notification, ...prev]);
          setUnreadCount(count => count + 1);
        });
    }

    // Lắng nghe channel admin.new-order (nếu cần)
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

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await adminApi.markNotificationAsRead(id);
      if (response?.status === 200 || response?.status === "200") {
        fetchNotifications();
      } else {
        message.error('Không thể đánh dấu đã đọc');
      }
    } catch (error) {
      message.error('Không thể đánh dấu đã đọc');
    }
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
