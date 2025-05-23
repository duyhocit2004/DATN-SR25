import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchOrders, setSelectedOrder } from "@/store/reducers/orderSlice";
import { IOrder, IProductOrder } from "@/types/interface";
import { OrderStatusDataClient } from "@/utils/constantData";
import { getColorOrderStatus, getLabelByValue } from "@/utils/functions";
import { Table, Tag, Button, Modal, Card, Image, Pagination } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderApi from "@/api/orderApi";
import { message } from "antd";
import commentApi from "@/api/commentApi";
import { Rate, Input } from "antd";

const OrderTable = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<IOrder | null>(null);
  const { orders, loading, phoneNumber } = useAppSelector(
    (state) => state.order
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [reviewingProduct, setReviewingProduct] = useState<IProductOrder | null>(null);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewedProductIds, setReviewedProductIds] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [reviewingProductId, setReviewingProductId] = useState<number | null>(null);

  const handleReviewClick = (order: IOrder) => {
    setSelectedOrderForReview(order);
    setIsReviewModalVisible(true);
    setReviewingProductId(null);
  };

  const handleProductReview = (product: IProductOrder) => {
    if (reviewingProductId === product.productId) return;
    setReviewingProduct(product);
    setReviewContent("");
    setReviewRate(0);
    setReviewingProductId(product.productId);
  };

  const handleSubmitReview = async () => {
    if (!reviewingProduct) return;
    setSubmitting(true);
    const orderPhone =
      selectedOrderForReview?.receiverPhoneNumber ||
      selectedOrderForReview?.phoneNumber ||
      "";
    try {
      await commentApi.addComment({
        productId: reviewingProduct.productId,
        content: reviewContent,
        rate: reviewRate,
        phoneNumber: orderPhone,
      });
      message.success("Đánh giá thành công!");
      setReviewedProductIds((prev) => [...prev, reviewingProduct.productId]);
      setReviewingProduct(null);
      setReviewingProductId(null);
      if (
        selectedOrderForReview?.products.every((p: IProductOrder) =>
          reviewedProductIds.includes(p.productId) || p.productId === reviewingProduct.productId
        )
      ) {
        setIsReviewModalVisible(false);
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Đánh giá thất bại!");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirmReceived = async (order: IOrder) => {
    try {
      await orderApi.updateOrderStatus({ id: order.id, status: "Received" });
      dispatch(fetchOrders({ phoneNumber }));
      message.success("Xác nhận đã nhận hàng thành công!");
    } catch (error) {
      message.error("Có lỗi khi xác nhận đã nhận hàng!");
    }
  };

  const columns: ColumnsType<IOrder> = [
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      minWidth: 150,
      render: (text, record) => (
        <div>
          <span
            className="text-blue-500 hover:text-blue-800 cursor-pointer"
            onClick={() => showOrderDetail(record)}
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "orderTime",
      key: "orderTime",
      minWidth: 150,
      render: (date) => (date ? dayjs(date).format("DD/MM/YYYY") : ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      minWidth: 150,
      render: (status) => (
        <Tag color={getColorOrderStatus(status)}>
          {getLabelByValue(OrderStatusDataClient, status)}
        </Tag>
      ),
    },
    {
      title: "Tổng tiền (VNĐ)",
      dataIndex: "totalPrice",
      key: "totalPrice",
      minWidth: 150,
      render: (totalPrice) => (
        <span className="font-semibold text-red-500">
          {totalPrice.toLocaleString()} đ
        </span>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
      minWidth: 250,
    },
    {
      title: "Hành động",
      key: "action",
      minWidth: 250,
      render: (_, record) => (
        <div className="flex gap-2">
          {(record.status === "Delivered" || record.status === "Received") && (
            <>
              <Button
                type="primary"
                onClick={() => handleReviewClick(record)}
                disabled={record.products.every((p) => reviewedProductIds.includes(p.productId))}
              >
                Đánh giá
              </Button>
              {record.status === "Delivered" && (
                <Button
                  type="default"
                  onClick={() => handleConfirmReceived(record)}
                >
                  Đã nhận được hàng
                </Button>
              )}
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchOrders({ phoneNumber: phoneNumber }));
  }, [dispatch, phoneNumber, window.location.pathname]);

  const showOrderDetail = (order: IOrder) => {
    dispatch(setSelectedOrder(order));
  };

  // Sort orders by created_at in descending order
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
  const paginatedOrders = sortedOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={paginatedOrders}
        rowKey="id"
        pagination={false}
        scroll={{ x: "100%" }}
      />
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={sortedOrders.length}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>

      {selectedOrderForReview && Array.isArray(selectedOrderForReview.products) && (
        <Modal
          title="Chọn sản phẩm để đánh giá"
          open={isReviewModalVisible}
          onCancel={() => setIsReviewModalVisible(false)}
          footer={null}
          width={800}
        >
          <div className="grid grid-cols-1 gap-4">
            {selectedOrderForReview.products.map((product: IProductOrder) => (
              <Card
                key={product.id}
                hoverable
                className={`flex flex-col cursor-pointer relative mb-2 ${reviewedProductIds.includes(product.productId) ? 'opacity-50 pointer-events-none' : ''}`}
                onClick={() =>
                  !reviewedProductIds.includes(product.productId) &&
                  reviewingProductId !== product.productId &&
                  handleProductReview(product)
                }
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded"
                      preview={false}
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gray-500">Số lượng: {product.quantity}</p>
                        <p className="text-gray-500">
                          Màu sắc: {product.color}, Size: {product.size}
                        </p>
                        <p className="text-red-500 font-medium">
                          Giá: {product.priceSale?.toLocaleString() || product.priceRegular.toLocaleString()} đ
                        </p>
                      </div>
                      {reviewedProductIds.includes(product.productId) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70">
                          <span className="text-gray-600 font-semibold">Đã đánh giá</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {reviewingProductId === product.productId && !reviewedProductIds.includes(product.productId) && (
                  <div className="mt-4 border-t pt-4">
                    <Rate value={reviewRate} onChange={setReviewRate} allowClear />
                    <Input.TextArea
                      rows={4}
                      value={reviewContent}
                      onChange={e => setReviewContent(e.target.value)}
                      placeholder="Nhập nội dung đánh giá..."
                      className="mt-2"
                    />
                    <div className="mt-2 text-right">
                      <Button type="primary" loading={submitting} onClick={handleSubmitReview} disabled={reviewRate === 0}>
                        Gửi đánh giá
                      </Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </Modal>
      )}
    </>
  );
};

export default OrderTable;
