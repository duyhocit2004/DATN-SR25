<?php

namespace App\Services\Client\order\impl;

use App\Helpers\BaseResponse;
use App\Repositories\OrderRepositories;
use App\Repositories\VoucherRepositories;
use App\Services\Client\order\IOrderService;
use Illuminate\Http\Request;


class OrderService implements IOrderService
{

    public OrderRepositories $orderRepositories;
    public VoucherRepositories $voucherRepositories;

    public function __construct(OrderRepositories   $orderRepositories,
                                VoucherRepositories $voucherRepositories)
    {
        $this->orderRepositories = $orderRepositories;
        $this->voucherRepositories = $voucherRepositories;
    }


}
