<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\order\IOrderService;
use App\Services\VnPay\IVnpayService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public IOrderService $orderService;
    public IVnpayService $vnpayService;


    public function __construct(
        IOrderService $orderService,
        IVnpayService $vnpayService
    ) {

        $this->orderService = $orderService;
        $this->vnpayService = $vnpayService;
    }

    public function addOrder(Request $request)
    {
        $order = $this->orderService->addOrder($request);
        $paymentUrl = null;

        if (!empty($order)) {
            $paymentUrl = $this->vnpayService->createPaymentUrl($order->code, $order->total_price);

        }

        return BaseResponse::success([
            "order" => $order,
            "vnpayUrl" => $paymentUrl,
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
            \Log::info('Gọi refundOrder với dữ liệu:', $request->all()); // Kiểm tra dữ liệu nhận được
            $order = $this->orderService->refundOrder($request);
            return BaseResponse::success([
                'message' => 'Hoàn tiền thành công!',
                'data' => $order,
            ]);
        } catch (\Exception $e) {
            \Log::error('Lỗi khi hoàn tiền:', ['error' => $e->getMessage()]); // Log lỗi
            return BaseResponse::failure(400, $e->getMessage(), 'refund.failed', []);
        }
    }


    public function getVoucher(Request $request)
    {
        $products = $this->orderService->getVoucher($request);
        return BaseResponse::success($products);
    }

}
