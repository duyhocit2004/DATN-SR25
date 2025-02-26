import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

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
    
        const orderData = {
            ...formData,
            cart: JSON.parse(cart),
        };
    
        // Lưu đơn hàng vào localStorage (tạm thời)
        localStorage.setItem("pendingOrder", JSON.stringify(orderData));
    
        fetch("http://127.0.0.1:8000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Đặt hàng thành công!");
                localStorage.removeItem("cart");
                localStorage.removeItem("pendingOrder");
                navigate("/");
            })
            .catch((error) => {
                console.error("Lỗi đặt hàng:", error);
                alert("Đặt hàng thất bại, sẽ thử lại sau!");
            });
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
