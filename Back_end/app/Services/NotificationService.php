<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Order;
use App\Models\User;
use App\Events\NotificationCreated;

class NotificationService
{
    public function createNewOrderNotification(Order $order)
    {
        // Create notification for admin
        $adminUsers = User::where('role', 'Admin')->get();
        
        foreach ($adminUsers as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'title' => 'Đơn hàng mới',
                'content' => "Có đơn hàng mới #{$order->code} từ khách hàng {$order->customer_name}",
                'type' => 'new_order',
                'status' => 'unread',
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $order->code,
                    'customer_name' => $order->customer_name,
                    'total_amount' => $order->total_price
                ]
            ]);

            // Broadcast notification event
            event(new NotificationCreated($notification));
        }

        // Create notification for customer if they have an account
        if ($order->users_id) {
            $notification = Notification::create([
                'user_id' => $order->users_id,
                'title' => 'Đặt hàng thành công',
                'content' => "Đơn hàng #{$order->code} của bạn đã được đặt thành công",
                'type' => 'new_order',
                'status' => 'unread',
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $order->code,
                    'total_amount' => $order->total_price
                ]
            ]);

            // Broadcast notification event
            event(new NotificationCreated($notification));
        }
    }

    public function createOrderStatusNotification(Order $order, string $oldStatus, string $newStatus, string $note = null)
    {
        $title = $this->getOrderStatusTitle($newStatus);
        $content = $this->getOrderStatusContent($order->code, $newStatus, $note);

        // Create notification for customer
        if ($order->users_id) {
            $notification = Notification::create([
                'user_id' => $order->users_id,
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

            // Broadcast notification event
            event(new NotificationCreated($notification));
        }

        // Create notification for admin
        $adminUsers = User::where('role', 'Admin')->get();
        foreach ($adminUsers as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'title' => "Cập nhật đơn hàng #{$order->code}",
                'content' => "Đơn hàng #{$order->code} đã được cập nhật trạng thái từ {$oldStatus} thành {$newStatus}",
                'type' => 'order_update',
                'status' => 'unread',
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $order->code,
                    'old_status' => $oldStatus,
                    'new_status' => $newStatus
                ]
            ]);

            // Broadcast notification event
            event(new NotificationCreated($notification));
        }
    }

    private function getOrderStatusTitle(string $status): string
    {
        return match ($status) {
            'pending' => 'Đơn hàng đang chờ xử lý',
            'processing' => 'Đơn hàng đang được xử lý',
            'shipping' => 'Đơn hàng đang được vận chuyển',
            'completed' => 'Đơn hàng đã hoàn thành',
            'received' => 'Đơn hàng đã được nhận',
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
            'received' => "Đơn hàng #{$orderCode} của bạn đã được xác nhận nhận hàng",
            'cancelled' => "Đơn hàng #{$orderCode} của bạn đã bị hủy",
            'refunded' => "Đơn hàng #{$orderCode} của bạn đã được hoàn tiền",
            default => "Đơn hàng #{$orderCode} của bạn đã được cập nhật trạng thái"
        };

        return $note ? $baseContent . ". Ghi chú: {$note}" : $baseContent;
    }
} 