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
        // Kiểm tra nếu là khách vãng lai
        setIsGuest(searchParams.get("guest") === "true");

        // Nếu không phải khách vãng lai, lấy thông tin user từ API
        const token = localStorage.getItem("token");
        if (token && !isGuest) {
            fetch("http://127.0.0.1:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser(data);
                    setFormData({
                        name: data.name || "",
                        phone: data.phone || "",
                        address: data.address || "",
                        note: "",
                    });
                })
                .catch((error) => console.error("Lỗi lấy thông tin user:", error));
        }
    }, [searchParams]);

    // Xử lý thay đổi form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Xử lý xác nhận đơn hàng
    const handleConfirmOrder = () => {
        const cart = localStorage.getItem("cart");
        if (!cart) return alert("Giỏ hàng rỗng!");

        const orderData = {
            ...formData,
            cart: JSON.parse(cart),
        };

        fetch("http://127.0.0.1:8000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Đặt hàng thành công!");
                localStorage.removeItem("cart");
                navigate("/"); // Quay về trang chủ
            })
            .catch((error) => console.error("Lỗi đặt hàng:", error));
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
