<?php

namespace App\Http\Controllers;

use App\Helpers\BaseResponse;
use App\Services\Momo\IMomoService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MomoController extends Controller
{
    public IMomoService $momoService;

    public function __construct(IMomoService $momoService)
    {
        $this->momoService = $momoService;
    }

    public function returnPayment(Request $request)
    {
        try {
            Log::info('MOMO Return Request:', $request->all());
            $link = $this->momoService->handleReturn($request);
            return redirect()->to($link);
        } catch (\Exception $e) {
            Log::error('MOMO Return Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return redirect()->to('http://localhost:5173/momo-return?status=error');
        }
    }

    public function notifyPayment(Request $request)
    {
        try {
            Log::info('MOMO Notify Request:', $request->all());
            $this->momoService->handleReturn($request);
            return response()->json([
                'resultCode' => 0,
                'message' => 'Success'
            ]);
        } catch (\Exception $e) {
            Log::error('MOMO Notify Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'resultCode' => 1,
                'message' => 'Error'
            ]);
        }
    }
} 