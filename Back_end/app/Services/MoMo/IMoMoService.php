<?php

namespace App\Services\MoMo;

use Illuminate\Http\Request;

interface IMoMoService
{
    public function createPaymentUrlMoMoATM($orderCode, $amount);
    // public function handleReturnMoMo(Request $request);
    public function createPaymentUrlPayMoMoPayMoMo($orderCode,$amount);
}
