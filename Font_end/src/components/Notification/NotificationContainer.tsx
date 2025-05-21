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
  content: string;
  type: string;
  status: 'read' | 'unread';
  data: {
    order_id?: string;
    order_code?: string;
    old_status?: string;
    new_status?: string;
  };
  created_at: string;
}

const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    setupWebSocket();

    return () => {
      cleanupWebSocket();
    };
  }, []);

  const setupWebSocket = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      const userRole = user.role;

      if (!userId) {
        console.error('User ID not found');
        return;
      }

      // Subscribe to user's private channel
      echo.private(`user.${userId}`)
        .listen('NotificationCreated', (e: { notification: NotificationData }) => {
          console.log('Received notification on user channel:', e);
          setNotifications(prevNotifications => {
            const newNotifications = [e.notification, ...prevNotifications];
            return newNotifications.slice(0, 10);
          });
          message.info('Bạn có thông báo mới!');
        });

      // If user is admin, also subscribe to admin channel
      if (userRole === 'Admin') {
        echo.private('admin.notifications')
          .listen('NotificationCreated', (e: { notification: NotificationData }) => {
            console.log('Received notification on admin channel:', e);
            setNotifications(prevNotifications => {
              const newNotifications = [e.notification, ...prevNotifications];
              return newNotifications.slice(0, 10);
            });
            message.info('Bạn có thông báo mới!');
          });
      }
    } catch (error) {
      console.error('Error setting up WebSocket:', error);
    }
  };

  const cleanupWebSocket = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = user.id;
      const userRole = user.role;

      if (userId) {
        echo.leave(`user.${userId}`);
        if (userRole === 'Admin') {
          echo.leave('admin.notifications');
        }
      }
    } catch (error) {
      console.error('Error cleaning up WebSocket:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get('/api/notifications?limit=10&order=desc');
      if (response.status === 200) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      message.error('Không thể tải thông báo');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (notification: NotificationData) => {
    if (notification.type === 'order_update' || notification.type === 'new_order') {
      const orderCode = notification.data?.order_code;
      if (orderCode) {
        navigate(`/admin/orders/${orderCode}`);
        return;
      }
    }
    console.log('Viewing notification:', notification);
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await axiosClient.post(`/api/notifications/${id}/mark-as-read`);
      if (response.status === 200) {
        setNotifications(prevNotifications =>
          prevNotifications.map(notification =>
            notification.id === id
              ? { ...notification, status: 'read' }
              : notification
          )
        );
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      message.error('Không thể đánh dấu đã đọc');
    }
  };

  const handleViewAll = () => {
    navigate('/admin/notifications');
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className="notification-container">
      <NotificationList
        notifications={notifications.map(notification => ({
          id: notification.id,
          title: notification.title,
          message: notification.content,
          type: notification.type,
          is_read: notification.status === 'read',
          created_at: notification.created_at,
          data: notification.data
        }))}
        onViewDetail={handleViewDetail}
        onMarkAsRead={handleMarkAsRead}
      />
      {unreadCount > 0 && (
        <div className="notification-footer">
          <button onClick={handleViewAll}>
            Xem tất cả ({unreadCount} chưa đọc)
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationContainer; 