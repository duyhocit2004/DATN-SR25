<?php

namespace App\Http\Controllers;

use App\Services\MoMoPaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    protected $momoService;

    public function __construct(MoMoPaymentService $momoService)
    {
        $this->momoService = $momoService;
    }

    public function createPayment(Request $request)
    {
        try {
            $validated = $request->validate([
                'amount' => 'required|numeric|min:1000',
                'orderInfo' => 'required|string|max:255',
            ]);

            $orderId = time() . rand(1000, 9999);
            $amount = $validated['amount'];
            $orderInfo = $validated['orderInfo'];

            $result = $this->momoService->createPayment(
                $orderId,
                $amount,
                $orderInfo
            );

            if ($result['resultCode'] == 0) {
                return redirect($result['payUrl']);
            }

            return back()->with('error', 'Payment creation failed: ' . ($result['message'] ?? 'Unknown error'));
        } catch (\Exception $e) {
            Log::error('Payment Creation Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->with('error', 'An error occurred while creating payment. Please try again.');
        }
    }

    public function return(Request $request)
    {
        try {
            $resultCode = $request->input('resultCode');
            $orderId = $request->input('orderId');
            $amount = $request->input('amount');
            $message = $request->input('message');
            $transId = $request->input('transId');
            $signature = $request->input('signature');

            $data = $request->all();
            if (!$this->momoService->verifySignature($data, $signature)) {
                return view('payment.failed', [
                    'orderId' => $orderId,
                    'message' => 'Invalid signature'
                ]);
            }

            if ($resultCode == 0) {
                return view('payment.success', [
                    'orderId' => $orderId,
                    'amount' => $amount,
                    'transId' => $transId,
                    'message' => $message
                ]);
            }

            return view('payment.failed', [
                'orderId' => $orderId,
                'message' => $message
            ]);
        } catch (\Exception $e) {
            Log::error('Payment Return Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return view('payment.failed', [
                'message' => 'An error occurred while processing your payment'
            ]);
        }
    }

    public function notify(Request $request)
    {
        try {
            $data = $request->all();
            $signature = $request->input('signature');

            if (!$this->momoService->verifySignature($data, $signature)) {
                return response()->json([
                    'resultCode' => 1,
                    'message' => 'Invalid signature'
                ]);
            }

            $resultCode = $request->input('resultCode');
            $orderId = $request->input('orderId');
            $amount = $request->input('amount');
            $transId = $request->input('transId');

            if ($resultCode == 0) {
                // Payment successful
                // Update your database, send email, etc.
                Log::info('Payment Successful', [
                    'orderId' => $orderId,
                    'amount' => $amount,
                    'transId' => $transId
                ]);
            }

            return response()->json([
                'resultCode' => 0,
                'message' => 'IPN received successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Payment Notify Error:', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json([
                'resultCode' => 1,
                'message' => 'Error processing IPN'
            ]);
        }
    }
} 