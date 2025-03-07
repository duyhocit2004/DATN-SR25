import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import '../component/css/checkout.css'

const Checkout = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState<any>(null);
    const [isGuest, setIsGuest] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        note: "",
    });

    useEffect(() => {
        const savedOrder = localStorage.getItem("pendingOrder");
        if (savedOrder) {
            console.log("Đơn hàng chưa gửi:", JSON.parse(savedOrder));
            alert("Bạn có đơn hàng chưa gửi, vui lòng thử lại!");
        }
    }, []);
    

    // Xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleConfirmOrder = () => {
        const cart = localStorage.getItem("cart");
        if (!cart) return alert("Giỏ hàng rỗng!");
    
        const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    
        const newOrder = {
            id: existingOrders.length > 0 ? existingOrders[existingOrders.length - 1].id + 1 : 1,
            order_code: `ORD${Math.floor(Math.random() * 100000)}`,
            user_name: formData.name,
            email: "test@example.com",
            phone_number: formData.phone,
            address: formData.address,
            total_price: JSON.parse(cart).reduce((acc: number, item: any) => acc + item.price * item.quantity, 0),
            shipping_fee: 30000,
            status: "Chờ xác nhận",
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            cart: JSON.parse(cart),
        };
    
        existingOrders.push(newOrder);
        localStorage.setItem("orders", JSON.stringify(existingOrders));
        localStorage.removeItem("cart");
    
        alert("Đặt hàng thành công!");
        navigate("/orders");
    };
    
    
    
    return (
        <div className="checkout-container">
            <h2>Thanh toán</h2>

            <label>Họ và tên:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />

            <label>Số điện thoại:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

            <label>Địa chỉ nhận hàng:</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />

            <label>Ghi chú:</label>
            <textarea name="note" value={formData.note} onChange={handleChange}></textarea>

            <button onClick={handleConfirmOrder}>Xác nhận đơn hàng</button>
        </div>
    );
};

export default Checkout;
