<?php

namespace App\Services\Momo\impl;

use App\Repositories\OrderRepositories;
use App\Services\Momo\IMomoService;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Log;

class MomoService implements IMomoService
{
    private OrderRepositories $orderRepositories;

    public function __construct(OrderRepositories $orderRepositories)
    {
        $this->orderRepositories = $orderRepositories;
    }

    public function createPaymentUrl($orderCode, $amount)
    {
        try {
            $endpoint = config('momo.endpoint');
            $partnerCode = config('momo.partner_code');
            $accessKey = config('momo.access_key');
            $secretKey = config('momo.secret_key');
            $returnUrl = config('momo.return_url');
            $notifyUrl = config('momo.notify_url');

            // Log configuration
            Log::info('MOMO Payment Configuration:', [
                'endpoint' => $endpoint,
                'partnerCode' => $partnerCode,
                'accessKey' => $accessKey,
                'returnUrl' => $returnUrl,
                'notifyUrl' => $notifyUrl,
                'orderCode' => $orderCode,
                'amount' => $amount
            ]);

            if (!$endpoint || !$partnerCode || !$accessKey || !$secretKey || !$returnUrl || !$notifyUrl) {
                Log::error('Missing MOMO configuration');
                throw new \Exception('Missing MOMO configuration');
            }

            $orderId = $orderCode;
            $orderInfo = "Thanh toán đơn hàng " . $orderCode;
            $requestId = time() . "";
            $requestType = config('momo.request_type');
            $extraData = "";

            // Create signature
            $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $notifyUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $returnUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
            $signature = hash_hmac("sha256", $rawHash, $secretKey);

            $data = [
                'partnerCode' => $partnerCode,
                'partnerName' => "Test",
                'storeId' => "MomoTestStore",
                'requestId' => $requestId,
                'amount' => $amount,
                'orderId' => $orderId,
                'orderInfo' => $orderInfo,
                'redirectUrl' => $returnUrl,
                'ipnUrl' => $notifyUrl,
                'lang' => config('momo.lang'),
                'extraData' => $extraData,
                'requestType' => $requestType,
                'signature' => $signature
            ];

            Log::info('MOMO Payment Request:', array_merge($data, ['rawHash' => $rawHash]));

            try {
                $client = new Client();
                $response = $client->post($endpoint, [
                    'json' => $data,
                    'headers' => [
                        'Content-Type' => 'application/json',
                    ],
                    'timeout' => 30,
                    'connect_timeout' => 30
                ]);

                $result = json_decode($response->getBody(), true);
                Log::info('MOMO Payment Response:', $result);

                if (!isset($result['payUrl'])) {
                    Log::error('Invalid MOMO response - missing payUrl:', $result);
                    throw new \Exception('Invalid MOMO response: ' . json_encode($result));
                }

                return $result['payUrl'];
            } catch (\GuzzleHttp\Exception\RequestException $e) {
                Log::error('MOMO API Request Error:', [
                    'message' => $e->getMessage(),
                    'request' => $e->getRequest(),
                    'response' => $e->hasResponse() ? $e->getResponse()->getBody()->getContents() : null
                ]);
                throw new \Exception('MOMO API Request Error: ' . $e->getMessage());
            }
        } catch (\Exception $e) {
            Log::error('MOMO Payment Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }

    public function handleReturn($request)
    {
        try {
            Log::info('MOMO Return Data:', $request->all());

            $partnerCode = $request->input('partnerCode');
            $orderId = $request->input('orderId');
            $requestId = $request->input('requestId');
            $amount = $request->input('amount');
            $orderInfo = $request->input('orderInfo');
            $orderType = $request->input('orderType');
            $transId = $request->input('transId');
            $resultCode = $request->input('resultCode');
            $message = $request->input('message');
            $payType = $request->input('payType');
            $responseTime = $request->input('responseTime');
            $extraData = $request->input('extraData');
            $signature = $request->input('signature');

            $rawHash = "accessKey=" . config('momo.access_key') . "&amount=" . $amount . "&extraData=" . $extraData . "&message=" . $message . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&orderType=" . $orderType . "&partnerCode=" . $partnerCode . "&payType=" . $payType . "&requestId=" . $requestId . "&responseTime=" . $responseTime . "&resultCode=" . $resultCode . "&transId=" . $transId;

            $partnerSignature = hash_hmac("sha256", $rawHash, config('momo.secret_key'));

            if ($signature === $partnerSignature) {
                if ($resultCode == 0) {
                    // Cập nhật thông tin đơn hàng
                    $order = $this->orderRepositories->updateOrderPayment(
                        $orderId,
                        'PAID'
                    );
                    
                    if ($order) {
                        $order->update([
                            'transaction_id' => $transId,
                            'payment_status' => 'PAID',
                            'date' => now(),
                            'updated_at' => now()
                        ]);
                    }
                    
                    return 'http://localhost:5173/momo-return?resultCode=' . $resultCode . '&transId=' . $transId;
                } else {
                    Log::warning('MOMO Payment Failed:', [
                        'resultCode' => $resultCode,
                        'message' => $message
                    ]);
                    return 'http://localhost:5173/momo-return?resultCode=' . $resultCode . '&transId=' . $transId;
                }
            } else {
                Log::error('MOMO Invalid Signature', [
                    'received' => $signature,
                    'calculated' => $partnerSignature,
                    'rawHash' => $rawHash
                ]);
                return 'http://localhost:5173/momo-return?status=invalid';
            }
        } catch (\Exception $e) {
            Log::error('MOMO Return Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        }
    }
} 