<?php

namespace App\Services\Refund\impl;

use App\Mail\RefundNotification;
use App\Services\Refund\IRefundService;
use App\Services\VnPay\impl\VnpayService;
use Illuminate\Support\Facades\Mail;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class RefundService implements IRefundService
{
    private $vnpayService;

    public function __construct(VnpayService $vnpayService)
    {
        $this->vnpayService = $vnpayService;
    }

    public function processRefund($orderId, $refundMethod)
    {
        $order = \App\Models\Order::find($orderId);
        
        if (!$order) {
            throw new \Exception('Đơn hàng không tồn tại.');
        }

        if ($order->payment_method !== 'ONLINE' || $order->payment_status !== 'PAID') {
            throw new \Exception('Đơn hàng không hợp lệ để hoàn tiền.');
        }

        if (!in_array($order->status, ['Cancel', 'Cancel_confirm'])) {
            throw new \Exception('Chỉ có thể hoàn tiền cho đơn hàng đã hủy hoặc hủy xác nhận.');
        }

        if (empty($order->email)) {
            throw new \Exception('Không thể gửi thông báo hoàn tiền vì không tìm thấy email của người dùng.');
        }

        if ($refundMethod === 'DIRECT') {
            // Process direct refund through VNPay
            $refundResponse = $this->vnpayService->refund($order->transaction_id, $order->total_price);
            
            if ($refundResponse['success']) {
                $order->update([
                    'payment_status' => 'REFUNDED',
                    'status' => 'Cancel',
                    'refundCompleted' => true,
                    'updated_at' => now()
                ]);
                
                $this->sendRefundNotification($order, 'DIRECT');
                return true;
            }
            throw new \Exception('Hoàn tiền thất bại.');
        } else {
            // Generate QR code for manual refund
            $qrCode = $this->generateRefundQRCode($order);
            $this->sendRefundNotification($order, 'QR_CODE', $qrCode);
            return true;
        }
    }

    public function sendRefundNotification($order, $refundMethod, $qrCode = null)
    {
        if (empty($order->email)) {
            throw new \Exception('Không thể gửi thông báo hoàn tiền vì không tìm thấy email của người dùng.');
        }

        $refundData = [
            'order' => $order,
            'refundMethod' => $refundMethod,
            'qrCode' => $qrCode
        ];

        Mail::to($order->email)->send(new RefundNotification($refundData));
    }

    public function generateRefundQRCode($order)
    {
        $refundData = [
            'order_id' => $order->id,
            'amount' => $order->total_price,
            'timestamp' => now()->timestamp
        ];

        // Generate QR code as SVG string
        return QrCode::size(300)
            ->format('svg')
            ->generate(json_encode($refundData));
    }
} 