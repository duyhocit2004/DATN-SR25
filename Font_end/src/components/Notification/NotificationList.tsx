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
      await onMarkAsRead(item.id);
      
      // Kiểm tra nếu là thông báo đơn hàng
      if (item.type === 'order_update' || item.type === 'new_order') {
        // Lấy order_code từ data hoặc từ message
        let orderCode = null;
        
        if (item.data?.order_code) {
          orderCode = item.data.order_code;
        } else if (item.message) {
          const match = item.message.match(/#([A-Z0-9]+)/);
          if (match) {
            orderCode = match[1];
          }
        }
        
        if (orderCode) {
          navigate(`/admin/orders/${orderCode}`);
          return;
        }
      }
      
      // Nếu không phải thông báo đơn hàng hoặc không tìm thấy order_code
      onViewDetail(item);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleViewDetail = (e: React.MouseEvent, item: NotificationItem) => {
    e.stopPropagation();
    
    if (item.type === 'order_update' || item.type === 'new_order') {
      let orderCode = null;
      
      if (item.data?.order_code) {
        orderCode = item.data.order_code;
      } else if (item.message) {
        const match = item.message.match(/#([A-Z0-9]+)/);
        if (match) {
          orderCode = match[1];
        }
      }
      
      if (orderCode) {
        navigate(`/admin/orders/${orderCode}`);
        return;
      }
    }
    
    onViewDetail(item);
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
          onClick={() => handleNotificationClick(item)}
        >
          <div className="notification-content">
            <Space align="start">
              <span className="notification-icon">{getStatusIcon(item.type)}</span>
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
                      onClick={(e) => handleViewDetail(e, item)}
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