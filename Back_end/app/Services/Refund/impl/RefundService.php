<?php



namespace App\Services\Refund\impl;

use App\Mail\RefundNotification;
use App\Services\Refund\IRefundService;
use App\Services\VnPay\impl\VnpayService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Models\User;

class RefundService implements IRefundService
{
    private $vnpayService;

    public function __construct(VnpayService $vnpayService)
    {
        $this->vnpayService = $vnpayService;
    }

    public function processRefund($orderId, $refundMethod)
    {
        try {
            \Log::info('Bắt đầu xử lý hoàn tiền', [
                'orderId' => $orderId,
                'refundMethod' => $refundMethod
            ]);

            $order = \App\Models\Order::with('user')->find($orderId);
            
            if (!$order) {
                \Log::error('Không tìm thấy đơn hàng', ['orderId' => $orderId]);
                throw new \Exception('Đơn hàng không tồn tại.');
            }

            \Log::info('Thông tin đơn hàng', [
                'order' => $order->toArray(),
                'payment_method' => $order->payment_method,
                'payment_status' => $order->payment_status,
                'status' => $order->status
            ]);

            if ($order->payment_method !== 'ONLINE' || $order->payment_status !== 'PAID') {
                \Log::error('Đơn hàng không hợp lệ để hoàn tiền', [
                    'order' => $order->toArray(),
                    'payment_method' => $order->payment_method,
                    'payment_status' => $order->payment_status
                ]);
                throw new \Exception('Đơn hàng không hợp lệ để hoàn tiền.');
            }

            if (!in_array($order->status, ['Cancel Confirm', 'Cancel'])) {
                \Log::error('Trạng thái đơn hàng không hợp lệ để hoàn tiền', [
                    'order' => $order->toArray(),
                    'status' => $order->status
                ]);
                throw new \Exception('Chỉ có thể hoàn tiền cho đơn hàng đã hủy hoặc hủy xác nhận.');
            }

            // Lấy email từ đơn hàng
            $userEmail = $order->email;
            if (empty($userEmail)) {
                \Log::error('Không tìm thấy email trong đơn hàng', [
                    'order' => $order->toArray()
                ]);
                throw new \Exception('Không thể gửi thông báo hoàn tiền vì không tìm thấy email trong đơn hàng.');
            }

            if ($refundMethod === 'DIRECT') {
                \Log::info('Bắt đầu hoàn tiền trực tiếp qua VNPay', [
                    'orderId' => $order->id,
                    'transaction_id' => $order->transaction_id,
                    'amount' => $order->total_price
                ]);

                // Process direct refund through VNPay
$refundResponse = $this->vnpayService->refund($order->transaction_id, $order->total_price);
                
                \Log::info('Kết quả hoàn tiền VNPay', [
                    'orderId' => $order->id,
                    'refundResponse' => $refundResponse
                ]);

                if ($refundResponse['success']) {
                    // Cập nhật trạng thái đơn hàng
                    $updateResult = $order->update([
                        'payment_status' => 'REFUNDED',
                        'status' => 'Cancel',
                        'refundCompleted' => true,
                        'refund_date' => now(),
                        'refund_transaction_id' => $refundResponse['response']['vnp_TransactionNo'] ?? null,
                        'updated_at' => now()
                    ]);

                    if (!$updateResult) {
                        \Log::error('Không thể cập nhật trạng thái đơn hàng sau khi hoàn tiền', [
                            'orderId' => $order->id,
                            'refundResponse' => $refundResponse
                        ]);
                        throw new \Exception('Không thể cập nhật trạng thái đơn hàng sau khi hoàn tiền.');
                    }
                    
                    // Gửi email thông báo
                    $this->sendRefundNotification($order, 'DIRECT', null, $userEmail);
                    
                    \Log::info('Hoàn tiền thành công', [
                        'orderId' => $order->id,
                        'transactionId' => $order->transaction_id,
                        'refundResponse' => $refundResponse
                    ]);
                    
                    return [
                        'success' => true,
                        'message' => 'Hoàn tiền thành công! Vui lòng kiểm tra VNPay để xác nhận giao dịch.',
                        'order' => $order
                    ];
                }
                
                \Log::error('Hoàn tiền thất bại', [
                    'orderId' => $order->id,
                    'transactionId' => $order->transaction_id,
                    'refundResponse' => $refundResponse
                ]);
                
                throw new \Exception('Hoàn tiền thất bại: ' . ($refundResponse['message'] ?? 'Không xác định'));
            } else {
                \Log::info('Bắt đầu tạo mã QR hoàn tiền', [
                    'orderId' => $order->id
                ]);

                // Generate QR code for manual refund
                $qrCode = $this->generateRefundQRCode($order);
                
                // Update order status to indicate QR code has been sent
                $updateResult = $order->update([
                    'refundCompleted' => true,
                    'refund_date' => now(),
                    'updated_at' => now()
]);

                if (!$updateResult) {
                    \Log::error('Không thể cập nhật trạng thái đơn hàng sau khi tạo mã QR', [
                        'orderId' => $order->id
                    ]);
                    throw new \Exception('Không thể cập nhật trạng thái đơn hàng sau khi tạo mã QR.');
                }
                
                $this->sendRefundNotification($order, 'QR_CODE', $qrCode, $userEmail);
                
                \Log::info('Đã gửi mã QR hoàn tiền', [
                    'orderId' => $order->id,
                    'email' => $userEmail
                ]);
                
                return [
                    'success' => true,
                    'message' => 'Đã gửi mã QR hoàn tiền qua email khách hàng! Vui lòng kiểm tra email.',
                    'order' => $order
                ];
            }
        } catch (\Exception $e) {
            \Log::error('Lỗi khi xử lý hoàn tiền', [
                'orderId' => $orderId,
                'refundMethod' => $refundMethod,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function sendRefundNotification($order, $refundMethod, $qrCode = null, $userEmail = null)
    {
        try {
            if (empty($userEmail)) {
                throw new \Exception('Không thể gửi thông báo hoàn tiền vì không tìm thấy email trong đơn hàng.');
            }

            $refundData = [
                'order' => $order,
                'refundMethod' => $refundMethod,
                'qrCode' => $qrCode
            ];

            // Gửi email trực tiếp thay vì sử dụng queue
            Mail::to($userEmail)
                ->send(new RefundNotification($refundData));

            \Log::info('Đã gửi thông báo hoàn tiền:', [
                'orderId' => $order->id,
                'email' => $userEmail,
                'refundMethod' => $refundMethod
            ]);

        } catch (\Exception $e) {
            \Log::error('Lỗi khi gửi thông báo hoàn tiền:', [
                'orderId' => $order->id,
                'email' => $userEmail,
                'error' => $e->getMessage()
            ]);
            throw new \Exception('Không thể gửi thông báo hoàn tiền: ' . $e->getMessage());
        }
    }

    public function generateRefundQRCode($order)
    {
        try {
            $refundData = [
                'order_id' => $order->id,
                'amount' => $order->total_price,
                'timestamp' => now()->timestamp
            ];

            // Generate QR code as SVG string
            return QrCode::size(300)
                ->format('svg')
                ->generate(json_encode($refundData));
        } catch (\Exception $e) {
            Log::error('Lỗi khi tạo mã QR:', ['orderId' => $order->id,
                'error' => $e->getMessage()
            ]);
            throw new \Exception('Không thể tạo mã QR: ' . $e->getMessage());
        }
    }
}
