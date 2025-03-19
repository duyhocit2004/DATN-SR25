import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Rate, Button, Input, Image, Form, Spin } from "antd";
import { useEffect, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import adminApi from "@/api/adminApi";
import { HttpCodeString } from "@/utils/constants";
import { IProduct, IReview } from "@/types/interface";
import productApi from "@/api/productApi";
import { showToast } from "@/components/toast";
import { useAuth } from "@/context/AuthContext";

const { TextArea } = Input;

const ReviewDetail = () => {
  const navigate = useNavigate();
  const [formReply] = Form.useForm();
  const { user } = useAuth();
  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<IReview | null>(null);
  const [productDetail, setProductDetail] = useState<IProduct | null>(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);
  const [repliedReview, setRepliedReview] = useState<number | null>(null);

  // if (!review) return <p>Không tìm thấy đánh giá</p>;

  useEffect(() => {
    if (reviewId) {
      getReviewDetail();
    }
  }, [reviewId]);

  const getReviewDetail = async () => {
    setLoading(true);
    try {
      const response = await adminApi.getReviewDetail({ commentId: reviewId });
      if (response?.status === HttpCodeString.SUCCESS) {
        setReview(response.data?.[0] || null);
        getProductDetail(response.data?.[0]?.productId);
      }
    } finally {
      setLoading(false);
    }
  };
  const getProductDetail = async (productId: number) => {
    setLoading(true);
    try {
      const response = await productApi.getProduct(productId);
      if (response?.status === HttpCodeString.SUCCESS) {
        setProductDetail(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReplyChange = (value: string) => {
    setReplyText(value);
  };
  const handleReplyBlur = (value: string) => {
    setReplyText(value.trim());
  };

  const handleSendReply = async () => {
    if (!reviewId) return;

    await formReply.validateFields();

    setLoadingReply(true);
    try {
      const response = await productApi.addComment({
        productId: review?.productId,
        parentId: review?.id,
        content: replyText,
        phoneNumber: user?.phoneNumber,
      });
      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Trả lời thành công!",
          duration: 5,
          type: "success",
        });
        setRepliedReview(null);
        setReplyText("");
        formReply.resetFields();
        getReviewDetail();
      } else {
        showToast({
          content: "Trả lời thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoadingReply(false);
    }
  };

  const handleReplyClick = async (replyId: number) => {
    setRepliedReview(replyId);
  };

  return (
    <div className="create-product-container bg-white relative">
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <Spin />
        </div>
      )}
      <div className="header-area flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold">Chi tiết đánh giá</h2>
        <div>
          <Button onClick={() => navigate("/admin/reviews")} className="mr-3">
            Quay lại
          </Button>
        </div>
      </div>
      <div className="p-6 bg-white shadow-md rounded-md">
        {/* Thông tin Review */}
        <div className="flex gap-4 mb-4">
          <Image width={80} src={productDetail?.image} />
          <div>
            <h3 className="text-lg font-semibold">{productDetail?.name}</h3>
            {/* <p className="text-gray-500">SKU: {review?.product?.sku}</p> */}
          </div>
        </div>

        <div className="p-4 border border-gray-300 rounded-md bg-gray-50 mb-4">
          <div className="flex gap-3 items-center">
            <Avatar src={review?.avatar} />
            <div>
              <p className="font-medium">{review?.phoneNumber}</p>
              <Rate disabled defaultValue={review?.rate} value={review?.rate} />
            </div>
          </div>
          <p className="mt-2">{review?.content}</p>
        </div>

        {/* Danh sách phản hồi */}
        <h3 className="text-lg font-semibold mt-4 mb-2">
          Phản hồi ({review?.children?.length || 0})
        </h3>
        {review?.children?.map((reply) => (
          <div
            key={reply.id}
            className="flex flex-col gap-2 p-3 bg-gray-100 rounded-md mb-2"
          >
            <div className="flex gap-3 items-center">
              <Avatar src={reply?.avatar} />
              <div>
                {/* <span
                  className={`font-medium ${
                    reply.user.isAdmin ? "text-blue-600" : ""
                  }`}
                >
                  {reply.user.name} {reply.user.isAdmin && "(Admin)"}
                </span> */}
                <span className="font-medium">{reply.phoneNumber}</span>
                <p className="text-gray-700">{reply.content}</p>
              </div>
            </div>
            <div className="mt-2">
              <Button type="link" onClick={() => handleReplyClick(reply.id)}>
                Trả lời
              </Button>
            </div>

            {repliedReview === reply.id && (
              <div className="flex gap-2 !w-1/2">
                <Form form={formReply} className="!w-full">
                  <Form.Item
                    name="reply"
                    rules={[
                      { required: true, message: "Vui lòng nhập phản hồi!" },
                    ]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Trả lời phản hồi này..."
                      value={replyText || ""}
                      onChange={(e) => handleReplyChange(e.target.value)}
                      onBlur={(e) => handleReplyBlur(e.target.value)}
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    icon={<SendOutlined />}
                    disabled={!replyText}
                    loading={loadingReply}
                    onClick={() => handleSendReply()}
                  >
                    Gửi
                  </Button>
                </Form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewDetail;
