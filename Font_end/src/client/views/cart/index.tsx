// Cart
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Table, Button, Popconfirm, Card, Tooltip, Spin, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useWindowSize from "@/hooks/useWindowSize";
import QuantitySelector from "@/components/quantity-selector";
import { ICart, ICartStorage, IProductCartStorage } from "@/types/interface";
import { ColumnType } from "antd/es/table";
import { cloneDeep, debounce, size } from "lodash";
import { useAppDispatch } from "@/store/hooks";
import { useAuth } from "@/context/AuthContext";
import cartApi from "@/api/cartApi";
import { HttpCodeString } from "@/utils/constants";
import { showToast } from "@/components/toast";
import "./style/cart.scss"
import React from "react";

const Cart = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [cartList, setCartList] = useState<ICart[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const { isMobile } = useWindowSize();
  const { token } = useAuth();
  const cartListRef = useRef<ICart[]>([]);

  useEffect(() => {
    getCartInfo();
  }, [token]);

  useEffect(() => {
    cartListRef.current = cartList;
    // Tính tổng tiền chỉ cho các sản phẩm được chọn
    const totalPrice = cartList
      .filter((item) => selectedItems.includes(item.id?.toString() || `${item.productId}-${item.size}-${item.color}`))
      .reduce(
        (total, item) =>
          total +
          (item?.product?.priceSale || item?.product?.priceRegular || 0) *
          item.quantity,
        0
      );
    setTotalAmount(totalPrice);
  }, [cartList, selectedItems]);

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
        cartId: record.id, // Use cartId, not productId
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
    } catch {
      showToast({
        content: "Cập nhật giỏ hàng thất bại!",
        duration: 5,
        type: "error",
      });
    }
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
    localStorage.setItem("cart", JSON.stringify(newCartStorage));
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

  const debouncedUpdateCart = useCallback(debounce(updateCartData, 1000), [
    token,
    cartList,
  ]);

  const updateQuantity = (record: ICart, quantity: number) => {
    debouncedUpdateCart(record, quantity);
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
            item.productId !== cartItem?.product?.id ||
            item.size !== cartItem?.size ||
            item.color !== cartItem?.color
        )
      )
    );
    updateCartAfterRemoveItem(cartItem);
  };

  const updateCartAfterRemoveItem = (cartItem: ICart) => {
    const newCart = cartListRef.current?.filter(
      (item) =>
        item.product?.id !== cartItem?.product?.id ||
        item.size !== cartItem?.size ||
        item.color !== cartItem?.color
    );
    setCartList(newCart);
    setSelectedItems((prev) =>
      prev.filter(
        (id) =>
          id !== cartItem.id?.toString() &&
          id !== `${cartItem.productId}-${cartItem.size}-${cartItem.color}`
      )
    );
  };

  const clearCart = async () => {
    if (token) {
      try {
        const response = await cartApi.updateCart({});
        if (response.status === HttpCodeString.SUCCESS) {
          setCartList([]);
          setSelectedItems([]);
        }
      } catch { }
    } else {
      localStorage.removeItem("cart");
      setCartList([]);
      setSelectedItems([]);
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
        cartList.map((item) => item.id?.toString() || `${item.productId}-${item.size}-${item.color}`)
      );
    } else {
      setSelectedItems([]);
    }
  };

  const columns = useMemo(() => {
    let result: ColumnType<ICart>[] = [];
    result.push({
      title: (
        <div className="flex items-center gap-2">
          <Checkbox
            onChange={handleSelectAll}
            checked={selectedItems.length === cartList.length && cartList.length > 0}
          />
          <span className="text-sm font-medium">Tất cả</span>
        </div>
      ),
      dataIndex: "select",
      key: "select",
      width: 60,
      fixed: 'left',
      render: (_: any, record: ICart) => (
        <div style={{ position: 'relative', zIndex: 30 }}>
          <Checkbox
            checked={selectedItems.includes(
              record.id?.toString() || `${record.productId}-${record.size}-${record.color}`
            )}
            onChange={() =>
              handleCheckboxChange(
                record.id?.toString() || `${record.productId}-${record.size}-${record.color}`
              )
            }
          />
        </div>
      ),
    });
    if (!isMobile) {
      result.push({
        title: "Ảnh",
        dataIndex: "product.image",
        key: "listImage",
        render: (_: string, record: ICart) =>
          record?.product?.image ? (
            <img
              src={record?.product?.image}
              alt="product"
              className="w-12 cursor-pointer"
              onClick={() => navigate(`/products/${record.product?.id}`)}
            />
          ) : null,
      });
    }
    result = result.concat([
      {
        title: "Tên sản phẩm",
        dataIndex: "name",
        key: "name",
        responsive: ["xs", "sm", "md", "lg"],
        render: (_: any, record: ICart) => (
          <div className="relative" style={{ minHeight: 80 }}>
            {record.product?.status === 'out_of_stock' && (
              <div style={{position: 'absolute', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
                <span className="bg-gray-500 text-white px-6 py-3 rounded text-lg font-semibold shadow">Sản phẩm đã hết hàng</span>
              </div>
            )}
            <div className={`name-are ${record.product?.status === 'out_of_stock' ? 'opacity-50' : ''}`}> 
              <div
                className={`name mb-1 font-semibold text-xl ${record.product?.status !== 'out_of_stock' ? 'cursor-pointer text-blue-600 hover:underline' : 'text-gray-400'}`}
                onClick={() => record.product?.status !== 'out_of_stock' && navigate(`/products/${record.product?.id}`)}
              >
                {record?.product?.name}
              </div>
              <div className="size mb-1 text-gray-500">
                Kích thước: {record?.size}
              </div>
              <div className="color flex gap-2 text-gray-500 ">
                <span>Màu:</span>
                <div
                  className="color w-5 h-5 shrink-0 rounded-[50%]"
                  style={{
                    backgroundColor: record?.color,
                    border: record?.color?.toLowerCase() === "#ffffff" || record?.color?.toLowerCase() === "white"
                      ? "2px solid #ccc"
                      : "none"
                  }}
                ></div>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Giá",
        dataIndex: "priceRegular",
        key: "price",
        render: (_: any, record: ICart) => (
          <div className="price flex flex-col">
            {record?.product?.priceSale && (
              <div className="price-old text-gray-500 line-through text-sm">
                {record?.product?.priceRegular?.toLocaleString()} đ
              </div>
            )}
            <div className="price-new text-red-600 text-lg font-bold">
              {record?.product?.priceSale?.toLocaleString() ||
                record?.product?.priceRegular?.toLocaleString()}{" "}đ
            </div>
          </div>

        ),
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        render: (_: number, record: ICart) => (
          <QuantitySelector
            style={{ width: 100, height: 28 }}
            min={1}
            max={record?.product?.quantity || 1}
            value={record?.quantity}
            onChange={() => {}}
            disabled={true}
          />
        ),
      },
      {
        title: "Thành tiền",
        key: "total",
        render: (_: any, record: ICart) =>
          `${(
            (record?.product?.priceSale || record?.product?.priceRegular || 0) *
            record?.quantity
          ).toLocaleString()
          } đ`,
      },
      {
        title: "Hành động",
        key: "action",
        fixed: "right",
        render: (_: any, record: ICart) => (
          <div className="flex gap-2" style={{ position: 'relative', zIndex: 30 }}>
            <Popconfirm
              title="Bạn có chắc muốn xóa sản phẩm này?"
              onConfirm={() => removeFromCart(record)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <Tooltip title="Xóa">
                <Button danger icon={<DeleteOutlined />} />
              </Tooltip>
            </Popconfirm>
          </div>
        ),
      },
    ]);
    return result;
  }, [isMobile, selectedItems, cartList, navigate]);

  const handleBuySelected = () => {
    if (selectedItems.length === 0) {
      showToast({
        content: "Vui lòng chọn ít nhất một sản phẩm để mua!",
        duration: 5,
        type: "error",
      });
      return;
    }
    // Không cho phép mua sản phẩm hết hàng
    const hasOutOfStockItems = cartList.some(
      (item) =>
        selectedItems.includes(item.id?.toString() || `${item.productId}-${item.size}-${item.color}`) &&
        item.product?.status === 'out_of_stock'
    );
    if (hasOutOfStockItems) {
      showToast({
        content: "Không thể mua sản phẩm đã hết hàng!",
        duration: 5,
        type: "error",
      });
      return;
    }
    const selectedCartItems = cartList.filter((item) =>
      selectedItems.includes(item.id?.toString() || `${item.productId}-${item.size}-${item.color}`)
    );
    navigate("/payment", {
      state: { selectedCartItems },
    });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-heading">🛒 Giỏ hàng của bạn</h2>
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}

      {cartList.length > 0 ? (
        <Card>
          <div className="table-container">
            <Table
              columns={columns}
              rowKey={(record) => record.id?.toString() || `${record.productId}-${record.size}-${record.color}`}
              dataSource={cartList}
              pagination={false}
              rowClassName={(record) => record.product?.status === 'out_of_stock' ? 'opacity-50' : ''}
            />
          </div>

          <div className="cart-footer">
            <div className="total-amount">
              Tổng tiền:{" "}
              <span className="text-red-500">
                {totalAmount.toLocaleString()} đ
              </span>
            </div>

            <div className="footer-buttons">
              <Link to="/shop" className="w-full md:w-auto">
                <Button type="default" block={isMobile}>
                  🛍 Tiếp tục Shopping
                </Button>
              </Link>
              <Button type="default" block={isMobile} onClick={handleBuySelected}>
                Mua Hàng
              </Button>
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
          </div>
        </Card>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg mb-4">Giỏ hàng của bạn đang trống!</p>
          <Link to="/products">
            <Button type="primary">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;