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
    public function createPayment($orderCode, $amount)
    {
        $paymentUrl = $this->vnpayService->createPaymentUrl($orderCode, $amount);
        return BaseResponse::success(['url' => $paymentUrl]);
    }

    public function returnPayment(Request $request)
    {
//        return $this->vnpayService->handleReturn($request);
        $link = $this->vnpayService->handleReturn($request);
        return redirect()->to($link);
    }


}
