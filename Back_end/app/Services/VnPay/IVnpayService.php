<?php

namespace App\Services\VnPay;

use Illuminate\Http\Request;

interface IVnpayService
{
    public function createPaymentUrl($orderCode, $amount);

    public function handleReturn(Request $request);
}
