import orderApi from "@/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedOrder } from "@/store/reducers/orderSlice";
import { OrderStatusDataClient } from "@/utils/constantData";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Button, message, Modal, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderHistoryForm from './OrderHistoryForm';

const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const { selectedOrder } = useAppSelector((state) => state.order);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch(setSelectedOrder(null));
  };

  const showCancelConfirm = () => {
    console.log("showCancelConfirm được gọi");
    setIsConfirmModalOpen(true);
  };

  const handleCancelOrder = async () => {
    console.log("handleCancelOrder được gọi");
    try {
      if (!selectedOrder?.id) {
        message.error("Không tìm thấy mã đơn hàng.");
        return;
      }

      console.log("Gửi request hủy đơn hàng:", selectedOrder.id);
      const response = await orderApi.cancelOrderByClient({
        orderId: selectedOrder.id
      });
      
      console.log("Response từ API:", response);
      
      if (response.status === 200 || response.status === '200') {
        message.success("Đơn hàng đã được hủy thành công");
        setIsConfirmModalOpen(false);
        dispatch(setSelectedOrder(null));
        window.location.href = '/order-history';
      } else {
        message.error(response.message || "Hủy đơn hàng thất bại");
      }
    } catch (error: any) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      message.error(error.response?.data?.message || "Hủy đơn hàng thất bại");
    }
  };

  return (
    <>
      <Modal
        className="order-history-detail !w-4/5 lg:!w-[900px]"
        title={`Chi tiết đơn hàng`}
        open={!!selectedOrder}
        onCancel={handleClose}
        footer={
          selectedOrder &&
          ["Unconfirmed", "Confirmed"].includes(selectedOrder.status) ? (
            <Button danger onClick={showCancelConfirm}>
              Hủy đơn hàng
            </Button>
          ) : null
        }
      >
        {selectedOrder && (
          <div>
            <div className="order-info mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <p>
                <strong>Mã đơn hàng:</strong> {selectedOrder?.code}
              </p>
              <p>
                <strong>Ngày đặt hàng:</strong>{" "}
                {selectedOrder.createdAt
                  ? dayjs(selectedOrder.createdAt).format("DD/MM/YYYY")
                  : ""}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <Tag color={getColorOrderStatus(selectedOrder?.status)}>
                  {getLabelByValue(OrderStatusDataClient, selectedOrder?.status)}
                </Tag>
              </p>
            </div>

            {/*Thông tin người nhận hàng */}
            <h3 className="font-bold mt-10 mb-4">Thông tin người nhận hàng</h3>
            <div className="receiver-info grid grid-cols-1 gap-4 sm:grid-cols-2">
              <p>
                <strong>Họ và tên:</strong> {selectedOrder?.receiverName || "-"}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {selectedOrder?.receiverPhoneNumber || "-"}
              </p>
              <p>
                <strong>Địa chỉ:</strong> {selectedOrder?.receiverAddress || selectedOrder?.shippingAddress || selectedOrder?.address || "Không có địa chỉ"}
              </p>
            </div>

            {/* Thêm form lịch sử đơn hàng */}
            {selectedOrder.statusHistories && selectedOrder.statusHistories.length > 0 && (
              <OrderHistoryForm order={selectedOrder} />
            )}

            <h3 className="font-bold mt-10 mb-4">Danh sách sản phẩm:</h3>

            <div className="product-list overflow-auto">
              {selectedOrder.products.map((product, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-4 border-b pb-2 relative ${product.status === 'out_of_stock' ? 'opacity-50' : ''}`}
                >
                  {product.status === 'out_of_stock' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-gray-500 text-white px-4 py-2 rounded">Sản phẩm đã hết hàng</span>
                    </div>
                  )}
                  <div className="product-info flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-md shrink-0"
                    />
                    <div className="min-w-40">
                      <p className="font-semibold">{product.name}</p>
                      <p>
                        Size: {product.size} | Màu: {product.color}
                      </p>
                      <p>Số lượng: {product.quantity}</p>
                    </div>
                  </div>
                  <div className="min-w-24">
                    <p className="text-black-500 font-semibold">
                      Giá Gốc :  {product.priceRegular?.toLocaleString()} đ
                    </p>
                    <p className="text-red-500 font-semibold">
                      Giá Sale :  {product.priceSale?.toLocaleString()} đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="discount text-end mt-10">
              <span>Voucher Giảm : </span>
              <span className="text-red-500 font-semibold">
                {selectedOrder?.voucherPrice?.toLocaleString()} đ
              </span>
            </div>
            <div className="amount-total text-end mt-2">
              <span>Tổng tiền : </span>
              <span className="text-red-500 font-semibold">
                {selectedOrder?.totalPrice?.toLocaleString()} đ
              </span>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Xác nhận hủy đơn hàng"
        open={isConfirmModalOpen}
        onOk={handleCancelOrder}
        onCancel={() => setIsConfirmModalOpen(false)}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </>
  );
};

export default OrderDetail;
