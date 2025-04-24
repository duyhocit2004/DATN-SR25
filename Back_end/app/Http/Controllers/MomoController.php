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

    public function createPaymentUrlMoMoATM(Request $request,$orderCode=null, $amount=null)
    {
        $orderCode = $request->input('orderCode');
        $amount = $request->input('amount');
        if($orderCode==null || $amount==null){
            return BaseResponse::failure(400, 'orderCode or amount is null', 'orderCode or amount is null', []);
        }
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
