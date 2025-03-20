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

    public function __construct(IOrderService $orderService,
                                IVnpayService $vnpayService)
    {
        $this->orderService = $orderService;
        $this->vnpayService = $vnpayService;
    }

    public function getVoucher(Request $request)
    {
        $products = $this->orderService->getVoucher($request);
        return BaseResponse::success($products);
    }

    public function addOrder(Request $request)
    {
        $products = $this->orderService->addOrder($request);
        $paymentUrl = null;
        if(!empty($products)){
            $paymentUrl = $this->vnpayService->createPaymentUrl($products->code,$products->total_price);
        }

        return BaseResponse::success([
            "order" => $products,
            "vnpayUrl" => $paymentUrl,
        ]);
    }

    public function getOrders(Request $request)
    {
        $products = $this->orderService->getOrders($request);
        return BaseResponse::success($products);
    }
    public function getOrderDetail(Request $request)
    {
        $products = $this->orderService->getOrderDetail($request);
        return BaseResponse::success($products);
    }

    public function getOrdersPaging(Request $request)
    {
        $products = $this->orderService->getOrdersPaging($request);
        return BaseResponse::success($products);
    }

    public function updateOrder(Request $request)
    {
        $products = $this->orderService->updateOrder($request);
        return BaseResponse::success($products);
    }

}
