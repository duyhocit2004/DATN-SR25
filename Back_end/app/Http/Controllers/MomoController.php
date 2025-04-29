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
        $paymentUrl = $this->moMoService->createPaymentUrlMoMoATM($orderCode, $amount);
        return BaseResponse::success(['url' => $paymentUrl]);
    }
    public function createPaymentUrlPayMoMo(Request $request,$orderCode, $amount){
        // $orderCode = $request->input('orderCode');
        // $amount = $request->input('amount');
        $paymentUrl = $this->moMoService->createPaymentUrlPayMoMoPayMoMo($orderCode, $amount);

        return BaseResponse::success(['url' => $paymentUrl]);
    }
    public function handleReturnMoMo(Request $request)
    {
        $link = $this->moMoService->handleReturnMoMo($request);
        return redirect()->to($link);
    }
}
