<?php

namespace App\Services\MoMo\impl;

use Illuminate\Http\Request;
use App\Services\MoMo\IMoMoService;
use Illuminate\Support\Facades\Log;
use App\Repositories\OrderRepositories;

class MoMoService implements IMoMoService
{
    public OrderRepositories $orderRepositories;
    public function __construct(OrderRepositories $orderRepositories)
    {
        $this->orderRepositories = $orderRepositories;
    }
    public function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(
            $ch,
            CURLOPT_HTTPHEADER,
            array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data)
            )
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }
    public function createPaymentUrlMoMoATM($orderCode, $amount)
    {
        // cấu hình thông tin MoMo bên env
        $endpoint = env('MOMO_END_POINT');
        $partnerCode = env('MOMO_PARTNER_CODE');
        $accessKey = env('MOMO_ACCESS_KEY');
        $secretKey = env('MOMO_SECRET_KEY');
        $redirectUrl = env('MOMO_RETURN_URL');
        $ipnUrl = env('MOMO_NOTIFY_URL');

        $orderInfo = "Thanh toán qua MoMo";
        $totalamount = $amount;
        $orderId = $orderCode;
        $extraData = "";


        $requestId = time() . "";
        $requestType = "payWithATM";
  
        //before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $totalamount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "mã đơn hàng" . $orderId,
            'requestId' => $requestId,
            'amount' => $totalamount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $result = $this->execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true);  // decode json

        //Just a example, please check more in there

        return $jsonResult['payUrl'] ?? null;
        // dd($jsonResult);

    }

    public function createPaymentUrlPayMoMoPayMoMo($orderCode, $amount)
    {
        // cấu hình thông tin MoMo bên env
        $endpoint = env('MOMO_END_POINT');
        $partnerCode = env('MOMO_PARTNER_CODE');
        $accessKey = env('MOMO_ACCESS_KEY');
        $secretKey = env('MOMO_SECRET_KEY');
        $redirectUrl = env('MOMO_RETURN_URL');
        $ipnUrl = env('MOMO_NOTIFY_URL');

        $orderInfo = "Thanh toán đơn hàng".$orderCode;
        $totalamount = $amount; 
        $orderId = $orderCode;
        $extraData = "";


        $requestId = time() . "";
        $requestType = "captureWallet";
        // $extraData = ($_POST["extraData"] ? $_POST["extraData"] : "");
        //before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $totalamount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);
        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "thanh toán qua ví MoMo",
            'requestId' => $requestId,
            'amount' => $totalamount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );
        $result = $this->execPostRequest($endpoint, json_encode($data));
        $jsonResult = json_decode($result, true);  // decode json

        //Just a example, please check more in there

        return $jsonResult['payUrl'] ?? null;
    }

    public function handleReturnMoMo(Request $request)
    {
        //lấy tất cả dữ liệu trả vể từ momo
        $response = $request->all();

        // Tạo lại chữ ký để xác thực
        $rawHash = "accessKey=" . env('MOMO_ACCESS_KEY') . "&amount=" . $response['amount'] .
            "&extraData=" . $response['extraData'] . "&message=" . $response['message'] .
            "&orderId=" . $response['orderId'] . "&orderInfo=" . $response['orderInfo'] .
            "&orderType=" . $response['orderType'] . "&partnerCode=" . $response['partnerCode'] .
            "&payType=" . $response['payType'] . "&requestId=" . $response['requestId'] .
            "&responseTime=" . $response['responseTime'] . "&resultCode=" . $response['resultCode'] .
            "&transId=" . $response['transId'];

        $signature = hash_hmac("sha256", $rawHash, env('MOMO_SECRET_KEY'));

            // Chữ ký hợp lệ, xử lý kết quả thanh toán
        if ($signature === $response['signature']) {
            if ($response['resultCode'] == 0) {
                $order = $this->orderRepositories->updateOrderPayment(
                    $response['orderId'],
                    'PAID'
                );

                if ($order) {
                    $order->update([
                        'transaction_id' => $response['transId'],
                        'payment_status' => 'PAID',
                        'updated_at' => now()
                    ]);
                }
            } else {
                return response()->json(['message' => 'Received'], 200);
            }

            return response()->json(['message' => 'Received'], 200);
        }

        return response()->json(['message' => 'Invalid signature'], 400);

    }
}