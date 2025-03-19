import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../service/orders/orderService";
import '../css/oderDetail.css'

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      return;
    }

    const localOrder = localStorage.getItem(`order_${id}`);
    if (localOrder) {
      setOrder(JSON.parse(localOrder));
      setLoading(false);
      return;
    }

    getOrderById(Number(id))
      .then((data) => {
        if (data) {
          localStorage.setItem(`order_${id}`, JSON.stringify(data));
          setOrder(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (!order) return <p className="text-red-500">Không tìm thấy đơn hàng!</p>;

  return (
    <div className="container">
      <h2>Chi Tiết Đơn Hàng {order.order_code}</h2>
      <div className="order-card">
        <p><strong>Người đặt:</strong> {order.user_name}</p>
        <p><strong>Email:</strong> {order.email}</p>
        <p><strong>Số điện thoại:</strong> {order.phone_number}</p>
        <p><strong>Địa chỉ:</strong> {order.address}</p>
        <p><strong>Tổng tiền:</strong> <span className="price">{order.total_price.toLocaleString()} VND</span></p>
        <p><strong>Phí vận chuyển:</strong> <span className="price">{order.shipping_fee.toLocaleString()} VND</span></p>
        <p>
          <strong>Trạng thái:</strong>{" "}
          <span className={`order-status status-${order.status.toLowerCase()}`}>
            {order.status}
          </span>
        </p>

        <h3 className="text-lg font-bold mt-4">Chi tiết sản phẩm:</h3>
        <ul className="product-list">
          {order.cart && order.cart.length > 0 ? (
            order.cart.map((item: any, index: number) => (
              <li key={index}>
                {item.name} - {item.quantity} x <span className="price">{item.price.toLocaleString()} VND</span>
              </li>
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
