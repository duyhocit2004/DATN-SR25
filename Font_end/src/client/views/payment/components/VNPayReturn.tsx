import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "@/components/toast";

const VNPayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const responseCode = searchParams.get("vnp_ResponseCode");
    const transactionNo = searchParams.get("vnp_TransactionNo");

    if (responseCode === "00") {
      showToast({
        content: `Thanh toán thành công! Mã giao dịch: ${transactionNo}`,
        duration: 5,
        type: "success",
      });
      navigate("/"); // Chuyển hướng về trang chủ hoặc trang cần thiết
    } else {
      showToast({
        content: "Thanh toán thất bại! Vui lòng thử lại.",
        duration: 5,
        type: "error",
      });
      navigate("/cart"); // Quay về trang giỏ hàng
    }
  }, [searchParams, navigate]);

  return <div>Đang xử lý thanh toán...</div>;
};

export default VNPayReturn;
