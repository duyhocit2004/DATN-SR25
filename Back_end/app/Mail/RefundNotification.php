<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class RefundNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $refundData;

    public function __construct($refundData)
    {
        $this->refundData = $refundData;
    }

    public function build()
    {
        $subject = $this->refundData['refundMethod'] === 'DIRECT' 
            ? 'Thông báo hoàn tiền đơn hàng #' . $this->refundData['order']->code
            : 'Mã QR hoàn tiền đơn hàng #' . $this->refundData['order']->code;

        return $this->subject($subject)
            ->view('emails.refund_notification')
            ->with([
                'order' => $this->refundData['order'],
                'refundMethod' => $this->refundData['refundMethod'],
                'qrCode' => $this->refundData['qrCode']
            ]);
    }
} 