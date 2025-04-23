import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentMethod from '../components/payment/PaymentMethod';
import { createMoMoPayment, createVNPayPayment, createOrder } from '../services/paymentService';
import { toast } from 'react-toastify';

export default function Checkout() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSelectMethod = (method: string) => {
    setSelectedMethod(method);
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán');
      return;
    }

    try {
      setIsProcessing(true);
      
      // Lấy thông tin giỏ hàng và địa chỉ giao hàng từ state hoặc context
      const orderData = {
        items: [], // Thêm items từ giỏ hàng
        totalAmount: 212500, // Thêm tổng tiền từ giỏ hàng
        shippingAddress: {}, // Thêm địa chỉ giao hàng
        paymentMethod: selectedMethod,
      };

      const order = await createOrder(orderData);

      if (selectedMethod === 'momo') {
        const payment = await createMoMoPayment(
          orderData.totalAmount,
          `Thanh toán đơn hàng #${order.id}`
        );
        if (payment.payUrl) {
          window.location.href = payment.payUrl;
        } else {
          throw new Error('Không nhận được URL thanh toán từ MoMo');
        }
      } else if (selectedMethod === 'vnpay') {
        const payment = await createVNPayPayment(
          orderData.totalAmount,
          `Thanh toán đơn hàng #${order.id}`
        );
        if (payment.payUrl) {
          window.location.href = payment.payUrl;
        } else {
          throw new Error('Không nhận được URL thanh toán từ VNPay');
        }
      } else if (selectedMethod === 'cod') {
        toast.success('Đơn hàng đã được tạo thành công!');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="payment-section">
        <h3>Thông tin thanh toán</h3>
        <div className="payment-info">
          <div className="amount-info">
            <p>Giảm giá: <span>0 đ</span></p>
            <p className="total">Thành tiền: <span>212,500 đ</span></p>
          </div>
          <div className="payment-method">
            <p className="required">* Phương thức thanh toán</p>
            <PaymentMethod 
              onSelectMethod={handleSelectMethod}
              selectedMethod={selectedMethod}
            />
          </div>
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="payment-button"
          >
            {isProcessing ? 'Đang xử lý...' : 'Thanh toán'}
          </button>
        </div>
      </div>
    </div>
  );
} 