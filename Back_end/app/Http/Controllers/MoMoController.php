<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Services\MoMo\IMoMoService;

class MoMoController extends Controller
{
    public IMoMoService $moMoService;
    public function __construct(IMoMoService $moMoService)
    {
        $this->moMoService = $moMoService;
    }

    public function createPaymentUrlMoMoATM($orderCode, $amount)
    {
    
        $paymentUrl = $this->moMoService->createPaymentUrlMoMoATM($orderCode, $amount);
        return BaseResponse::success(['url' => $paymentUrl]);
    }
    public function createPaymentUrlPayMoMo($orderCode, $amount){

        $paymentUrl = $this->moMoService->createPaymentUrlPayMoMoPayMoMo($orderCode, $amount);
        return BaseResponse::success(['url' => $paymentUrl]);
    }
}
