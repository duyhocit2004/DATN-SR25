export interface IResponseCategory {
  id: number;
  name: string;
  image: string;
  gender: string;
  description: string;
  parentId: number | null;
  parentName: string;
  createdAt: string;
}
