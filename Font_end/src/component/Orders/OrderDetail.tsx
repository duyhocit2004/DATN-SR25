import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../service/orders/orderService";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      return;
    }
    
    getOrderById(Number(id)).then((data) => {
      setOrder(data as any);
      setLoading(false); // Dừng loading sau khi lấy dữ liệu
    });
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!order) return <p className="text-red-500">Không tìm thấy đơn hàng!</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Chi Tiết Đơn Hàng {order.order_code}</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        <p><strong>Người đặt:</strong> {order.user_name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Số điện thoại:</strong> {order.phone_number}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Tổng tiền:</strong> {order.total_price.toLocaleString()} VND</p>
        <p><strong>Phí vận chuyển:</strong> {order.shipping_fee.toLocaleString()} VND</p>
        <p><strong>Trạng thái:</strong> <span className="text-blue-500">{order.status}</span></p>
        <h3 className="text-lg font-bold mt-4">Chi tiết sản phẩm:</h3>
        <ul>
          {order.cart && order.cart.length > 0 ? (
            order.cart.map((item: any, index: number) => (
              <li key={index}>{item.name} - {item.quantity} x {item.price.toLocaleString()} VND</li>
            ))
          ) : (
            <p>Không có sản phẩm trong đơn hàng.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetail;
