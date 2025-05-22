import React from 'react';
import { List, Typography, Space, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useNavigate } from 'react-router-dom';

dayjs.extend(relativeTime);
dayjs.locale('vi');

interface NotificationItem {
  id: string;
  title: string;
  message?: string;
  type?: string;
  is_read?: boolean;
  link?: string;
  created_at: string;
  data?: {
    order_id?: string;
    order_code?: string;
  };
}

interface NotificationListProps {
  notifications: NotificationItem[];
  onViewDetail: (notification: NotificationItem) => void;
  onMarkAsRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onViewDetail,
  onMarkAsRead,
}) => {
  const navigate = useNavigate();

  const getStatusIcon = (type: string) => {
    // You can customize this based on your notification types
    switch (type) {
      case 'order_update':
        return '📦';
      case 'system':
        return '🔔';
      default:
        return '📢';
    }
  };

  const formatTime = (timestamp: string) => {
    return dayjs(timestamp).fromNow();
  };

  const handleNotificationClick = async (item: NotificationItem) => {
    try {
      // Đánh dấu thông báo đã đọc trước
      await onMarkAsRead(item.id);
      // Kiểm tra nếu là thông báo đơn hàng
      if (item.type === 'order_update' || item.type === 'new_order') {
        const orderCode = item.data?.order_code;
        if (orderCode) {
          // Điều hướng đến trang chi tiết đơn hàng sử dụng order_code
          setTimeout(() => navigate(`/admin/orders/${orderCode}`), 0);
          return;
        }
      }
      // Nếu không phải thông báo đơn hàng hoặc không tìm thấy order_code
      onViewDetail(item);
    } catch (error) {
      console.error('Error handling notification click:', error);
    }
  };

  return (
    <List
      className="notification-list"
      itemLayout="vertical"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          className={`notification-item ${!item.is_read ? 'unread' : ''}`}
          onClick={async () => await handleNotificationClick(item)}
        >
          <div className="notification-content">
            <Space align="start">
              <span className="notification-icon">{getStatusIcon(item.type || '')}</span>
              <div className="notification-details">
                <Typography.Title level={5} className="notification-title">
                  {item.title}
                </Typography.Title>
                <Typography.Paragraph className="notification-message">
                  {item.message}
                </Typography.Paragraph>
                <Space className="notification-meta">
                  <ClockCircleOutlined />
                  <span>{formatTime(item.created_at)}</span>
                  {(item.type === 'order_update' || item.type === 'new_order') && (
                    <Button
                      type="link"
                      onClick={async (e) => {
                        e.stopPropagation();
                        await handleNotificationClick(item);
                      }}
                    >
                      Xem Chi Tiết
                    </Button>
                  )}
                </Space>
              </div>
            </Space>
          </div>
        </List.Item>
      )}
    />
  );
};

export default NotificationList; 