import React, { useEffect, useState } from 'react';
import { Spin, message } from 'antd';
import NotificationList from './NotificationList';
import './NotificationList.css';
import axiosClient from '@/configs/axiosClient';
import echo from '@/configs/echo';
import { useNavigate } from 'react-router-dom';

interface NotificationData {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  data: {
    order_id?: string;
    order_code?: string;
    old_status?: string;
    new_status?: string;
    note?: string;
  };
  created_at: string;
}

const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();

  const parseNotificationData = (n: any) => ({
    ...n,
    data: typeof n.data === 'string' ? JSON.parse(n.data) : n.data
  });

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get('/notifications');
      if (response.data.status === 200) {
        setNotifications(response.data.data.map(parseNotificationData));
      }
    } catch (error) {
      message.error('Không thể tải thông báo');
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const response = await axiosClient.get('/notifications/unread-count');
      if (response.data.status === 200) {
        setUnreadCount(response.data.data);
      }
    } catch (error) {}
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await axiosClient.post(`/notifications/${id}/mark-as-read`);
      if (response.data.status === 200) {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      message.error('Không thể đánh dấu đã đọc');
    }
  };

  const handleViewDetail = (notification: NotificationData) => {
    if (notification.type === 'new_order' || notification.type === 'order_update') {
      const orderCode = notification.data.order_code;
      if (orderCode) {
        navigate(`/admin/orders/${orderCode}`);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
    const userId = localStorage.getItem('user_id');
    if (!userId) return;
    const channel = echo.private(`notifications.${userId}`);
    channel.listen('new-notification', (data: { notification: NotificationData }) => {
      setNotifications(prev => {
        const noti = parseNotificationData(data.notification);
        if (prev.some(n => n.id === noti.id)) return prev;
        return [noti, ...prev];
      });
      setUnreadCount(prev => prev + 1);
      message.info('Bạn có thông báo mới');
    });
    return () => {
      channel.stopListening('new-notification');
    };
  }, []);

  if (loading) return <Spin size="large" />;

  return (
    <div className="notification-container">
      <NotificationList
        notifications={notifications}
        onViewDetail={handleViewDetail}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationContainer; 