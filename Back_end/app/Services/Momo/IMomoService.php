<?php

namespace App\Services\Momo;

interface IMomoService
{
    public function createPaymentUrl($orderCode, $amount);
    public function handleReturn($request);
} 