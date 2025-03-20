<?php

namespace App\Services\Client\order;

use Illuminate\Http\Request;

interface IOrderService
{
    public function getVoucher(Request $request);
    public function addOrder(Request $request);
    public function getOrders(Request $request);
    public function getOrderDetail(Request $request);
    public function getOrdersPaging(Request $request);

}
