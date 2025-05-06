<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\order\IOrderService;
use App\Services\Refund\IRefundService;
use App\Services\VnPay\IVnpayService;
use App\Services\Momo\IMomoService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public IOrderService $orderService;
    public IVnpayService $vnpayService;
    public IMomoService $momoService;
    public IRefundService $refundService;

    public function __construct(
        IOrderService $orderService,
        IVnpayService $vnpayService,
        IRefundService $refundService,
        IMomoService $momoService
    ) {
        $this->orderService = $orderService;
        $this->vnpayService = $vnpayService;
        $this->momoService = $momoService;
        $this->refundService = $refundService;
    }

    public function addOrder(Request $request)
    {
        $order = $this->orderService->addOrder($request);
        $paymentUrl = null;

        if (!empty($order)) {
            if ($request->input('paymentMethod') === 'ONLINE') {
                if ($request->input('onlinePaymentMethod') === 'VNPAY') {
                    $paymentUrl = $this->vnpayService->createPaymentUrl($order->code, $order->total_price);
                } elseif ($request->input('onlinePaymentMethod') === 'MOMO') {
                    try {
                        $paymentUrl = $this->momoService->createPaymentUrlPayMoMoPayMoMo($order->code, $order->total_price);
                    } catch (\Exception $e) {
                        \Log::error('Momo payment error: ' . $e->getMessage());
                        return BaseResponse::failure(500, 'Momo payment service is currently unavailable', 'payment.error', []);
                    }
                }
            }
        }

        return BaseResponse::success([
            "order" => $order,
            "vnpayUrl" => $request->input('onlinePaymentMethod') === 'VNPAY' ? $paymentUrl : null,
            "momoUrl" => $request->input('onlinePaymentMethod') === 'MOMO' ? $paymentUrl : null,
        ]);
    }
    public function getOrders(Request $request)
    {
        $products = $this->orderService->getOrders($request);
        return BaseResponse::success($products);
    }
    public function getOrdersPaging(Request $request)
    {
        $products = $this->orderService->getOrdersPaging($request);
        return BaseResponse::success($products);
    }

    public function getOrderDetail(Request $request)
    {
        $products = $this->orderService->getOrderDetail($request);
        return BaseResponse::success($products);
    }
    public function cancelOrderByClient(Request $request)
    {
        $products = $this->orderService->cancelOrderByClient($request);
        return BaseResponse::success($products);
    }
    public function updateOrder(Request $request)
    {
        $products = $this->orderService->updateOrder($request);
        return BaseResponse::success($products);
    }

    public function deleteOrder(Request $request)
    {
        $products = $this->orderService->deleteOrder($request);
        return BaseResponse::success($products);
    }

    public function refundOrder(Request $request)
    {
        try {
            \Log::info('Gọi refundOrder với dữ liệu:', $request->all());
            
            $orderId = $request->input('orderId');
            $refundMethod = $request->input('refundMethod', 'DIRECT'); // Default to direct refund
            
            $result = $this->refundService->processRefund($orderId, $refundMethod);
            
            if ($result['success']) {
                return BaseResponse::success([
                    'message' => $result['message'],
                    'refundMethod' => $refundMethod,
                    'order' => $result['order']
                ]);
            }
            
            return BaseResponse::failure(400, $result['message'], 'refund.failed', []);
        } catch (\Exception $e) {
            \Log::error('Lỗi khi hoàn tiền:', ['error' => $e->getMessage()]);
            return BaseResponse::failure(400, $e->getMessage(), 'refund.failed', []);
        }
    }

    public function getVoucher(Request $request)
    {
        $products = $this->orderService->getVoucher($request);
        return BaseResponse::success($products);
    }

}
