import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export const createMoMoPayment = async (amount: number, orderInfo: string) => {
  try {
    const response = await axios.post(`${API_URL}/payment/create`, {
      amount,
      orderInfo,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating MoMo payment:', error);
    throw error;
  }
};

export const createVNPayPayment = async (amount: number, orderInfo: string) => {
  try {
    const response = await axios.post(`${API_URL}/api/vnpay/create`, {
      amount,
      orderInfo,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating VNPay payment:', error);
    throw error;
  }
};

export const createOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders`, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}; 