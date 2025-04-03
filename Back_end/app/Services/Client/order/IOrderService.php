<?php

namespace App\Services\Client\order;

use Illuminate\Http\Request;

interface IOrderService
{
    public function addOrder(Request $request);
    public function getOrders(Request $request);
    public function getOrdersPaging(Request $request);
    public function getOrderDetail(Request $request);
    public function updateOrder(Request $request);
    public function deleteOrder(Request $request);
    public function refundOrder(Request $request);
    public function getVoucher(Request $request);

}
