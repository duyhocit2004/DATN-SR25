import React from 'react';
import { List, Typography, Space, Button } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('vi');

interface NotificationItem {
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

  return (
    <List
      className="notification-list"
      itemLayout="vertical"
      dataSource={notifications}
      renderItem={(item) => (
        <List.Item
          key={item.id}
          className={`notification-item ${item.status === 'unread' ? 'unread' : ''}`}
          onClick={() => onMarkAsRead(item.id)}
        >
          <div className="notification-content">
            <Space align="start">
              <span className="notification-icon">{getStatusIcon(item.type)}</span>
              <div className="notification-details">
                <Typography.Title level={5} className="notification-title">
                  {item.title}
                </Typography.Title>
                <Typography.Paragraph className="notification-message">
                  {item.content}
                </Typography.Paragraph>
                <Space className="notification-meta">
                  <ClockCircleOutlined />
                  <span>{formatTime(item.created_at)}</span>
                  {item.data.order_code && (
                    <Button
                      type="link"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetail(item);
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