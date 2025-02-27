import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICart } from "../interface/Cart";
import "../layout/cart.css";

const CART_KEY = "cart";

export const GetCart = (): ICart[] => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

const SaveCart = (cart: ICart[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated")); 
};

export const UpdateCartItem = (id: number, quantity: number, size: string, color: string) => {
    let cart = GetCart();
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = quantity;
        cart[itemIndex].size = size;
        cart[itemIndex].color = color;
    }
    SaveCart(cart);
    return cart;
};
export const AddToCart = (item: ICart) => {
    const startTime = performance.now();
    let cart = GetCart();
    const itemIndex = cart.findIndex(
        (cartItem) => cartItem.id === item.id && cartItem.size === item.size && cartItem.color === item.color
    );

    if (itemIndex !== -1) {
        cart[itemIndex].quantity += item.quantity;
    } else {
        cart.push(item);
    }

    SaveCart(cart);
    const endTime = performance.now();
    console.log(`AddToCart took ${endTime - startTime}ms`);
    return cart;
};

export const RemoveFromCart = (id: number) => {
    let cart = GetCart().filter((item) => item.id !== id);
    SaveCart(cart);
    return cart;
};

export const GetCartLength = (): number => {
    const cart = GetCart();
    return cart.reduce((acc, item) => acc + item.quantity, 0);
};

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
        return { colors: [], sizes: [] };
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

        fetchColorsAndSizes().then((data) => {
            setColors(data.colors || []);
            setSizes(data.sizes || []);
        });
    }, []);

    const handleUpdate = (id: number, quantity: number, size: string, color: string) => {
        if (quantity < 1) return;  
        const startTime = performance.now();
        const updatedCart = UpdateCartItem(id, quantity, size, color);
        setCart(updatedCart);
        setTotal(updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0));
        const endTime = performance.now();
        console.log(`handleUpdate took ${endTime - startTime}ms`);
    };

    const handleRemove = (id: number) => {
        const startTime = performance.now();
        const updatedCart = RemoveFromCart(id);
        setCart(updatedCart);
        setTotal(updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0));
        const endTime = performance.now();
        console.log(`handleRemove took ${endTime - startTime}ms`);
    };

    const handleCheckout = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/checkout");
        } else {
            navigate("/checkout?guest=true");
        }
    };

    return (
        <div className="cart-container">
            <h2>Giỏ hàng</h2>
            {cart.length === 0 ? (
                <p>Giỏ hàng của bạn đang trống.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <label>Màu sắc:</label>
                                <select
                                    value={item.color}
                                    onChange={(e) => handleUpdate(item.id, item.quantity, item.size, e.target.value)}
                                >
                                    {colors.map((color) => (
                                        <option key={color.id} value={color.name}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <label>Kích thước:</label>
                                <select
                                    value={item.size}
                                    onChange={(e) => handleUpdate(item.id, item.quantity, e.target.value, item.color)}
                                >
                                    {sizes.map((size) => (
                                        <option key={size.id} value={size.name}>
                                            {size.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="quantity-control">
                                    <button
                                        onClick={() => handleUpdate(item.id, item.quantity - 1, item.size, item.color)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleUpdate(item.id, Number(e.target.value), item.size, item.color)}
                                    />
                                    <button onClick={() => handleUpdate(item.id, item.quantity + 1, item.size, item.color)}>
                                        +
                                    </button>
                                </div>
                                <p>
                                    {item.quantity} x {item.price.toLocaleString()} VND
                                </p>
                                <p>
                                    <b>Tổng: {(item.quantity * item.price).toLocaleString()} VND</b>
                                </p>
                                <button className="btn-removecart " onClick={() => handleRemove(item.id)}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <h3>Tổng đơn hàng: {total.toLocaleString()} VND</h3>
            <button className="btn-checkout" onClick={handleCheckout} disabled={cart.length === 0}>
                Thanh toán COD
            </button>
        </div>
    );
};

export default Cart;