import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { NotificationType } from "../../utils/constants";

interface ToastProps {
  type?: NoticeType;
  content: React.ReactNode;
  duration?: number;
}

const Toast = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const showToast = ({ type = NotificationType.INFO as NoticeType, content, duration }: ToastProps) => {
    messageApi.open({
      type,
      content,
      duration,
    });
  };

  return { contextHolder, showToast }; // 👈 Trả về cả contextHolder và hàm gọi toast
};

export default Toast;
