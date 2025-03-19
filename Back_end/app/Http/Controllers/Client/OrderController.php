<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\order\IOrderService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public IOrderService $orderService;

    public function __construct(IOrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function getVoucher(Request $request)
    {
        $products = $this->orderService->getVoucher($request);
        return BaseResponse::success($products);
    }

    public function addOrder(Request $request)
    {
        $products = $this->orderService->addOrder($request);
        return BaseResponse::success($products);
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

}
