"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, message, Card, Spin } from "antd";
import { useAuth } from "@/context/AuthContext";
import {
  ICart,
  ICartStorage,
  IProductCartStorage,
  IVoucher,
} from "@/types/interface";
import cartApi from "@/api/cartApi";
import { HttpCodeString } from "@/utils/constants";
import { cloneDeep } from "lodash";
import orderApi from "@/api/orderApi";
import { showToast } from "@/components/toast"; // Import showToast

const Payment = () => {
  
  const { user, token } = useAuth(); // Giả sử có user { name, phone, address }
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [cartList, setCartList] = useState<ICart[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [voucher, setVoucher] = useState<IVoucher>({
    code: "",
    price: 0,
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        customerName: user.name,
        phoneNumber: user.phoneNumber,
        shippingAddress: "",
      });
    }
  }, [user, form]);

  useEffect(() => {
    getCartInfo();
  }, [token]);

  useEffect(() => {
    const totalPrice = cartList.reduce(
      (total, item) =>
        total +
        (item?.product?.priceSale || item?.product?.priceSale || 0) *
          item.quantity,
      0
    );
    setTotalAmount(totalPrice);
  }, [cartList]);
  useEffect(() => {
    setFinalAmount(totalAmount - (voucher?.price || 0));
  }, [totalAmount, voucher]);

  const getCartInfo = async () => {
    setLoading(true);
    try {
      if (token) {
        //callapi get cart
        const response = await cartApi.getCartByUserId();
        if (response.status === HttpCodeString.SUCCESS) {
          setCartList(response.data);
        }
      } else {
        const cartStorage: ICartStorage[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

        const listCart = await getProductInCartLocalStorage(cartStorage);

        setCartList(listCart);
      }
    } catch {
      setCartList([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductInCartLocalStorage = async (cartStorage: ICartStorage[]) => {
    const listCart: ICart[] = [];
    //call api get product theo productId, size, color
    const listProduct = cloneDeep(cartStorage).map((e) => {
      return {
        productId: e.productId?.toString(),
        size: e.size,
        color: e.color,
      };
    });

    let products: IProductCartStorage[] = [];

    try {
      const response = await cartApi.getCartByLocalStorageData({
        listCartInfo: listProduct,
      });
      if (response.status === HttpCodeString.SUCCESS) {
        products = response.data || [];
      }
    } finally {
      console.log("done");
    }
    cartStorage.forEach((ca) => {
      const newCart: ICart = {
        id: null,
        ...ca,
        product:
          products.find(
            (pr) =>
              pr.id === ca.productId &&
              pr.color === ca.color &&
              pr.size === ca.size
          ) || null,
      };
      listCart.push(newCart);
    });

    return listCart;
  };

  const applyDiscount = async () => {
    try {
      const payload = {
        voucherCode: discountCode,
      };

      const response = await orderApi.getVoucher(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        setVoucher(response.data);
        showToast({
          content: "Áp dụng voucher thành công!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Áp dụng voucher thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch {}
  };

  const handlePayment = async () => {
    try {
      await form.validateFields();
      const products = cartList.map((e) => {
        return {
          productId: e.product?.id,
          name: e.product?.name,
          image: e.product?.image,
          priceRegular: e.product?.priceRegular,
          priceSale: e.product?.priceSale,
          discount: null,
          color: e.color,
          size: e.size,
          quantity: e.quantity,
        };
      });
      const payload = {
        customerName: form.getFieldValue("customerName"),
        email: form.getFieldValue("email"),
        phoneNumber: form.getFieldValue("phoneNumber"),
        totalAmount: totalAmount,
        voucher: voucher.code,
        voucherPrice: voucher.price,
        shippingAddress: form.getFieldValue("shippingAddress"),
        note: form.getFieldValue("note"),
        products: products,
      };

      const response = await orderApi.addOrder(payload);
      if (response?.status === HttpCodeString.SUCCESS) {
        showToast({
          content: "Đặt hàng thành công!",
          duration: 5,
          type: "success",
        });
        clearCart()
      } else {
        showToast({
          content: "Đặt hàng thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch {}
  };

  const clearCart = async () => {
    if (token) {
      try {
        const response = await cartApi.updateCart({});

        if (response.status === HttpCodeString.SUCCESS) {
          setCartList([]);
        } else {
          showToast({
            content: "Xóa giỏ hàng thất bại!",
            duration: 5,
            type: "error",
          });
        }
      } catch {}
    } else {
      localStorage.removeItem("cart");
      setCartList([]);
    }
  };

  return (
    <div className="container mx-auto py-4 px-4 md:px-6 md:py-8">
      
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">
        🛒 Đơn hàng của bạn
      </h2>
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
          <Spin size="large" />
        </div>
      )}

      <Card className="!bg-gray-100">
        <div className="infomation grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FORM BILL */}
          <Card title="Thông tin thanh toán" bordered={false}>
            <Form form={form} layout="vertical">
              <Form.Item
                label="Họ và Tên"
                name="customerName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { type: "email", message: "Email không hợp lệ!" }, // Kiểm tra định dạng email
                ]}
              >
                <Input placeholder="Nhập email (không bắt buộc)" />
              </Form.Item>
              <Form.Item
                label="Địa chỉ"
                name="shippingAddress"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
              </Form.Item>
            </Form>

            {/* MÃ GIẢM GIÁ */}
            <div className="flex gap-2 mt-4">
              <Input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Nhập mã giảm giá"
              />
              <Button type="primary" onClick={applyDiscount}>
                Áp dụng
              </Button>
            </div>
          </Card>

          {/* THÔNG TIN ĐƠN HÀNG */}
          <Card title="Thông tin đơn hàng" bordered={false}>
            <div className="space-y-2">
              {cartList.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-200 py-2"
                >
                  <div className="flex gap-3">
                    <div className="image flex items-center justify-center">
                      <img width={50} src={item?.product?.image} />
                    </div>
                    <div className="size-color">
                      <div className="name font-bold">{item.product?.name}</div>
                      <div className="size">Size: {item.size}</div>
                      <div className="sizquantitye">Color: {item.color}</div>
                    </div>
                    <div className="quantity">× {item.quantity}</div>
                  </div>
                  <div>
                    {(
                      (item.product?.priceSale ||
                        item.product?.priceRegular ||
                        0) * item.quantity
                    ).toLocaleString()}{" "}
                    đ
                  </div>
                </div>
              ))}
            </div>

            {/* TỔNG HỢP GIÁ */}
            <div className="border-t mt-4 pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Tổng giá:</span>{" "}
                <span>{totalAmount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between">
                <span>Giảm giá:</span>{" "}
                <span className="text-red-500">
                  -{voucher?.price?.toLocaleString()} đ
                </span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Thành tiền:</span>{" "}
                <span className="text-blue-500">
                  {finalAmount.toLocaleString()} đ
                </span>
              </div>
            </div>

            {/* NÚT THANH TOÁN */}
            <Button
              type="primary"
              block
              className="mt-4"
              onClick={handlePayment}
            >
              Thanh toán
            </Button>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
