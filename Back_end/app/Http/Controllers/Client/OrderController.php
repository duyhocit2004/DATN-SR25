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



}
