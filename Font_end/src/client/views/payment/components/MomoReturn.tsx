import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showToast } from "@/components/toast";

const MomoReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const resultCode = searchParams.get("resultCode");
    const transId = searchParams.get("transId");

    if (resultCode === "0") {
      showToast({
        content: `Thanh toán thành công! Mã giao dịch: ${transId}`,
        duration: 5,
        type: "success",
      });
      navigate("/order-history");
    } else {
      showToast({
        content: "Thanh toán thất bại! Vui lòng thử lại.",
        duration: 5,
        type: "error",
      });
      navigate("/cart");
    }
  }, [searchParams, navigate]);

  return <div>Đang xử lý thanh toán...</div>;
};

export default MomoReturn; 