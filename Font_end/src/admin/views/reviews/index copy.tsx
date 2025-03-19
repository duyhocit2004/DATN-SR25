import { useState } from "react";
import { Table, Avatar, Rate, Button, Tag, Collapse, Input, Image, Select } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;

export interface Review {
  id: string;
  product: {
    name: string;
    image: string;
    sku: string;
  };
  customer: {
    name: string;
    avatar: string;
  };
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  status: "Chờ duyệt" | "Đã duyệt" | "Đã ẩn";
  replies?: Reply[];
}

export interface Reply {
  id: string;
  user: {
    name: string;
    avatar: string;
    isAdmin: boolean;
  };
  content: string;
  createdAt: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    product: {
      name: "Tai nghe Bluetooth XYZ",
      image: "https://via.placeholder.com/80",
      sku: "SKU12345",
    },
    customer: {
      name: "Nguyễn Văn A",
      avatar: "https://via.placeholder.com/40",
    },
    rating: 5,
    content: "Sản phẩm rất tốt! Âm thanh trong trẻo, pin trâu.",
    images: ["https://via.placeholder.com/100"],
    createdAt: "2025-03-10",
    status: "Đã duyệt",
    replies: [
      {
        id: "r1",
        user: { name: "Trần B", avatar: "https://via.placeholder.com/40", isAdmin: false },
        content: "Mình cũng mua rồi, dùng rất ưng!",
        createdAt: "2025-03-11",
      },
      {
        id: "r2",
        user: { name: "Admin", avatar: "https://via.placeholder.com/40", isAdmin: true },
        content: "Cảm ơn bạn đã ủng hộ! Hy vọng bạn tiếp tục đồng hành cùng shop.",
        createdAt: "2025-03-12",
      },
    ],
  },
];

const ReviewTable = () => {
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const handleReplyChange = (id: string, value: string) => {
    setReplyText((prev) => ({ ...prev, [id]: value }));
  };

  const handleSendReply = (id: string) => {
    console.log(`Reply to review ${id}:`, replyText[id]);
    setReplyText((prev) => ({ ...prev, [id]: "" }));
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
      render: (product: Review["product"]) => (
        <div className="flex gap-2 items-center">
          <Image width={50} src={product.image} />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-gray-500 text-sm">SKU: {product.sku}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (customer: Review["customer"]) => (
        <div className="flex gap-2 items-center">
          <Avatar src={customer.avatar} />
          <span>{customer.name}</span>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled defaultValue={rating} />,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Ảnh/Video",
      dataIndex: "images",
      key: "images",
      render: (images?: string[]) =>
        images?.length ? images.map((img, index) => <Image key={index} width={40} src={img} />) : "Không có",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "Đã duyệt" ? "green" : status === "Chờ duyệt" ? "orange" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Phản hồi",
      dataIndex: "replies",
      key: "replies",
      render: (replies?: Review["replies"]) => (
        <Collapse>
          <Panel header={`Xem ${replies?.length || 0} phản hồi`} key="1">
            {replies?.map((reply) => (
              <div key={reply.id} className="flex gap-3 p-2 bg-gray-100 rounded-md">
                <Avatar src={reply.user.avatar} />
                <div>
                  <span className={`font-medium ${reply.user.isAdmin ? "text-blue-600" : ""}`}>
                    {reply.user.name} {reply.user.isAdmin && "(Admin)"}
                  </span>
                  <p className="text-gray-700">{reply.content}</p>
                </div>
              </div>
            ))}
          </Panel>
        </Collapse>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record: Review) => (
        <div className="flex gap-2">
          <TextArea
            rows={1}
            placeholder="Trả lời..."
            value={replyText[record.id] || ""}
            onChange={(e) => handleReplyChange(record.id, e.target.value)}
          />
          <Button type="primary" icon={<SendOutlined />} disabled={!replyText[record.id]} onClick={() => handleSendReply(record.id)}>
            Gửi
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Quản lý đánh giá sản phẩm</h2>
      <Table columns={columns} dataSource={reviews} rowKey="id" pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ReviewTable;
