export interface IProduct {
  id: string;
  name: string;
  image: string;
}

export interface IResponsePost {
  id: string;
  title: string;
  image: string;
  content: string;
  description: string;
  product: IProduct;
  status: "Published" | "Draft";
  createdAt: string;
}
