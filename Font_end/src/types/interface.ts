import { Dayjs } from "dayjs";

export interface IProduct {
  id: number;
  name: string;
  image: string;
  listImage: string[];
  listColors: string[];
  listSizes: string[];
  priceRegular: number;
  priceSale: number;
  quantity: number | null;
  quantitySold: number | null;
  discount: number | null;
  categoriesId: number;
  views?: number;
  rate?: number;
  description?: string;
  content?: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface IProductNew {
  id: number;
  name: string;
  image: string;
  listImage: string[];
  listColors: string[];
  listSizes: string[];
  priceRegular: number;
  priceSale: number;
  quantity: number | null;
  quantitySold: number | null;
  discount: number | null;
  categoriesId: number;
  views?: number;
  rate?: number;
  description?: string;
  content?: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface ISize {
  id: number;
  size: string;
  description: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface IColor {
  id: number;
  code: string;
  description: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface ICategory {
  id: number;
  name: string;
  description: string;
  gender: string;
  parent_id: number;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface IListCategory {
  id: number;
  name: string;
  image: string;
  // description: string;
  // gender: string;
  // parent_id: number;
  hasChildren?: boolean;
  children: IListCategory[];
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface IBanner {
  id: number;
  image: string;
  status: boolean;
  type: string;
  link: string ;
  productId: string;
  created_at?: Dayjs;
  updated_at?: Dayjs;
}
export interface IAllBanner {
  [key: string]: IBanner[];
}
export interface ICartStorage {
  productId: number | undefined;
  color: string;
  size: string;
  quantity: number;
}
export interface ICart {
  id: number | null;
  product: IProductCartStorage | null;
  size: string;
  color: string;
  quantity: number;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface IProductCartStorage {
  id: number;
  size: string;
  color: string;
  name: string;
  image: string;
  priceRegular: number;
  priceSale: number;
  quantity: number;
}

export interface IWishlist {
  id: number | null;
  image: string;
  name: string;
  priceRegular: number;
  priceSale: number;
}

export interface IPagination {
  page: number;
  size: number;
}

export interface IResponseData<T> {
  status: string;
  data: T;
  messageKey: string;
  timestamp: number;
}
export interface IDataPaging<T> {
  [x: string]: any;
  data: T;
  total: number;
}

export interface IResponseSize {
  size: string;
  quantity: number | null;
}
export interface IResponseColor {
  color: string;
  quantity: number | null;
}

export interface IPost {
  id: number;
  image: string;
  title: string;
  description: string;
  content: string;
  status: string;
  createdAt?: Dayjs;
  createdBy?: string;
}

export interface IVoucher {
  id: number;
  code: string;
  voucherPrice: number;
  quantity: number;
  used: number;
  startDate: Date | string;
  endDate: Date | string;
  description?: string;
  status?: string;
  createdAt?: Dayjs;
  createdBy?: string;
}

export interface IAccount {
  id: number;
  name: string;
  image: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  gender: string;
  role: string;
  status: string;
  createdAt?: Dayjs;
  updatedAt?: Dayjs;
  deletedAt?: Dayjs;
}
export interface IResponseLogin {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresTime: number;
}

export interface IResponseRegister {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  expiresTime: number;
}

export interface IReview {
  id: number;
  productId: number;
  username: string;
  phoneNumber: string;
  avatar: string;
  createdAt: string;
  content: string;
  rate: number;
  children?: IReply[]; // Mỗi review có thể có một hoặc nhiều reply
}

export interface IReply {
  id: number;
  username: string;
  phoneNumber: string;
  avatar: string;
  createdAt: string;
  content: string;
}

export interface IOrder {
  [x: string]: any;
  id: number;
  code: string;
  phoneNumber: string | null;
  customerName: string;
  totalPrice: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  products: IProductOrder[];
  createdAt: string;
  shippingAddress: string | null;
  updatedAt: string;
  voucher: string;
  voucherPrice: number;
  deletedAt: null;
  email: string;
  note: string;
  orderTime: string;
  priceSale: number | null;
}
export interface IProductOrder {
  id: number;
  image: string;
  name: string;
  quantity: number;
  size: string;
  color: string;
  priceRegular: number;
  priceSale: number;
  quantitySold: number | null;
  discount: number | null;
  orderId: number;
}
export interface IResponseOrder {
  order: IOrder;
  vnpayUrl: string;
}

export interface IProductDetail {
  id: number;
  categoriesId: number[];
  categoriesName: string;
  name: string;
  image: string;
  priceRegular: number;
  priceSale: number | null;
  description: string;
  views: number;
  content: string;
  rate: number;
  quantity: number;
  quantitySold: number | null;
  discount: number | null;
  listImage: string[];
  variants: IVariant[];
}

export interface IVariant {
  id: number;
  productId: number;
  colorId: number;
  sizeId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  code: string | null;
}

export interface IDashboardStatistical {
  totalProduct: number;
  totalOrder: number;
  totalUser: number;
  totalRevenue: number;
}
export interface IDashboardChart {
  name: any;
  stt: number;
  order: number;
  revenue: number;
}
