<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Order;
use App\Models\User;

class NotificationService
{
    public function createOrderStatusNotification(Order $order, string $oldStatus, string $newStatus, string $note = null)
    {
        $title = $this->getOrderStatusTitle($newStatus);
        $content = $this->getOrderStatusContent($order->code, $newStatus, $note);

        Notification::create([
            'user_id' => $order->user_id,
            'title' => $title,
            'content' => $content,
            'type' => 'order_update',
            'status' => 'unread',
            'data' => [
                'order_id' => $order->id,
                'order_code' => $order->code,
                'old_status' => $oldStatus,
                'new_status' => $newStatus
            ]
        ]);
    }

    private function getOrderStatusTitle(string $status): string
    {
        return match ($status) {
            'pending' => 'Đơn hàng đang chờ xử lý',
            'processing' => 'Đơn hàng đang được xử lý',
            'shipping' => 'Đơn hàng đang được vận chuyển',
            'completed' => 'Đơn hàng đã hoàn thành',
            'cancelled' => 'Đơn hàng đã bị hủy',
            'refunded' => 'Đơn hàng đã được hoàn tiền',
            default => 'Cập nhật trạng thái đơn hàng'
        };
    }

    private function getOrderStatusContent(string $orderCode, string $status, ?string $note): string
    {
        $baseContent = match ($status) {
            'pending' => "Đơn hàng #{$orderCode} của bạn đang chờ xử lý",
            'processing' => "Đơn hàng #{$orderCode} của bạn đang được xử lý",
            'shipping' => "Đơn hàng #{$orderCode} của bạn đang được vận chuyển",
            'completed' => "Đơn hàng #{$orderCode} của bạn đã được giao thành công",
            'cancelled' => "Đơn hàng #{$orderCode} của bạn đã bị hủy",
            'refunded' => "Đơn hàng #{$orderCode} của bạn đã được hoàn tiền",
            default => "Đơn hàng #{$orderCode} của bạn đã được cập nhật trạng thái"
        };

        return $note ? $baseContent . ". Ghi chú: {$note}" : $baseContent;
    }
} 