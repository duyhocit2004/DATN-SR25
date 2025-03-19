import { NotificationType } from "@/utils/constants";
import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";

interface ToastProps {
  type?: NoticeType;
  content: React.ReactNode;
  duration?: number;
}
// Biến toàn cục để giữ instance của `messageApi`
let messageApi: any = null;

export const setupToast = () => {
  const [api, contextHolder] = message.useMessage();
  messageApi = api; // Gán API vào biến toàn cục

  console.log("✅ setupToast() đã được gọi, messageApi:", messageApi);

  return contextHolder; // Trả về contextHolder để sử dụng trong App.tsx
};

export const showToast = ({ type = NotificationType.INFO as NoticeType, content, duration }: ToastProps) => {
  if (!messageApi) {
    console.error("showToast chưa được khởi tạo! Hãy gọi setupToast() trong App.tsx");
    return;
  }
  messageApi.open({
    type,
    content,
    duration,
  });
};
