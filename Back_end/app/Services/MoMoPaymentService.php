<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class MoMoPaymentService
{
    private $partnerCode;
    private $accessKey;
    private $secretKey;
    private $endpoint;
    private $returnUrl;
    private $notifyUrl;
    private $lang;
    private $requestType;

    public function __construct()
    {
        $this->partnerCode = config('momo.partner_code');
        $this->accessKey = config('momo.access_key');
        $this->secretKey = config('momo.secret_key');
        $this->endpoint = config('momo.endpoint');
        $this->returnUrl = config('momo.return_url');
        $this->notifyUrl = config('momo.notify_url');
        $this->lang = config('momo.lang');
        $this->requestType = config('momo.request_type');
    }

    public function createPayment($orderId, $amount, $orderInfo)
    {
        try {
            $requestId = time() . rand(1000, 9999);
            $extraData = "";

            $rawHash = "accessKey=" . $this->accessKey . 
                      "&amount=" . $amount . 
                      "&extraData=" . $extraData . 
                      "&ipnUrl=" . $this->notifyUrl . 
                      "&orderId=" . $orderId . 
                      "&orderInfo=" . $orderInfo . 
                      "&partnerCode=" . $this->partnerCode . 
                      "&redirectUrl=" . $this->returnUrl . 
                      "&requestId=" . $requestId . 
                      "&requestType=" . $this->requestType;

            $signature = hash_hmac("sha256", $rawHash, $this->secretKey);

            $data = [
                'partnerCode' => $this->partnerCode,
                'partnerName' => "Test",
                'storeId' => "MomoTestStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $this->returnUrl,
                'ipnUrl' => $this->notifyUrl,
                'lang' => $this->lang,
                'extraData' => $extraData,
                'requestType' => $this->requestType,
                'signature' => $signature
            ];

            Log::info('MoMo Payment Request:', $data);

            $result = $this->execPostRequest($this->endpoint, json_encode($data));
            $jsonResult = json_decode($result, true);

            Log::info('MoMo Payment Response:', $jsonResult);

            return $jsonResult;
        } catch (\Exception $e) {
            Log::error('MoMo Payment Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    private function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Content-Length: ' . strlen($data))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        $result = curl_exec($ch);
        
        if (curl_errno($ch)) {
            throw new \Exception('Curl error: ' . curl_error($ch));
        }
        
        curl_close($ch);
        return $result;
    }

    public function verifySignature($data, $signature)
    {
        $rawHash = "accessKey=" . $this->accessKey . 
                  "&amount=" . $data['amount'] . 
                  "&extraData=" . $data['extraData'] . 
                  "&message=" . $data['message'] . 
                  "&orderId=" . $data['orderId'] . 
                  "&orderInfo=" . $data['orderInfo'] . 
                  "&orderType=" . $data['orderType'] . 
                  "&partnerCode=" . $data['partnerCode'] . 
                  "&payType=" . $data['payType'] . 
                  "&requestId=" . $data['requestId'] . 
                  "&responseTime=" . $data['responseTime'] . 
                  "&resultCode=" . $data['resultCode'] . 
                  "&transId=" . $data['transId'];

        $expectedSignature = hash_hmac("sha256", $rawHash, $this->secretKey);
        return $signature === $expectedSignature;
    }
} 