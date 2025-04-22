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

    public function createPaymentUrlMoMoATM(Request $request)
    {
        $orderCode = $request->input('orderCode');
        $amount = $request->input('amount');

        if (empty($orderCode) || empty($amount)) {
            return BaseResponse::failure( 400, 'orderCode and amount are required', 'orderCode and amount are required', null);
        }
    
        $paymentUrl = $this->moMoService->createPaymentUrlMoMoATM($orderCode, $amount);
        return BaseResponse::success(['url' => $paymentUrl]);
    }
    public function createPaymentUrlPayMoMo(Request $request){
        $orderCode = $request->input('orderCode');
        $amount = $request->input('amount');

        if (empty($orderCode) || empty($amount)) {
            return BaseResponse::failure( 400, 'orderCode and amount are required', 'orderCode and amount are required', null);
        }
    
        $paymentUrl = $this->moMoService->createPaymentUrlPayMoMoPayMoMo($orderCode, $amount);
        return BaseResponse::success(['url' => $paymentUrl]);
    }
}
