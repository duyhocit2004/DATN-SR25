import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Table, Button, Popconfirm, Card, Tooltip, Spin } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "@/hooks/useWindowSize";
import QuantitySelector from "@/components/quantity-selector";
import { ICart, ICartStorage, IProductCartStorage } from "@/types/interface";
import { ColumnType } from "antd/es/table";
import { cloneDeep, debounce } from "lodash";
import { useAppDispatch } from "@/store/hooks";
import { useAuth } from "@/context/AuthContext";
import cartApi from "@/api/cartApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast"; // Import showToast

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState<ICart[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { isMobile } = useWindowSize(); // Kiểm tra nếu là màn hình nhỏ
  const { token } = useAuth();
  const cartListRef = useRef<ICart[]>([]);

  useEffect(() => {
    getCartInfo();
  }, [token]);

  useEffect(() => {
    cartListRef.current = cartList;
    const totalPrice = cartList.reduce(
      (total, item) =>
        total +
        (item?.product?.priceSale || item?.product?.priceRegular || 0) *
        item.quantity,
      0
    );
    setTotalAmount(totalPrice);
  }, [cartList]);

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

  const updateCartData = async (record: ICart, quantity: number) => {
    if (token) {
      updateCartApi(record, quantity);
    } else {
      updateCartStorage(record, quantity);
    }
  };

  const updateCartApi = async (record: ICart, quantity: number) => {
    try {
      const response = await cartApi.updateCart({
        cartId: record.id,
        quantity: quantity,
      });

      if (response.status === HttpCodeString.SUCCESS) {
        setCartAfterUpdate(cartListRef.current, record, quantity);
        showToast({
          content: "Cập nhật giỏ hàng thành công!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Cập nhật giỏ hàng thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch { }
  };

  const updateCartStorage = (record: ICart, quantity: number) => {
    const cartStorageData: ICartStorage[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const newCartStorage = cartStorageData.map((e) => {
      if (
        e.productId === record.product?.id &&
        e.size === record.size &&
        e.color === record.color
      ) {
        e.quantity = quantity;
      }
      return e;
    });
    // Nếu chưa login, lưu vào localStorage
    localStorage.setItem("cart", JSON.stringify(newCartStorage));
    // Cập nhật số lượng giỏ hàng trong Redux store
    dispatch({ type: "cart/setCartCount", payload: newCartStorage.length });
    setCartAfterUpdate(cartListRef.current, record, quantity);
  };

  const setCartAfterUpdate = (
    cartDatas: ICart[],
    record: ICart,
    quantity: number
  ) => {
    let newCart: ICart[] = cloneDeep(cartDatas);
    newCart = newCart.map((e) => {
      if (
        e.product?.id === record.product?.id &&
        e.size === record.size &&
        e.color === record.color
      ) {
        e.quantity = quantity;
      }
      return e;
    });
    setCartList(newCart);
  };

  // Tạo debounce cho updateCart (trì hoãn 1 giây)
  const debouncedUpdateCart = useCallback(debounce(updateCartData, 1000), [
    token,
    cartList,
  ]);

  const updateQuantity = (record: ICart, quantity: number) => {
    debouncedUpdateCart(record, quantity); // Gọi update cart với debounce
  };

  const removeFromCart = async (cartItem: ICart) => {
    if (token) {
      removeCartApi(cartItem);
    } else {
      removeCartStorage(cartItem);
    }
  };

  const removeCartApi = async (cartItem: ICart) => {
    try {
      const response = await cartApi.updateCart({
        cartId: cartItem.id,
        quantity: 0,
      });

      if (response.status === HttpCodeString.SUCCESS) {
        updateCartAfterRemoveItem(cartItem);
        showToast({
          content: "Đã xóa sản phẩm khỏi giỏ hàng!",
          duration: 5,
          type: "success",
        });
      } else {
        showToast({
          content: "Xóa sản phẩm thất bại!",
          duration: 5,
          type: "error",
        });
      }
    } catch { }
  };

  const removeCartStorage = (cartItem: ICart) => {
    const cartStorage: ICartStorage[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cartStorage.filter(
          (item) =>
            item.productId !== cartItem?.product?.id &&
            item.size !== cartItem?.size &&
            item.color !== cartItem?.color
        )
      )
    );
    updateCartAfterRemoveItem(cartItem);
    showToast({
      content: "Đã xóa sản phẩm khỏi giỏ hàng!",
      duration: 5,
      type: "success",
    });
  };

  const updateCartAfterRemoveItem = (cartItem: ICart) => {
    // console.log(cartListRef.current);
    // console.log(cartItem);
    const newCart = cartListRef.current?.filter(
      (item) => {
        return item.product?.id !== cartItem?.product?.id ||
          item.size !== cartItem?.size ||
          item.color !== cartItem?.color
      }
    );
    // console.log(newCart);
    setCartList(newCart);
  };

  const clearCart = async () => {
    if (token) {
      try {
        const response = await cartApi.updateCart({});

        if (response.status === HttpCodeString.SUCCESS) {
          setCartList([]);
          showToast({
            content: "Đã xóa tất cả sản phẩm khỏi giỏ hàng!",
            duration: 5,
            type: "success",
          });
        } else {
          showToast({
            content: "Xóa giỏ hàng thất bại!",
            duration: 5,
            type: "error",
          });
        }
      } catch { }
    } else {
      localStorage.removeItem("cart");
      setCartList([]);
      showToast({
        content: "Đã xóa tất cả sản phẩm khỏi giỏ hàng!",
        duration: 5,
        type: "success",
      });
    }
  };

  const columns = useMemo(() => {
    let result: ColumnType<ICart>[] = [];
    if (!isMobile) {
      result.push({
        title: "Ảnh",
        dataIndex: "product.image",
        key: "listImage",
        render: (_: string, record: ICart) =>
          record?.product?.image ? (
            <img src={record?.product?.image} alt="product" className="w-12" />
          ) : null,
      });
    }
    result = result.concat([
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        responsive: ["xs", "sm", "md", "lg"],
        render: (_: any, record: ICart) => {
          return (
            <div className="name-are">
              <div className="name mb-1 font-semibold text-xl">
                {record?.product?.name}
              </div>
              <div className="size mb-1 text-gray-500">
                Kích thước: {record?.size}
              </div>
              <div className="color flex gap-2 text-gray-500">
                <span>Màu:</span>
                <div
                  className={`color w-5 h-5 shrink-0 rounded-[50%]`}
                  style={{ backgroundColor: record?.color }}
                ></div>
              </div>
            </div>
          );
        },
      },
      {
        title: "Giá",
        dataIndex: "priceRegular",
        key: "price",
        render: (_: any, record: ICart) => {
          return (
            <div className="price">
              {record?.product?.priceSale && (
                <div className="price-old text-gray-400 line-through text-sm">
                  {record?.product?.priceRegular?.toLocaleString()} đ
                </div>
              )}
              <div className="price-new text-red-600 text-lg font-bold ml-2">
                {record?.product?.priceSale?.toLocaleString() ||
                  record?.product?.priceRegular?.toLocaleString()}{" "}
                đ
              </div>
            </div>
          );
        },
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (_: number, record: ICart) => (
          <QuantitySelector
            style={{ width: 150, height: 28 }}
            min={1}
            max={record?.product?.quantity || 1}
            value={record?.quantity}
            onChange={(value) => updateQuantity(record, value || 1)}
          />
        ),
      },
      {
        title: "Thành tiền",
        key: "total",
        render: (_: any, record: ICart) =>
          `${(
            (record?.product?.priceSale || record?.product?.priceSale || 0) *
            record?.quantity
          ).toLocaleString()} đ`,
      },
      {
        title: "Hành động",
        key: "action",
        fixed: 'right',
        render: (_: any, record: any) => (
          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            onConfirm={() => removeFromCart(record)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Tooltip title={"Xóa"}>
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        ),
      },
    ]);
    return result;
  }, [isMobile]);

  return (
    <div className="container mx-auto py-4 px-4 md:px-6 md:py-8">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center mb-8">
        🛒 Giỏ hàng của bạn
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

      {cartList.length > 0 ? (
        <Card className="!bg-gray-100">
          <Table
            columns={columns}
            rowKey={"id"}
            dataSource={cartList}
            pagination={false}
          // scroll={isMobile ? { x: 600 } : undefined}
          />

          <div className="text-right mt-4 text-lg font-semibold">
            Tổng tiền:{" "}
            <span className="text-red-500">
              {totalAmount.toLocaleString()} đ
            </span>
          </div>

          <div className="flex flex-col md:flex-row justify-between mt-6 gap-3">
            <Link to="/shop" className="w-full md:w-auto">
              <Button
                type="default"
                block={isMobile}
                onClick={() => {
                  navigate("/");
                }}
              >
                🛍 Tiếp tục Shopping
              </Button>
            </Link>
            <Link to="/payment" className="w-full md:w-auto">
              <Button
                type="default"
                block={isMobile}
                onClick={() => {
                  navigate("/payment");
                }}
              >
                Thanh toán
              </Button>
            </Link>
            <Popconfirm
              title="Bạn có chắc muốn xóa toàn bộ giỏ hàng?"
              onConfirm={clearCart}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Button danger block={isMobile}>
                🗑 Xóa giỏ hàng
              </Button>
            </Popconfirm>
          </div>
        </Card>
      ) : (
        <p className="text-center text-gray-500">
          Giỏ hàng của bạn đang trống!
        </p>
      )}
    </div>
  );
};

export default Cart;
