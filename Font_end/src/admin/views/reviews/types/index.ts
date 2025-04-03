export interface IResponseReview {
  id: string;
  content: string;
  parentId: number | null;
  phoneNumber: string;
  productId: number;
  productName: string;
  rate: number;
}

export interface IReply {
  id: string;
  user: {
    name: string;
    avatar: string;
    isAdmin: boolean;
  };
  content: string;
  createdAt: string;
}
