<?php

namespace App\Services\VnPay\impl;

use App\Repositories\OrderRepositories;
use App\Services\VnPay\IVnpayService;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


class VnpayService implements IVnpayService{

    public OrderRepositories $orderRepositories;
    public function __construct(OrderRepositories   $orderRepositories)
    {
        $this->orderRepositories = $orderRepositories;
    }

    public function createPaymentUrl($orderCode, $amount)
    {
        
        $orderDescription = "Thanh toán đơn hàng " . $orderCode;

        $vnp_TmnCode = env('VNP_TMN_CODE'); // Mã website từ VNPAY
        $vnp_HashSecret = env('VNP_HASH_SECRET'); // Chuỗi ký bí mật
        $vnp_Url = env('VNP_URL'); // URL VNPAY (ví dụ: sandbox)
        $vnp_ReturnUrl = env('VNP_RETURN_URL'); // URL xử lý khi thanh toán xong

        $vnp_TxnRef = $orderCode; // Mã giao dịch
        $vnp_OrderInfo = $orderDescription; // Mô tả đơn hàng
        $vnp_Amount = $amount * 100; // Số tiền tính theo VND
        $vnp_IpAddr = '127.0.0.1'; // IP của khách hàng
        $vnp_Locale = 'vn'; // Ngôn ngữ (mặc định: 'vn')

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_ExpireDate" => date('YmdHis', strtotime('+15 minutes')),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => '100000',
            "vnp_ReturnUrl" => $vnp_ReturnUrl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        // Sắp xếp theo thứ tự key tăng dần
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret);//
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        return $vnp_Url;
    }


    public function handleReturn(Request $request)
    {
        $secureHash = $request->input('vnp_SecureHash');
        $inputData = array();
        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        unset($inputData['vnp_SecureHash']);
        ksort($inputData);
        $i = 0;
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashData = $hashData . '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashData = $hashData . urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
        }

        $secureHash = hash_hmac('sha512', $hashData, env('VNP_HASH_SECRET'));

        if ($secureHash === $request->input('vnp_SecureHash')) {
            if ($request->input('vnp_ResponseCode') == "00") {
                // Cập nhật thông tin đơn hàng
                $order = $this->orderRepositories->updateOrderPayment(
                    $request->input('vnp_TxnRef'),
                    'PAID'
                );
                
                // Cập nhật transaction_id và các thông tin khác
                if ($order) {
                    $order->update([
                        'transaction_id' => $request->input('vnp_TransactionNo'),
                        'payment_status' => 'PAID',
                        'date' => now(),
                        'updated_at' => now()
                    ]);
                }
                
                return 'http://localhost:5173/vnpay-return?vnp_ResponseCode=' . $request->input('vnp_ResponseCode') . '&vnp_TransactionNo=' . $request->input('vnp_BankTranNo');
            } else {
                return 'http://localhost:5173/vnpay-return?vnp_ResponseCode=' . $request->input('vnp_ResponseCode') . '&vnp_TransactionNo=' . $request->input('vnp_BankTranNo');
            }
        } else {
            return 'http://localhost:5173/vnpay-return?status=invalid';
        }
    }
    
    public function refund($transactionId, $amount)
    {
        try {
            $vnp_TmnCode = env('VNP_TMN_CODE');
            $vnp_HashSecret = env('VNP_HASH_SECRET');
            $vnp_Url = env('VNP_URL');

            $inputData = [
                "vnp_Version" => "2.1.0",
                "vnp_TmnCode" => $vnp_TmnCode,
                "vnp_Command" => "refund",
                "vnp_TransactionType" => "02",
                "vnp_TxnRef" => $transactionId,
                "vnp_Amount" => $amount * 100,
                "vnp_OrderInfo" => "Hoan tien giao dich " . $transactionId,
                "vnp_TransactionNo" => $transactionId,
                "vnp_CreateDate" => date('YmdHis'),
                "vnp_CreateBy" => "admin",
            ];

            ksort($inputData);
            $query = "";
            $i = 0;
            $hashdata = "";
            foreach ($inputData as $key => $value) {
                if ($i == 1) {
                    $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
                } else {
                    $hashdata .= urlencode($key) . "=" . urlencode($value);
                    $i = 1;
                }
                $query .= urlencode($key) . "=" . urlencode($value) . '&';
            }

            $vnp_Url = $vnp_Url . "?" . $query;
            if (isset($vnp_HashSecret)) {
                $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
                $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
            }

            // Thực hiện gọi API VNPay
            $client = new Client();
            $response = $client->post($vnp_Url, [
                'headers' => [
                    'Content-Type' => 'application/json',
                ],
                'verify' => false // Bỏ qua SSL verification trong môi trường development
            ]);

            $responseData = json_decode($response->getBody(), true);

            // Kiểm tra kết quả từ VNPay
            if ($responseData && isset($responseData['vnp_ResponseCode']) && $responseData['vnp_ResponseCode'] === '00') {
                return [
                    'success' => true,
                    'message' => 'Hoàn tiền thành công',
                    'transaction_id' => $transactionId,
                    'response' => $responseData
                ];
            } else {
                \Log::error('Lỗi hoàn tiền VNPay:', [
                    'transaction_id' => $transactionId,
                    'response' => $responseData
                ]);
                return [
                    'success' => false,
                    'message' => 'Hoàn tiền thất bại: ' . ($responseData['vnp_Message'] ?? 'Không xác định'),
                    'transaction_id' => $transactionId,
                    'response' => $responseData
                ];
            }
        } catch (\Exception $e) {
            \Log::error('Lỗi khi gọi API hoàn tiền VNPay:', [
                'transaction_id' => $transactionId,
                'error' => $e->getMessage()
            ]);
            return [
                'success' => false,
                'message' => 'Lỗi khi gọi API hoàn tiền: ' . $e->getMessage(),
                'transaction_id' => $transactionId
            ];
        }
    }
}
