
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSelectedOrder } from "@/store/reducers/orderSlice";
import { OrderStatusDataClient } from "@/utils/constantData";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Modal, Tag } from "antd";
import dayjs from "dayjs";

const OrderDetail = () => {
  const dispatch = useAppDispatch();
  const { selectedOrder } = useAppSelector((state) => state.order);
  const handleClose = () => {
    dispatch(setSelectedOrder(null));
  };
  return (
    <Modal
      className="order-history-detail !w-4/5 lg:!w-[900px]"
      title={`Chi tiết đơn hàng`}
      open={!!selectedOrder}
      onCancel={handleClose}
      footer={false}
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

          {/* Thông tin người đặt hàng */}
          <h3 className="font-bold mt-10 mb-4">Thông tin người đặt hàng</h3>
          <div className="customer-info grid grid-cols-1 gap-4 sm:grid-cols-2">
            <p>
              <strong>Họ và tên:</strong> {selectedOrder?.customerName || "-"}
            </p>
            <p>
              <strong>Số điện thoại:</strong> {selectedOrder?.phoneNumber || "-"}
            </p>
            <p>
              <strong>Địa chỉ:</strong> {selectedOrder?.shippingAddress || "-"}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder?.email || "-"}
            </p>
          </div>

          {/*Thông tin người nhận hàng */}
          {selectedOrder?.receiverName && (
            <>
              <h3 className="font-bold mt-10 mb-4">Thông tin người nhận hàng</h3>
              <div className="receiver-info grid grid-cols-1 gap-4 sm:grid-cols-2">
                <p>
                  <strong>Họ và tên:</strong> {selectedOrder?.receiverName || "-"}
                </p>
                <p>
                  <strong>Số điện thoại:</strong> {selectedOrder?.receiverPhoneNumber || "-"}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {selectedOrder?.receiverAddress || "-"}
                </p>
              </div>
            </>
          )}

          <h3 className="font-bold mt-10 mb-4">Danh sách sản phẩm:</h3>

          <div className="product-list overflow-auto">
            {selectedOrder.products.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 border-b pb-2"
              >
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
                    Giá :  {product.priceRegular?.toLocaleString()} đ
                  </p>
                  <p className="text-red-500 font-semibold">
                    Giá Sale :  {product.priceSale?.toLocaleString()} đ
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="discount text-end mt-10">
            <span>Giảm: </span>
            <span className="text-red-500 font-semibold">
              {selectedOrder?.voucherPrice?.toLocaleString()} đ
            </span>
          </div>
          <div className="amount-total text-end mt-2">
            <span>Tổng tiền: </span>
            <span className="text-red-500 font-semibold">
              {selectedOrder?.totalPrice?.toLocaleString()} đ
            </span>
          </div>
        </div>
      )}
    </Modal>
  );
};
export default OrderDetail;
