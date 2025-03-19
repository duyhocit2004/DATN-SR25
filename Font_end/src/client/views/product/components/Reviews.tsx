import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Input,
  Form,
  message,
  Rate,
  Col,
  Row,
  Card,
  Spin,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { IReview } from "@/types/interface";
import productApi from "@/api/productApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast"; // Import showToast
import { formatData, maskPhoneNumber } from "@/utils/functions";

interface ReviewFormData {
  newContent: string;
  newRate: number;
  phoneNumber: string;
}
interface ReplyFormData {
  parentId: number | null;
  newContent: string;
  phoneNumber: string;
}

// Component IReview
const Reviews: React.FC = () => {
  const [formReview] = Form.useForm();
  const [formReply] = Form.useForm();
  const { token } = useAuth();
  // Lấy productId từ URL params
  const { productId } = useParams<{ productId: string }>();

  const [reviews, setReviews] = useState<IReview[]>([]);
  const [repliedComment, setRepliedComment] = useState<number | null>(null); // Lưu ID của comment được trả lời
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    newContent: "",
    newRate: 0,
    phoneNumber: "",
  });
  const [replyFormData, setReplyFormData] = useState<ReplyFormData>({
    parentId: null,
    newContent: "",
    phoneNumber: "",
  });
  const [loadingList, setLoadingList] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingReply, setLoadingReply] = useState(false);

  // Gọi API để lấy reviews khi productId thay đổi
  useEffect(() => {
    getReviews();
  }, [productId]); // Gọi lại khi productId thay đổi

  const getReviews = async () => {
    if (!productId) {
      setReviews([]);
      return;
    }
    setLoadingList(true);
    try {
      const response = await productApi.getReviewsByProductId({
        productId: Number(productId),
      });
      if (response.status === HttpCodeString.SUCCESS) {
        setReviews(response.data);
      } else {
        setReviews([]);
      }
    } catch {
      setReviews([]);
    } finally {
      setLoadingList(false);
    }
  };

  const handleReplyClick = async (parentCommentId: number) => {
    // if (!user) {
    //   //show popup đăng ký tài khoản
    //   return;
    // }
    setRepliedComment(parentCommentId);
  };

  const handleSubmitReview = async () => {
    if (!productId) return;

    await formReview.validateFields();
    setLoadingCreate(true);
    try {
      const response = await productApi.addComment({
        productId,
        content: reviewFormData.newContent,
        rate: reviewFormData.newRate,
        phoneNumber: reviewFormData.phoneNumber,
      });
      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Đánh giá của bạn đã được gửi!",
          duration: 5,
          type: "success",
        });
        setReviewFormData({
          newContent: "",
          newRate: 0,
          phoneNumber: "",
        });
        formReview.resetFields();
        getReviews();
      } else {
        showToast({
          content: "Đánh giá của bạn gửi thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoadingCreate(false);
    }
  };
  const handleSubmitReply = async (parentId: number) => {
    if (!productId) return;

    await formReply.validateFields();

    setLoadingReply(true);
    try {
      const response = await productApi.addComment({
        parentId,
        productId,
        content: replyFormData.newContent,
        phoneNumber: replyFormData.phoneNumber,
      });
      if (response.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Bình luận của bạn đã được gửi!",
          duration: 5,
          type: "success",
        });
        setReplyFormData({
          parentId: null,
          newContent: "",
          phoneNumber: "",
        });
        formReply.resetFields();
        setRepliedComment(null);
        getReviews();
      } else {
        showToast({
          content: "Bình luận của bạn gửi thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoadingReply(false);
    }
  };

  const onChangeReviewFormData = (key: string, value: any) => {
    setReviewFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    formReview.setFieldValue(key, value);
  };
  const onBlurReviewFormData = (key: string, value: any) => {
    let valueStrim = value;
    if (typeof value === "string") {
      valueStrim = value.trim();
    }
    setReviewFormData((prev) => {
      return {
        ...prev,
        [key]: valueStrim,
      };
    });
    formReview.setFieldValue(key, valueStrim);
  };
  const onChangeReplyFormData = (key: string, value: any) => {
    setReplyFormData((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    formReply.setFieldValue(key, value);
  };
  const onBlurReplyFormData = (key: string, value: any) => {
    let valueStrim = value;
    if (typeof value === "string") {
      valueStrim = value.trim();
    }
    setReplyFormData((prev) => {
      return {
        ...prev,
        [key]: valueStrim,
      };
    });
    formReply.setFieldValue(key, valueStrim);
  };

  return (
    <div className="p-4">
      <Row gutter={[16, 16]}>
        <Col span={24} md={16}>
          {/* Danh Sách Reviews */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">Đánh giá khách hàng</h3>
            <div className="space-y-6">
              {loadingList && (
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
                  <Spin size="large" />
                </div>
              )}
              {reviews?.map((review) => (
                <div key={review.id} className="flex gap-4">
                  <Avatar src={review.avatar} icon={<UserOutlined />} />
                  <div className="flex-1">
                    <div className="review-top flex justify-between items-start">
                      <div className="review-user-info">
                        <div className="font-semibold">
                          {maskPhoneNumber(review.phoneNumber)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatData(review.createdAt)}
                        </div>
                      </div>
                      <div className="flex items-center mt-2">
                        <Rate disabled value={review.rate} />
                      </div>
                    </div>
                    <div className="mt-2">{review.content}</div>
                    <div className="mt-2">
                      <Button
                        type="link"
                        onClick={() => handleReplyClick(review.id)}
                      >
                        Trả lời
                      </Button>
                    </div>
                    {repliedComment === review.id && (
                      <div className="ml-6 mt-4 p-4 bg-gray-50 border-l-4 border-gray-300">
                        <Form form={formReply}>
                          <Form.Item
                            name="phoneNumber"
                            rules={[
                              {
                                required: true,
                                message: "Số điện thoại không được trống",
                              },
                              {
                                pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
                                message: "Số điện thoại không hợp lệ!",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Nhập số điện thoại (Bắt buộc)"
                              value={replyFormData.phoneNumber}
                              onChange={(e) => {
                                onChangeReplyFormData(
                                  "phoneNumber",
                                  e.target.value
                                );
                              }}
                              onBlur={(e) => {
                                onBlurReplyFormData(
                                  "phoneNumber",
                                  e.target.value
                                );
                              }}
                            />
                          </Form.Item>
                          <Form.Item name="newContent">
                            <Input.TextArea
                              rows={4}
                              maxLength={500}
                              placeholder="Nhập trả lời của bạn..."
                              value={replyFormData.newContent}
                              onChange={(e) => {
                                onChangeReplyFormData(
                                  "newContent",
                                  e.target.value
                                );
                              }}
                              onBlur={(e) => {
                                onBlurReplyFormData(
                                  "newContent",
                                  e.target.value
                                );
                              }}
                            />
                          </Form.Item>
                          <Form.Item>
                            <Button
                              className="mt-2"
                              color={"purple"}
                              variant="solid"
                              size="small"
                              loading={loadingReply}
                              onClick={() => {
                                handleSubmitReply(review.id);
                              }}
                            >
                              Gửi
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    )}
                    {review.children &&
                      review.children.map((reply) => (
                        <div key={reply.id} className="flex gap-4 ml-8 mt-4">
                          <Avatar src={reply.avatar} icon={<UserOutlined />} />
                          <div>
                            <div className="font-semibold">
                              {maskPhoneNumber(reply.phoneNumber)}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatData(reply.createdAt)}
                            </div>
                            <div className="mt-2">{reply.content}</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col span={24} md={8}>
          {/* Form Submit Đánh Giá */}
          <Card>
            <h3 className="text-xl font-semibold mb-4">
              Để lại đánh giá của bạn
            </h3>
            <Form form={formReview}>
              <Form.Item
                name="newRate"
                rules={[
                  {
                    required: true,
                    message: "Rate không được trống",
                  },
                ]}
              >
                <Rate
                  value={reviewFormData.newRate}
                  onChange={(value) => {
                    onChangeReviewFormData("newRate", value);
                  }}
                />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Số điện thoại không được trống",
                  },
                  {
                    pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  value={reviewFormData.phoneNumber}
                  onChange={(e) => {
                    onChangeReviewFormData("phoneNumber", e.target.value);
                  }}
                  onBlur={(e) => {
                    onBlurReviewFormData("phoneNumber", e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item name="newContent">
                <Input.TextArea
                  rows={4}
                  maxLength={500}
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm"
                  value={reviewFormData.newContent}
                  onChange={(e) => {
                    onChangeReviewFormData("newContent", e.target.value);
                  }}
                  onBlur={(e) => {
                    onBlurReviewFormData("newContent", e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  color={"purple"}
                  variant="solid"
                  loading={loadingCreate}
                  onClick={handleSubmitReview}
                >
                  Gửi đánh giá
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reviews;
