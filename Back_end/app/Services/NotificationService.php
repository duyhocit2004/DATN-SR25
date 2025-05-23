<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\Order;
use App\Models\User;
use App\Events\NotificationCreated;
use Pusher\Pusher;

class NotificationService
{
    private $pusher;

    public function __construct()
    {
        $this->pusher = new Pusher(
            env('PUSHER_APP_KEY'),
            env('PUSHER_APP_SECRET'),
            env('PUSHER_APP_ID'),
            [
                'cluster' => env('PUSHER_APP_CLUSTER'),
                'useTLS' => true
            ]
        );
    }

    /**
     * Tạo notification cho tất cả admin/manager khi có đơn hàng mới
     */
    public function createNewOrderNotification(Order $order)
    {
        $admins = User::whereIn('role', ['Quản trị viên', 'Quản lý'])->get();
        foreach ($admins as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'order_id' => $order->id,
                'type' => 'new_order',
                'title' => 'Đơn hàng mới',
                'message' => "Có đơn hàng mới #{$order->code} từ khách hàng {$order->customer_name}",
                'is_read' => false,
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $order->code
                ]
            ]);
            $this->pusher->trigger('notifications.' . $admin->id, 'new-notification', [
                'notification' => $notification
            ]);
        }
    }

    /**
     * Tạo notification cập nhật trạng thái đơn hàng cho admin/manager
     */
    public function createOrderStatusNotification(Order $order, string $oldStatus, string $newStatus, string $note = null)
    {
        $admins = User::whereIn('role', ['Quản trị viên', 'Quản lý'])->get();
        foreach ($admins as $admin) {
            $notification = Notification::create([
                'user_id' => $admin->id,
                'order_id' => $order->id,
                'type' => 'order_update',
                'title' => "Cập nhật đơn hàng #{$order->code}",
                'message' => "Đơn hàng #{$order->code} đã được cập nhật trạng thái từ {$oldStatus} thành {$newStatus}",
                'is_read' => false,
                'data' => [
                    'order_id' => $order->id,
                    'order_code' => $order->code,
                    'old_status' => $oldStatus,
                    'new_status' => $newStatus,
                    'note' => $note
                ]
            ]);
            $this->pusher->trigger('notifications.' . $admin->id, 'new-notification', [
                'notification' => $notification
            ]);
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

    public function sendToUser($userId, $type, $title, $message, $link = null)
    {
        $notification = Notification::create([
            'user_id' => $userId,
            'type' => $type,
            'title' => $title,
            'message' => $message,
            'link' => $link,
            'is_read' => false
        ]);

        $this->pusher->trigger('notifications.' . $userId, 'new-notification', [
            'notification' => $notification
        ]);

        return $notification;
    }

    public function sendToMultipleUsers($userIds, $type, $title, $message, $link = null)
    {
        $notifications = [];
        
        foreach ($userIds as $userId) {
            $notifications[] = $this->sendToUser($userId, $type, $title, $message, $link);
        }

        return $notifications;
    }

    public function sendToAllUsers($type, $title, $message, $link = null)
    {
        $userIds = User::pluck('id')->toArray();
        return $this->sendToMultipleUsers($userIds, $type, $title, $message, $link);
    }
} 