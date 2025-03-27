import { IPost } from "./types";

export const posts: IPost[] = [
  {
    id: "1",
    title: "Đánh giá tai nghe Sony WH-1000XM4",
    content: "Tai nghe Sony chống ồn rất tốt...",
    product: { id: "p1", name: "Tai nghe Sony WH-1000XM4", image: "/images/sony.jpg" },
    status: "Published",
    createdAt: "2024-03-10",
  },
  {
    id: "2",
    title: "So sánh AirPods Pro 2 với Sony WF-1000XM4",
    content: "So sánh chất âm và tính năng giữa hai dòng tai nghe...",
    product: { id: "p2", name: "AirPods Pro 2", image: "/images/airpods.jpg" },
    status: "Draft",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Mẹo sử dụng loa Bluetooth JBL Flip 6",
    content: "Cách tận dụng tối đa JBL Flip 6...",
    product: { id: "p3", name: "Loa JBL Flip 6", image: "/images/jbl.jpg" },
    status: "Published",
    createdAt: "2024-03-05",
  },
];