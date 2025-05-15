import React, { useState } from 'react';
import { Badge, Dropdown, Space, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import NotificationList from './NotificationList';
import './NotificationList.css';

interface NotificationDropdownProps {
  notifications: any[];
  unreadCount: number;
  onViewDetail: (notification: any) => void;
  onMarkAsRead: (id: string) => void;
  onViewAll?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  unreadCount,
  onViewDetail,
  onMarkAsRead,
  onViewAll
}) => {
  const [open, setOpen] = useState(false);

  const dropdownContent = (
    <div className="notification-dropdown-content">
      <div className="notification-header">
        <Typography.Text strong>Thông Báo</Typography.Text>
        {onViewAll && (
          <Typography.Link onClick={onViewAll} className="view-all-link">
            Xem tất cả
          </Typography.Link>
        )}
      </div>
      <div className="notification-body">
        <NotificationList
          notifications={notifications}
          onViewDetail={(notification) => {
            onViewDetail(notification);
            setOpen(false);
          }}
          onMarkAsRead={(id) => {
            onMarkAsRead(id);
            setOpen(false);
          }}
        />
      </div>
    </div>
  );

  return (
    <Dropdown
      overlay={dropdownContent}
      trigger={['click']}
      open={open}
      onOpenChange={setOpen}
      overlayClassName="notification-dropdown"
    >
      <div className="notification-trigger" onClick={e => e.preventDefault()}>
        <Badge count={unreadCount} offset={[-2, 4]}>
          <BellOutlined className="notification-icon" />
        </Badge>
      </div>
    </Dropdown>
  );
};

export default NotificationDropdown; 