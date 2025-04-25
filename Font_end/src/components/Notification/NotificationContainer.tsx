import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import NotificationList from './NotificationList';
import './NotificationList.css';
import axiosClient from '@/configs/axiosClient';

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

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axiosClient.get('/notifications');
      if (response.status === 200) {
        setNotifications(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = (notification: NotificationData) => {
    if (notification.data.order_id) {
      // Navigate to order detail page
      window.location.href = `/orders/${notification.data.order_id}`;
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await axiosClient.post(`/notifications/${id}/mark-as-read`);
      if (response.status === 200) {
        // Update the notification status in the local state
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
    }
  };

  const handleViewAll = () => {
    // Navigate to notifications page
    window.location.href = '/notifications';
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
        notifications={notifications}
        onViewDetail={handleViewDetail}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default NotificationContainer; 