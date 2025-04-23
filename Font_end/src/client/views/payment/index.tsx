"use client";
import { useState, useEffect } from "react";
import { Form, Input, Button, Card, Spin, Radio, Select, Checkbox } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ICart,
  ICartStorage,
  IProductCartStorage,
  IVoucher,
  IOrder,
} from "@/types/interface";
import cartApi from "@/api/cartApi";
import { HttpCodeString, PaymentMethod } from "@/utils/constants";
import { cloneDeep } from "lodash";
import orderApi from "@/api/orderApi";
import { showToast } from "@/components/toast";
import PaymentByIDProduct from "./PaymentByIDProduct";
import { dispatchAction } from "@/store/actionHelper";
import { useAppDispatch } from "@/store/hooks";
import React from "react";

const { Option } = Select;

const Payment = () => {
  const dispatch = useAppDispatch();
  const { user, token } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingApplyVoucher, setLoadingApplyVoucher] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [cartList, setCartList] = useState<ICart[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
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

  // Check if single product purchase or multiple selected items
  const { productId, quantity, size, color, selectedCartItems } = location.state || {};

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

  // Initialize form with user info and default payment method
  useEffect(() => {
    console.log("Current user:", user);
    if (user) {
      console.log("User details:", {
        name: user.name,
        phone: user.phoneNumber,
        email: user.email?.trim(),
      });
      
      // Set form values with default empty string for undefined values
      form.setFieldsValue({
        customerName: user.name || '',
        phoneNumber: user.phoneNumber || '',
        email: user.email?.trim() || '',
        paymentMethod: PaymentMethod.COD,
        onlinePaymentMethod: "VNPAY"
      });

      // If phone number is undefined, show a message to the user
      if (!user.phoneNumber) {
        showToast({
          content: "Vui lòng cập nhật số điện thoại của bạn",
          duration: 5,
          type: "warning",
        });
      }
    }
  }, [user, form]);

  // Fetch cart info or use selected items
  useEffect(() => {
    if (!productId && selectedCartItems) {
      setCartList(selectedCartItems);
      setSelectedItems(
        selectedCartItems.map((item: ICart) => 
          item.id || `${item.productId}-${item.size}-${item.color}`
        )
      );
    } else if (!productId) {
      getCartInfo();
    }
  }, [token, productId, selectedCartItems]);

  // Calculate total amount based on selected items
  useEffect(() => {
    if (!productId) {
      const totalPrice = cartList
        .filter((item) => selectedItems.includes(item.id || `${item.productId}-${item.size}-${item.color}`))
        .reduce(
          (total, item) =>
            total +
            (item?.product?.priceSale || item?.product?.priceRegular || 0) *
              item.quantity,
          0
        );
      setTotalAmount(totalPrice);
    }
  }, [cartList, selectedItems, productId]);

  // Calculate final amount after voucher
  useEffect(() => {
    if (!productId) {
      setFinalAmount(totalAmount - (voucher?.voucherPrice || 0));
    }
  }, [totalAmount, voucher, productId]);

  const getCartInfo = async () => {
    setLoading(true);
    try {
      if (token) {
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
      setSelectedItems([]);
    } finally {
      setLoading(false);
    }
  };

  const getProductInCartLocalStorage = async (cartStorage: ICartStorage[]) => {
    const listCart: ICart[] = [];
    const listProduct = cloneDeep(cartStorage).map((e) => ({
      productId: e.productId?.toString(),
      size: e.size,
      color: e.color,
    }));

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

  // Handle checkbox change for individual items
  const handleCheckboxChange = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Handle select all checkbox
  const handleSelectAll = (e: any) => {
    if (e.target.checked) {
      setSelectedItems(
        cartList.map((item) => item.id || `${item.productId}-${item.size}-${item.color}`)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const clearCart = async () => {
    try {
      if (token) {
        // Xóa từng sản phẩm được chọn qua API
        const deletePromises = selectedItems.map(async (itemId) => {
          const item = cartList.find(
            (cart) => cart.id === itemId || `${cart.productId}-${cart.size}-${cart.color}` === itemId
          );
          if (item) {
            return cartApi.updateCart({
              cartId: item.id,
              quantity: 0,
            });
          }
          return Promise.resolve();
        });

        await Promise.all(deletePromises);

        // Cập nhật trạng thái giỏ hàng
        const updatedCart = cartList.filter(
          (item) => !selectedItems.includes(item.id || `${item.productId}-${item.size}-${item.color}`)
        );
        setCartList(updatedCart);
        setSelectedItems([]);
        dispatch(dispatchAction("cart/setCartCount", updatedCart.length));
        
        showToast({
          content: "Đã xóa các sản phẩm được chọn khỏi giỏ hàng!",
          duration: 5,
          type: "success",
        });
      } else {
        // Xóa các sản phẩm được chọn từ localStorage
        const cartStorage: ICartStorage[] = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        const updatedCart = cartStorage.filter(
          (item) => !selectedItems.includes(`${item.productId}-${item.size}-${item.color}`)
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Cập nhật trạng thái giỏ hàng
        const updatedCartList = cartList.filter(
          (item) => !selectedItems.includes(item.id || `${item.productId}-${item.size}-${item.color}`)
        );
        setCartList(updatedCartList);
        setSelectedItems([]);
        dispatch(dispatchAction("cart/setCartCount", updatedCart.length));
        
        showToast({
          content: "Đã xóa các sản phẩm được chọn khỏi giỏ hàng!",
          duration: 5,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      showToast({
        content: "Xóa các sản phẩm khỏi giỏ hàng thất bại!",
        duration: 5,
        type: "error",
      });
      throw error;
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    if (value === PaymentMethod.ONLINE) {
      form.setFieldsValue({ 
        paymentMethod: value,
        onlinePaymentMethod: onlinePaymentMethod 
      });
    } else {
      form.setFieldsValue({ 
        paymentMethod: value,
        onlinePaymentMethod: undefined 
      });
    }
  };

  // Handle online payment method change
  const handleOnlinePaymentMethodChange = (e: any) => {
    const value = e.target.value as string;
    setOnlinePaymentMethod(value);
    form.setFieldsValue({ onlinePaymentMethod: value });
  };

  const handlePayment = async () => {
    try {
      const values = await form.validateFields();

      const selectedProducts = cartList
        .filter((item) => selectedItems.includes(item.id || `${item.productId}-${item.size}-${item.color}`))
        .map((item) => ({
          productId: item.product?.id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          name: item.product?.name,
          image: item.product?.image,
          priceRegular: item.product?.priceRegular,
          priceSale: item.product?.priceSale
        }));

      if (selectedProducts.length === 0) {
        showToast({
          content: "Vui lòng chọn sản phẩm để thanh toán!",
          duration: 5,
          type: "error",
        });
        return;
      }

      const city = cities.find((c) => c.code === form.getFieldValue("city"));
      const district = districts.find((d) => d.code === form.getFieldValue("district"));
      const ward = wards.find((w) => w.code === form.getFieldValue("ward"));
      const shippingAddress = `${form.getFieldValue("street") || ""}, ${ward?.name || ""}, ${district?.name || ""}, ${city?.name || ""}`;

      const receiverCity = receiverCities.find((c) => c.code === form.getFieldValue("receiverCity"));
      const receiverDistrict = receiverDistricts.find((d) => d.code === form.getFieldValue("receiverDistrict"));
      const receiverWard = receiverWards.find((w) => w.code === form.getFieldValue("receiverWard"));
      const receiverAddress = form.getFieldValue("receiverStreet")
        ? `${form.getFieldValue("receiverStreet")}, ${receiverWard?.name || ""}, ${receiverDistrict?.name || ""}, ${receiverCity?.name || ""}`
        : undefined;

      const payload = {
        users_id: user?.id || null,
        customerName: form.getFieldValue("customerName"),
        email: form.getFieldValue("email"),
        phoneNumber: form.getFieldValue("phoneNumber"),
        receiverName: form.getFieldValue("receiverName") || undefined,
        receiverPhoneNumber: form.getFieldValue("receiverPhoneNumber") || undefined,
        receiverAddress: receiverAddress,
        totalAmount: finalAmount,
        voucher: voucher?.code || undefined,
        voucherPrice: voucher?.voucherPrice || 0,
        shippingAddress: shippingAddress,
        note: form.getFieldValue("note"),
        products: selectedProducts,
        paymentMethod: paymentMethod,
        onlinePaymentMethod: paymentMethod === PaymentMethod.ONLINE ? onlinePaymentMethod : undefined,
      };

      console.log("Payload gửi lên:", payload);

      setLoading(true);
      const response = await orderApi.addOrder(payload);
      
      if (response?.status === HttpCodeString.SUCCESS) {
        await clearCart();
        if (paymentMethod === PaymentMethod.ONLINE) {
          if (onlinePaymentMethod === "VNPAY" && response.data.vnpayUrl) {
            window.location.href = response.data.vnpayUrl;
          } else if (onlinePaymentMethod === "MOMO" && response.data.momoUrl) {
            window.location.href = response.data.momoUrl;
          } else {
            showToast({
              content: "Không thể tạo URL thanh toán. Vui lòng thử lại!",
              duration: 5,
              type: "error",
            });
          }
        } else if (paymentMethod === PaymentMethod.COD) {
          showToast({
            content: "Đặt hàng thành công!",
            duration: 5,
            type: "success",
          });
          navigate("/order-history");
        }
      } else {
        showToast({
          content: response?.message || "Đặt hàng thất bại! Vui lòng thử lại.",
          duration: 5,
          type: "error",
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
      showToast({
        content: "Đã xảy ra lỗi khi đặt hàng! Vui lòng thử lại sau.",
        duration: 5,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render PaymentByIDProduct for single product purchase
  if (productId && quantity && size && color) {
    return (
      <PaymentByIDProduct
        productId={productId}
        quantity={quantity}
        size={size}
        color={color}
      />
    );
  }

  // Render full cart payment UI
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
                    message: "Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại bắt đầu bằng 03, 05, 07, 08, 09 và có 10 số.",
                  },
                ]}
                help={!user?.phoneNumber ? "Vui lòng cập nhật số điện thoại của bạn trong thông tin cá nhân" : undefined}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  className="rounded-lg border-gray-300 focus:border-blue-500"
                  maxLength={10}
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
            {/* <div className="flex items-center mb-4">
              <Checkbox
                onChange={handleSelectAll}
                checked={selectedItems.length === cartList.length && cartList.length > 0}
              >
                Chọn tất cả
              </Checkbox>
            </div> */}
            <div className="space-y-4">
              {cartList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 rounded-md px-2"
                >
                  {/* <Checkbox
                    checked={selectedItems.includes(
                      item.id || `${item.productId}-${item.size}-${item.color}`
                    )}
                    onChange={() =>
                      handleCheckboxChange(
                        item.id || `${item.productId}-${item.size}-${item.color}`
                      )
                    }
                  /> */}
                  <div className="flex items-center gap-4 flex-1">
                    <img
                      src={item?.product?.image}
                      alt={item.product?.name}
                      className="w-14 h-14 object-cover rounded-md border border-gray-100"
                    />
                    <div>
                      <div className="font-semibold text-gray-800">{item.product?.name}</div>
                      <div className="text-sm text-gray-600">Size: {item.size}</div>
                      <div className="text-sm text-gray-600">Color: {item.color}</div>
                    </div>
                    <div className="text-sm text-gray-600">× {item.quantity}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-800">
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
                  onChange={(e) => handlePaymentMethodChange(e.target.value)}
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
                  <div className="flex flex-col gap-4">
                    <div 
                      className={`payment-method-option ${onlinePaymentMethod === 'VNPAY' ? 'selected' : ''}`}
                      onClick={() => {
                        setOnlinePaymentMethod('VNPAY');
                        form.setFieldsValue({ onlinePaymentMethod: 'VNPAY' });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img src="/images/icon/vnpay-logo.png" alt="VNPay" className="w-8 h-8" />
                        <div>
                          <span className="text-lg font-medium">VNPay</span>
                          <p className="text-sm text-gray-500 mt-1">Thanh toán qua VNPay với thẻ ATM, Visa, Mastercard</p>
                        </div>
                      </div>
                    </div>
                    <div 
                      className={`payment-method-option ${onlinePaymentMethod === 'MOMO' ? 'selected' : ''}`}
                      onClick={() => {
                        setOnlinePaymentMethod('MOMO');
                        form.setFieldsValue({ onlinePaymentMethod: 'MOMO' });
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <img src="/images/icon/momo-logo.png" alt="Momo" className="w-8 h-8" />
                        <div>
                          <span className="text-lg font-medium">Momo</span>
                          <p className="text-sm text-gray-500 mt-1">Thanh toán qua ví điện tử Momo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form.Item>
                <style jsx>{`
                  .payment-method-option {
                    padding: 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    background-color: white;
                    transition: all 0.2s ease;
                    cursor: pointer;
                  }
                  
                  .payment-method-option:hover {
                    border-color: #2563eb;
                    background-color: #f0f7ff;
                    transform: translateY(-1px);
                  }
                  
                  .payment-method-option.selected {
                    border-color: #2563eb;
                    background-color: #e6f0ff;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                  }
                  
                  .payment-method-option .text-lg {
                    color: #1f2937;
                  }
                  
                  .payment-method-option.selected .text-lg {
                    color: #2563eb;
                  }
                `}</style>
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

export default Payment;