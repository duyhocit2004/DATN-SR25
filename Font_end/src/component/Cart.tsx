import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICart } from "../interface/Cart";
import "../layout/cart.css";

const CART_KEY = "cart";

// Lấy giỏ hàng từ LocalStorage
export const GetCart = (): ICart[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng vào LocalStorage
const SaveCart = (cart: ICart[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Cập nhật sản phẩm trong giỏ hàng
export const UpdateCartItem = (id: number, quantity: number, size: string, color: string) => {
    let cart = GetCart();
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        cart[itemIndex].size = size;
        cart[itemIndex].color = color;
    }
    SaveCart(cart);
    return cart;
};

// Xóa sản phẩm khỏi giỏ hàng
export const RemoveFromCart = (id: number) => {
    let cart = GetCart().filter(item => item.id !== id);
    SaveCart(cart);
    return cart;
};

// Fetch danh sách màu sắc và kích thước từ API
const fetchColorsAndSizes = async () => {
    try {
        const colorsResponse = await fetch("http://127.0.0.1:8000/api/colors");
        const sizesResponse = await fetch("http://127.0.0.1:8000/api/sizes");

        if (!colorsResponse.ok || !sizesResponse.ok) {
            throw new Error("Lỗi khi tải dữ liệu từ API");
        }

        const colors = await colorsResponse.json();
        const sizes = await sizesResponse.json();
        return { colors, sizes };
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu màu sắc và kích thước:", error);
        return { colors: [], sizes: [] }; // Tránh crash app
    }
};

const Cart = () => {
    const [cart, setCart] = useState<ICart[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [colors, setColors] = useState<any[]>([]);
    const [sizes, setSizes] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cartData = GetCart();
        setCart(cartData);
        setTotal(cartData.reduce((acc, item) => acc + item.price * item.quantity, 0));

        fetchColorsAndSizes().then(data => {
            setColors(data.colors || []);
            setSizes(data.sizes || []);
        });
    }, []);

    const handleRemove = (id: number) => {
        const updatedCart = RemoveFromCart(id);
        setCart(updatedCart);
        setTotal(updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    };

    const handleUpdate = (id: number, quantity: number, size: string, color: string) => {
        const updatedCart = UpdateCartItem(id, quantity, size, color);
        setCart(updatedCart);
        setTotal(updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0));
    };

    const handleCheckout = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/checkout"); // Nếu đăng nhập, đến trang checkout
        } else {
            navigate("/checkout?guest=true"); // Nếu chưa đăng nhập, đến trang nhập thông tin
        }
    };

    return (
        <div className="cart-container">
            <h2>Giỏ hàng</h2>
            {cart.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="cart-items">
                    {cart.map(item => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>

                                {/* Chọn màu sắc */}
                                <label>Màu sắc:</label>
                                <select value={item.color} onChange={(e) => handleUpdate(item.id, item.quantity, item.size, e.target.value)}>
                                    {colors.map(color => (
                                        <option key={color.id} value={color.name}>{color.name}</option>
                                    ))}
                                </select>

                                {/* Chọn kích thước */}
                                <label>Kích thước:</label>
                                <select value={item.size} onChange={(e) => handleUpdate(item.id, item.quantity, e.target.value, item.color)}>
                                    {sizes.map(size => (
                                        <option key={size.id} value={size.name}>{size.name}</option>
                                    ))}
                                </select>

                                {/* Chỉnh số lượng */}
                                <div className="quantity-control">
                                    <button onClick={() => handleUpdate(item.id, item.quantity - 1, item.size, item.color)} disabled={item.quantity <= 1}>-</button>
                                    <input type="number" value={item.quantity} onChange={(e) => handleUpdate(item.id, Number(e.target.value), item.size, item.color)} />
                                    <button onClick={() => handleUpdate(item.id, item.quantity + 1, item.size, item.color)}>+</button>
                                </div>

                                {/* Hiển thị giá */}
                                <p>{item.quantity} x {item.price.toLocaleString()} VND</p>
                                <p><b>Tổng: {(item.quantity * item.price).toLocaleString()} VND</b></p>
                                <button className="btn-remove" onClick={() => handleRemove(item.id)}>Xóa</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h3>Tổng đơn hàng: {total.toLocaleString()} VND</h3>
            <button className="btn-checkout" onClick={handleCheckout}>Thanh toán COD</button>
        </div>
    );
};

export default Cart;
