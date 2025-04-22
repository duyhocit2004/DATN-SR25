<?php

namespace App\Services\Refund;

use Illuminate\Http\Request;

interface IRefundService
{
    public function processRefund($orderId, $refundMethod);
    public function sendRefundNotification($order, $refundMethod);
    public function generateRefundQRCode($order);
} 