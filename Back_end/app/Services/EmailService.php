<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Log;

class EmailService
{
    public function sendOrderConfirmation(Order $order)
    {
        try {
            $templateParams = [
                'to_email' => $order->email,
                'to_name' => $order->customer_name,
                'order_code' => $order->code,
                'order_date' => $order->created_at->format('d/m/Y H:i'),
                'customer_name' => $order->customer_name,
                'phone_number' => $order->phone_number,
                'shipping_address' => $order->shipping_address,
                'total_amount' => number_format($order->total_price) . ' VND',
                'payment_method' => $order->payment_method,
                'order_details' => $this->formatOrderDetails($order)
            ];

            $response = \Http::post('https://api.emailjs.com/api/v1.0/email/send', [
                'service_id' => 'service_4hdrbsz',
                'template_id' => 'template_2ogzr22',
                'user_id' => 'OhQzQb1tfiHVYmidF',
                'template_params' => $templateParams
            ]);

            if ($response->successful()) {
                Log::info('Order confirmation email sent successfully', [
                    'order_id' => $order->id,
                    'email' => $order->email
                ]);
                return true;
            }

            Log::error('Failed to send order confirmation email', [
                'order_id' => $order->id,
                'email' => $order->email,
                'response' => $response->json()
            ]);
            return false;

        } catch (\Exception $e) {
            Log::error('Error sending order confirmation email', [
                'order_id' => $order->id,
                'email' => $order->email,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    private function formatOrderDetails(Order $order)
    {
        $details = '';
        foreach ($order->order_details as $detail) {
            $details .= sprintf(
                "- %s (Màu: %s, Size: %s) x %d = %s VND\n",
                $detail->product->name,
                $detail->color,
                $detail->size,
                $detail->quantity,
                number_format($detail->price * $detail->quantity)
            );
        }
        return $details;
    }
} 