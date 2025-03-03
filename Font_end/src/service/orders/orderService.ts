export const getOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      resolve(storedOrders);
    }, 500);
  });
};

export const getOrderById = (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      const order = storedOrders.find((o: any) => o.id === id);
      resolve(order || null); // Nếu không tìm thấy, trả về null
    }, 500);
  });
};


export enum OrderStatus {
  PENDING = "Chờ xác nhận",
  CONFIRMED = "Đã xác nhận",
  SHIPPING = "Đang vận chuyển",
  DELIVERED = "Đã giao hàng",
  CANCELLED = "Đã hủy",
  RETURNED = "Trả hàng/Hoàn tiền",
}
