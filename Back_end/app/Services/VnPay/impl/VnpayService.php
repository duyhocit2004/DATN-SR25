<?php

namespace App\Services\VnPay\impl;

use App\Services\VnPay\IVnpayService;
use Illuminate\Http\Request;


class VnpayService implements IVnpayService{

    public function __construct()
    {

    }

    public function createPaymentUrl($orderId, $amount)
    {
        $orderDescription = "Thanh toán đơn hàng " . $orderId;

        $vnp_TmnCode = env('VNP_TMN_CODE'); // Mã website từ VNPAY
        $vnp_HashSecret = env('VNP_HASH_SECRET'); // Chuỗi ký bí mật
        $vnp_Url = env('VNP_URL'); // URL VNPAY (ví dụ: sandbox)
        $vnp_ReturnUrl = env('VNP_RETURN_URL'); // URL xử lý khi thanh toán xong

        $vnp_TxnRef = $orderId; // Mã giao dịch
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
        $vnp_HashSecret = env('VNP_HASH_SECRET');
        $inputData = [];
        foreach ($request->all() as $key => $value) {
            if (substr($key, 0, 4) == "vnp_") {
                $inputData[$key] = $value;
            }
        }

        ksort($inputData);
        $hashData = "";
        foreach ($inputData as $key => $value) {
            if ($key != "vnp_SecureHash") {
                $hashData .= $key . '=' . $value . '&';
            }
        }
        $hashData = rtrim($hashData, '&');

        $secureHash = hash_hmac('sha512', $hashData, $vnp_HashSecret);

        if ($secureHash === $inputData['vnp_SecureHash']) {
            // Giao dịch hợp lệ
            if ($inputData['vnp_ResponseCode'] == '00') {
                return response()->json(['message' => 'Giao dịch thành công']);
            } else {
                return response()->json(['message' => 'Giao dịch không thành công', 'errorCode' => $inputData['vnp_ResponseCode']]);
            }
        } else {
            // Giao dịch không hợp lệ
            return response()->json(['message' => 'Chữ ký không hợp lệ']);
        }
    }


}
