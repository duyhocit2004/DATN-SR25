import React from 'react';
import { Modal } from 'antd';
import { NotificationContainer } from './index';

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      title="Thông Báo"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
      bodyStyle={{ padding: 0, maxHeight: '70vh', overflow: 'auto' }}
    >
      <NotificationContainer />
    </Modal>
  );
};

export default NotificationModal; 