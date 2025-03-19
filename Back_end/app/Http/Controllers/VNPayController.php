<?php

namespace App\Http\Controllers;

use App\Helpers\BaseResponse;
use App\Services\VnPay\IVnpayService;
use Illuminate\Http\Request;

class VNPayController extends Controller
{
    public IVnpayService $vnpayService;

    public function __construct(IVnpayService $vnpayService)
    {
        $this->vnpayService = $vnpayService;
    }


}
