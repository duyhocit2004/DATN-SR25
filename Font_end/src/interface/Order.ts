import { OrderStatus } from "../service/orders/orderStatus";


export interface Order {
  id: number;
  user_id: number;
  order_code: string;
  shipping_fee: number;
  shipper_id?: number;
  voucher_id?: number;
  date: string;
  user_name: string;
  email: string;
  phone_number: string;
  total_price: number;
  address: string;
  note?: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
}
