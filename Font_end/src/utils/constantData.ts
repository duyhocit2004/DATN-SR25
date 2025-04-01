import {
  BannerType,
  PersonType,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Role,
  ActiveStatusBoolean,
  Gender,
  ActiveStatus,
  ActiveStatusString,
} from "./constants";

export const OrderStatusDataAdmin = [
  {
    value: OrderStatus.UNCONFIRMED,
    label: "Chưa xác nhận",
  },
  {
    value: OrderStatus.CONFIRMED,
    label: "Đã xác nhận",
  },
  {
    value: OrderStatus.CANCEL_CONFIRM,
    label: "Hủy xác nhận đơn hàng",
  },
  {
    value: OrderStatus.PROCESSING,
    label: "Đang chuẩn bị hàng",
  },
  {
    value: OrderStatus.SHIPPING,
    label: "Đang vận chuyển",
  },
  {
    value: OrderStatus.DELIVERED,
    label: "Đã giao hàng",
  },
  {
    value: OrderStatus.CANCEL,
    label: "Đã hủy",
  },
];
export const OrderStatusDataClient = [
  {
    value: OrderStatus.UNCONFIRMED,
    label: "Chưa xác nhận",
  },
  {
    value: OrderStatus.CONFIRMED,
    label: "Đã xác nhận",
  },
  {
    value: OrderStatus.PROCESSING,
    label: "Đang chuẩn bị hàng",
  },
  {
    value: OrderStatus.SHIPPING,
    label: "Đang vận chuyển",
  },
  {
    value: OrderStatus.DELIVERED,
    label: "Đã giao hàng",
  },
  {
    value: OrderStatus.CANCEL,
    label: "Đã hủy",
  },
];

export const PaymentStatusData = [
  {
    value: PaymentStatus.UNPAID,
    label: "Chưa thanh toán",
  },
  {
    value: PaymentStatus.PAID,
    label: "Đã thanh toán",
  },
];
export const PaymentMethodData = [
  {
    value: PaymentMethod.COD,
    label: "Tiền mặt",
  },
  {
    value: PaymentMethod.ONLINE,
    label: "Online",
  },
];

export const BannerTypeData = [
  {
    value: BannerType.MAIN,
    label: "Chính",
  },
  {
    value: BannerType.ADVERTISEMENT,
    label: "Quảng cáo",
  },
];

export const PersonTypeData = [
  {
    value: PersonType.MEN,
    label: "Nam",
  },
  {
    value: PersonType.WOMEN,
    label: "Nữ",
  },
];
export const GenderData = [
  {
    value: Gender.MALE,
    label: "Nam",
  },
  {
    value: Gender.FEMALE,
    label: "Nữ",
  },
];

export const RoleData = [
  {
    value: Role.ADMIN,
    label: "Quản trị viên",
  },
  {
    value: Role.CLIENT,
    label: "Khách hàng",
  },
];
export const ActiveStatusData = [
  {
    value: ActiveStatus.ACTIVE,
    label: "Hoạt động",
  },
  {
    value: ActiveStatus.INACTIVE,
    label: "Khóa",
  },
];
export const ActiveStatusBooleanData = [
  {
    value: ActiveStatusBoolean.ACTIVE,
    label: "Hoạt động",
  },
  {
    value: ActiveStatusBoolean.INACTIVE,
    label: "Khóa",
  },
];
export const ActiveStatusStringData = [
  {
    value: ActiveStatusString.ACTIVE,
    label: "Hoạt động",
  },
  {
    value: ActiveStatusString.INACTIVE,
    label: "Khóa",
  },
];
