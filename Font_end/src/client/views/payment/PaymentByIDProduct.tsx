"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Spin, Radio, Select } from "antd";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { ICart, ICartStorage, IVoucher } from "@/types/interface";
import cartApi from "@/api/cartApi";
import { HttpCodeString, PaymentMethod } from "@/utils/constants";
import orderApi from "@/api/orderApi";
import { showToast } from "@/components/toast";
import { useNavigate, useLocation } from "react-router-dom";
import { dispatchAction } from "@/store/actionHelper";
import { useAppDispatch } from "@/store/hooks";

const { Option } = Select;

const PaymentByIDProduct = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingApplyVoucher, setLoadingApplyVoucher] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [cartItem, setCartItem] = useState<ICart | null>(null);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [voucher, setVoucher] = useState<IVoucher | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>(PaymentMethod.COD);
  const [onlinePaymentMethod, setOnlinePaymentMethod] = useState<string>("VNPAY");
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [receiverCities, setReceiverCities] = useState<any[]>([]);
  const [receiverDistricts, setReceiverDistricts] = useState<any[]>([]);
  const [receiverWards, setReceiverWards] = useState<any[]>([]);
  const [selectedReceiverCity, setSelectedReceiverCity] = useState<string | null>(null);
  const [selectedReceiverDistrict, setSelectedReceiverDistrict] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, quantity, size, color } = location.state || {};

  // Fetch cities for both buyer and receiver
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("https://provinces.open-api.vn/api/p/");
        setCities(response.data);
        setReceiverCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  // Fetch districts for buyer
  useEffect(() => {
    if (selectedCity) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`
          );
          setDistricts(response.data.districts);
          setWards([]);
          form.setFieldsValue({ district: undefined, ward: undefined });
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    } else {
      setDistricts([]);
      setWards([]);
    }
  }, [selectedCity, form]);

  // Fetch wards for buyer
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
          );
          setWards(response.data.wards);
          form.setFieldsValue({ ward: undefined });
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    } else {
      setWards([]);
    }
  }, [selectedDistrict, form]);

  // Fetch districts for receiver
  useEffect(() => {
    if (selectedReceiverCity) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/p/${selectedReceiverCity}?depth=2`
          );
          setReceiverDistricts(response.data.districts);
          setReceiverWards([]);
          form.setFieldsValue({ receiverDistrict: undefined, receiverWard: undefined });
        } catch (error) {
          console.error("Error fetching receiver districts:", error);
        }
      };
      fetchDistricts();
    } else {
      setReceiverDistricts([]);
      setReceiverWards([]);
    }
  }, [selectedReceiverCity, form]);

  // Fetch wards for receiver
  useEffect(() => {
    if (selectedReceiverDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get(
            `https://provinces.open-api.vn/api/d/${selectedReceiverDistrict}?depth=2`
          );
          setReceiverWards(response.data.wards);
          form.setFieldsValue({ receiverWard: undefined });
        } catch (error) {
          console.error("Error fetching receiver wards:", error);
        }
      };
      fetchWards();
    } else {
      setReceiverWards([]);
    }
  }, [selectedReceiverDistrict, form]);

  // Initialize form with user info
  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        customerName: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        paymentMethod: PaymentMethod.COD,
        onlinePaymentMethod: "VNPAY"
      });
    }
  }, [user, form]);

  // Fetch single product details
  useEffect(() => {
    const getProductInfo = async () => {
      setLoading(true);
      try {
        if (token) {
          const response = await cartApi.getCartByUserId();
          if (response.status === HttpCodeString.SUCCESS) {
            const item = response.data.find(
              (cart) =>
                cart.product?.id === productId &&
                cart.size === size &&
                cart.color === color
            );
            if (item) {
              setCartItem({ ...item, quantity });
            } else {
              setCartItem(null);
            }
          }
        } else {
          const response = await cartApi.getCartByLocalStorageData({
            listCartInfo: [{ productId, size, color }],
          });
          if (response.status === HttpCodeString.SUCCESS && response.data[0]) {
            setCartItem({
              id: null,
              product: response.data[0],
              productId,
              size,
              color,
              quantity,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setCartItem(null);
      } finally {
        setLoading(false);
      }
    };
    getProductInfo();
  }, [token, productId, quantity, size, color]);

  // Calculate total amount for single item
  useEffect(() => {
    if (cartItem) {
      const totalPrice =
        (cartItem?.product?.priceSale || cartItem?.product?.priceRegular || 0) *
        cartItem.quantity;
      setTotalAmount(totalPrice);
    } else {
      setTotalAmount(0);
    }
  }, [cartItem]);

  // Calculate final amount after voucher
  useEffect(() => {
    setFinalAmount(totalAmount - (voucher?.voucherPrice || 0));
  }, [totalAmount, voucher]);

  const applyDiscount = async () => {
    try {
      setLoadingApplyVoucher(true);
      const payload = {
        voucherCode: discountCode,
        totalAmount: totalAmount,
      };
      const response = await orderApi.getVoucher(payload);
      if (
        response?.status === HttpCodeString.SUCCESS &&
        response.data.status === "ACTIVE"
      ) {
        if (response.data.minOrderValue && totalAmount < response.data.minOrderValue) {
          showToast({
            content: `Đơn hàng chưa đạt giá trị tối thiểu ${response.data.minOrderValue.toLocaleString()} đ để áp dụng voucher!`,
            duration: 5,
            type: "error",
          });
          return;
        }
        setVoucher(response.data);
        showToast({
          content: "Áp dụng voucher thành công!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Voucher không hợp lệ hoặc không đạt giá trị tối thiểu!",
          duration: 5,
          type: "error",
        });
      }
    } finally {
      setLoadingApplyVoucher(false);
    }
  };

  const clearCartItem = async () => {
    try {
      if (token) {
        const response = await cartApi.updateCart({
          productId,
          size,
          color,
          quantity: 0, // Xóa sản phẩm bằng cách đặt quantity = 0
        });
        if (response.status === HttpCodeString.SUCCESS) {
          setCartItem(null);
          showToast({
            content: "Sản phẩm đã được xóa khỏi giỏ hàng!",
            duration: 5,
            type: "success",
          });
        } else {
          throw new Error("Failed to clear cart item via API");
        }
      } else {
        const cartStorage = JSON.parse(localStorage.getItem("cart") || "[]");
        const updatedCart = cartStorage.filter(
          (item: ICartStorage) =>
            item.productId !== productId ||
            item.size !== size ||
            item.color !== color
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItem(null);
        showToast({
          content: "Sản phẩm đã được xóa khỏi giỏ hàng!",
          duration: 5,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error clearing cart item:", error);
      showToast({
        content: "Xóa sản phẩm khỏi giỏ hàng thất bại!",
        duration: 5,
        type: "error",
      });
    }
  };

  const handlePayment = async () => {
    try {
      const values = await form.validateFields();

      if (!cartItem) {
        showToast({
          content: "Không tìm thấy sản phẩm để thanh toán!",
          duration: 5,
          type: "error",
        });
        return;
      }

      // Validate online payment method if online payment is selected
      if (values.paymentMethod === PaymentMethod.ONLINE && !values.onlinePaymentMethod) {
        showToast({
          content: "Vui lòng chọn phương thức thanh toán online!",
          duration: 5,
          type: "error",
        });
        return;
      }

      if (voucher?.code) {
        const voucherCheck = await orderApi.getVoucher({
          voucherCode: voucher.code,
          totalAmount: totalAmount,
        });
        if (
          voucherCheck?.status !== HttpCodeString.SUCCESS ||
          voucherCheck.data.status !== "ACTIVE"
        ) {
          showToast({
            content: "Voucher không hợp lệ hoặc đã hết hạn! Vui lòng xóa mã giảm giá và thử lại.",
            duration: 5,
            type: "error",
          });
          setVoucher(null);
          setDiscountCode("");
          return;
        }
        setVoucher(voucherCheck.data);
      }

      const product = {
        productId: cartItem.product?.id,
        name: cartItem.product?.name,
        image: cartItem.product?.image,
        priceRegular: cartItem.product?.priceRegular,
        priceSale: cartItem.product?.priceSale,
        discount: null,
        color: cartItem.color,
        size: cartItem.size,
        quantity: cartItem.quantity,
      };

      const city = cities.find((c) => c.code === values.city);
      const district = districts.find((d) => d.code === values.district);
      const ward = wards.find((w) => w.code === values.ward);
      const shippingAddress = `${values.street || ""}, ${ward?.name || ""}, ${district?.name || ""}, ${city?.name || ""}`;

      const receiverCity = receiverCities.find((c) => c.code === values.receiverCity);
      const receiverDistrict = receiverDistricts.find((d) => d.code === values.receiverDistrict);
      const receiverWard = receiverWards.find((w) => w.code === values.receiverWard);
      const receiverAddress = values.receiverStreet
        ? `${values.receiverStreet}, ${receiverWard?.name || ""}, ${receiverDistrict?.name || ""}, ${receiverCity?.name || ""}`
        : null;

      const payload = {
        user_id: user?.id || null,
        customerName: values.customerName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        receiverName: values.receiverName || null,
        receiverPhoneNumber: values.receiverPhoneNumber || null,
        receiverAddress: receiverAddress,
        totalAmount: finalAmount,
        voucher: voucher?.code || null,
        voucherPrice: voucher?.voucherPrice || 0,
        shippingAddress: shippingAddress,
        note: values.note,
        products: [product],
        paymentMethod: values.paymentMethod,
        onlinePaymentMethod: values.paymentMethod === PaymentMethod.ONLINE ? values.onlinePaymentMethod : undefined,
      };

      setLoading(true);
      const response = await orderApi.addOrder(payload);
      
      if (response?.status === HttpCodeString.SUCCESS) {
        await clearCartItem();
        if (values.paymentMethod === PaymentMethod.ONLINE) {
          if (values.onlinePaymentMethod === "VNPAY" && response.data.vnpayUrl) {
            window.location.href = response.data.vnpayUrl;
          } else if (values.onlinePaymentMethod === "MOMO" && response.data.momoUrl) {
            window.location.href = response.data.momoUrl;
          } else {
            showToast({
              content: "Không thể tạo URL thanh toán. Vui lòng thử lại!",
              duration: 5,
              type: "error",
            });
          }
        } else if (values.paymentMethod === PaymentMethod.COD) {
          showToast({
            content: "Đặt hàng thành công!",
            duration: 5,
            type: "success",
          });
          navigate("/order-history");
        }
      } else {
        showToast({
          content: response?.message || "Đặt hàng thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      showToast({
        content: "Đã xảy ra lỗi khi đặt hàng!",
        duration: 5,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-blue-900 tracking-tight">
        🛒 Thanh Toán Đơn Hàng
      </h2>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <Spin size="large" />
        </div>
      )}

      <Card className="shadow-xl rounded-2xl bg-white/90 backdrop-blur-sm">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* FORM BILL */}
          <Card
            title="Thông Tin Thanh Toán"
            className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
          >
            <Form form={form} layout="vertical" className="space-y-2">
              <Form.Item
                label="Họ và Tên (Người đặt)"
                name="customerName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input
                  placeholder="Nhập họ và tên"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại (Người đặt)"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>
              <Form.Item
                label="Email (Người đặt)"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Vui lòng nhập email!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập email"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item
                label="Tỉnh/Thành phố (Người đặt)"
                name="city"
                rules={[{ required: true, message: "Vui lòng chọn tỉnh/thành phố!" }]}
              >
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={(value) => setSelectedCity(value)}
                  showSearch
                  filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                  }
                  className="rounded-lg"
                >
                  {cities.map((city) => (
                    <Option key={city.code} value={city.code}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Quận/Huyện (Người đặt)"
                name="district"
                rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
              >
                <Select
                  placeholder="Chọn quận/huyện"
                  onChange={(value) => setSelectedDistrict(value)}
                  showSearch
                  filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={!selectedCity}
                  className="rounded-lg"
                >
                  {districts.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Phường/Xã (Người đặt)"
                name="ward"
                rules={[{ required: true, message: "Vui lòng chọn phường/xã!" }]}
              >
                <Select
                  placeholder="Chọn phường/xã"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={!selectedDistrict}
                  className="rounded-lg"
                >
                  {wards.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Số nhà, tên đường (Người đặt)"
                name="street"
                rules={[{ required: true, message: "Vui lòng nhập số nhà, tên đường!" }]}
              >
                <Input
                  placeholder="Nhập số nhà, tên đường"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item label="Họ và Tên (Người nhận)" name="receiverName">
                <Input
                  placeholder="Nhập họ và tên người nhận"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>
              <Form.Item
                label="Số điện thoại (Người nhận)"
                name="receiverPhoneNumber"
                rules={[
                  {
                    pattern: /^(0[3|5|7|8|9])([0-9]{8})$/,
                    message: "Số điện thoại không hợp lệ!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại người nhận"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item label="Tỉnh/Thành phố (Người nhận)" name="receiverCity">
                <Select
                  placeholder="Chọn tỉnh/thành phố"
                  onChange={(value) => setSelectedReceiverCity(value)}
                  showSearch
                  filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                  }
                  allowClear
                  className="rounded-lg"
                >
                  {receiverCities.map((city) => (
                    <Option key={city.code} value={city.code}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Quận/Huyện (Người nhận)" name="receiverDistrict">
                <Select
                  placeholder="Chọn quận/huyện"
                  onChange={(value) => setSelectedReceiverDistrict(value)}
                  showSearch
                  filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={!selectedReceiverCity}
                  allowClear
                  className="rounded-lg"
                >
                  {receiverDistricts.map((district) => (
                    <Option key={district.code} value={district.code}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Phường/Xã (Người nhận)" name="receiverWard">
                <Select
                  placeholder="Chọn phường/xã"
                  showSearch
                  filterOption={(input, option) =>
                    option?.children?.toLowerCase().includes(input.toLowerCase())
                  }
                  disabled={!selectedReceiverDistrict}
                  allowClear
                  className="rounded-lg"
                >
                  {receiverWards.map((ward) => (
                    <Option key={ward.code} value={ward.code}>
                      {ward.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Số nhà, tên đường (Người nhận)"
                name="receiverStreet"
              >
                <Input
                  placeholder="Nhập số nhà, tên đường"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>

              <Form.Item label="Ghi chú" name="note">
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập ghi chú (nếu có)"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                />
              </Form.Item>
            </Form>

            <div className="mt-6 flex gap-3">
              <Input
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="Nhập mã giảm giá"
                className="rounded-lg border-gray-300 focus:border-blue-500 flex-1"
              />
              <Button
                type="primary"
                loading={loadingApplyVoucher}
                onClick={applyDiscount}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 transition-colors duration-200"
              >
                Áp dụng
              </Button>
            </div>
          </Card>

          {/* ORDER SUMMARY */}
          <Card
            title="Thông Tin Đơn Hàng"
            className="border-0 shadow-md rounded-xl hover:shadow-lg transition-shadow duration-300"
          >
            <div className="space-y-4">
              {cartItem ? (
                <div
                  className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 rounded-md px-2"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={cartItem?.product?.image}
                      alt={cartItem.product?.name}
                      className="w-14 h-14 object-cover rounded-md border border-gray-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">{cartItem.product?.name}</div>
                      <div className="text-sm text-gray-600">Size: {cartItem.size}</div>
                      <div className="text-sm text-gray-600">Color: {cartItem.color}</div>
                    </div>
                    <div className="text-sm text-gray-600">× {cartItem.quantity}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-800">
                    {(
                      (cartItem.product?.priceSale ||
                        cartItem.product?.priceRegular ||
                        0) * cartItem.quantity
                    ).toLocaleString()}{" "}
                    đ
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-600">Không có sản phẩm để hiển thị</div>
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Tổng giá:</span>
                <span>{totalAmount.toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Giảm giá:</span>
                <span>- {(voucher?.voucherPrice || 0).toLocaleString()} đ</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-blue-700">
                <span>Thành tiền:</span>
                <span>{finalAmount.toLocaleString()} đ</span>
              </div>
            </div>

            <Form form={form} layout="vertical" className="mt-6">
              <Form.Item
                label="Phương thức thanh toán"
                name="paymentMethod"
                rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán!" }]}
              >
                <Radio.Group
                  onChange={(e) => {
                    const value = e.target.value;
                    setPaymentMethod(value);
                    if (value === PaymentMethod.ONLINE) {
                      form.setFieldsValue({ onlinePaymentMethod: "VNPAY" });
                    } else {
                      form.setFieldsValue({ onlinePaymentMethod: undefined });
                    }
                  }}
                  value={paymentMethod}
                  className="flex flex-col gap-2"
                >
                  <Radio value={PaymentMethod.COD} className="text-gray-700">
                    Thanh toán COD
                  </Radio>
                  <Radio value={PaymentMethod.ONLINE} className="text-gray-700">
                    Thanh toán Online
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Form>

            {paymentMethod === PaymentMethod.ONLINE && (
              <div style={{ marginTop: 16 }}>
                <Form.Item
                  label="Phương thức thanh toán online"
                  name="onlinePaymentMethod"
                  rules={[{ required: true, message: "Vui lòng chọn phương thức thanh toán online!" }]}
                >
                  <Radio.Group
                    onChange={(e) => {
                      const value = e.target.value;
                      setOnlinePaymentMethod(value);
                      form.setFieldsValue({ onlinePaymentMethod: value });
                    }}
                    value={onlinePaymentMethod}
                    className="ant-radio-group ant-radio-group-outline flex flex-col gap-2"
                  >
                    <Radio value="VNPAY" className="ant-radio-wrapper">
                      VNPay
                    </Radio>
                    <Radio value="MOMO" className="ant-radio-wrapper">
                      Momo
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            )}

            <Button
              type="primary"
              block
              onClick={handlePayment}
              className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg py-3 text-base font-semibold transition-all duration-200"
            >
              Thanh toán
            </Button>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default PaymentByIDProduct;