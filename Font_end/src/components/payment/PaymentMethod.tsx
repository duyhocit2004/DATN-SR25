import React from 'react';
import { PaymentMethod } from '@/utils/constants';
import './PaymentMethod.css';
import { FaMoneyBillWave, FaCreditCard, FaQrcode } from 'react-icons/fa';

interface PaymentMethodProps {
  onSelectMethod: (method: string) => void;
  selectedMethod: string;
}

export default function PaymentMethod({ onSelectMethod, selectedMethod }: PaymentMethodProps) {
  return (
    <div className="payment-methods">
      <div className="payment-type mb-3">
        <div className="payment-option">
          <input
            type="radio"
            id="cod"
            name="paymentType"
            value={PaymentMethod.COD}
            checked={selectedMethod === PaymentMethod.COD}
            onChange={() => onSelectMethod(PaymentMethod.COD)}
            className="me-2"
          />
          <label htmlFor="cod">
            <FaMoneyBillWave />
            Thanh toán COD
          </label>
        </div>
        <div className="payment-option" data-online="true">
          <input
            type="radio"
            id="online"
            name="paymentType"
            value={PaymentMethod.ONLINE}
            checked={selectedMethod === PaymentMethod.ONLINE}
            onChange={() => onSelectMethod(PaymentMethod.ONLINE)}
            className="me-2"
          />
          <label htmlFor="online">
            <FaCreditCard />
            Thanh toán Online
          </label>
        </div>
      </div>

      {selectedMethod === PaymentMethod.ONLINE && (
        <div className="online-payment-methods">
          <div className="payment-option" data-online="true">
            <input
              type="radio"
              id="vnpay"
              name="onlineMethod"
              value="VNPAY"
              checked={selectedMethod === 'VNPAY'}
              onChange={() => onSelectMethod('VNPAY')}
              className="me-2"
            />
            <label htmlFor="vnpay">
              <FaQrcode />
              VNPay
            </label>
          </div>
          <div className="payment-option" data-online="true">
            <input
              type="radio"
              id="momo"
              name="onlineMethod"
              value="MOMO"
              checked={selectedMethod === 'MOMO'}
              onChange={() => onSelectMethod('MOMO')}
              className="me-2"
            />
            <label htmlFor="momo">
              <FaQrcode />
              Momo
            </label>
          </div>
        </div>
      )}
    </div>
  );
} 