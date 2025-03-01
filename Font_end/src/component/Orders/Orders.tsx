import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../service/orders/orderService";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getOrders().then((data) => setOrders(data as any[]));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Danh Sách Đơn Hàng</h2>
      <div className="bg-white p-4 shadow-md rounded-lg">
        {orders.length === 0 ? (
          <p>Không có đơn hàng nào.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="border-b py-2 flex justify-between">
              <p>{order.order_code} - <span className="text-blue-500">{order.status}</span></p>
              <Link to={`/orders/${order.id}`} className="text-green-500">Xem chi tiết</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
