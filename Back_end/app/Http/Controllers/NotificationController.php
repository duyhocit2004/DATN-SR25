<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Pusher\Pusher;
use Tymon\JWTAuth\Facades\JWTAuth;

class NotificationController extends Controller
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

    // Lấy danh sách notification cho admin/manager
    public function index(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();
        return response()->json([
            'status' => 200,
            'data' => $notifications
        ]);
    }

    // Đánh dấu 1 notification đã đọc
    public function markAsRead($id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $notification = Notification::where('id', $id)
            ->where('user_id', $user->id)
            ->first();
        if (!$notification) {
            return response()->json(['status' => 404, 'message' => 'Notification not found'], 404);
        }
        $notification->update([
            'is_read' => true,
            'read_at' => now()
        ]);
        return response()->json(['status' => 200, 'message' => 'Notification marked as read']);
    }

    // Đánh dấu tất cả đã đọc
    public function markAllAsRead()
    {
        $user = JWTAuth::parseToken()->authenticate();
        Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->update([
                'is_read' => true,
                'read_at' => now()
            ]);
        return response()->json(['status' => 200, 'message' => 'All notifications marked as read']);
    }

    // Đếm số lượng chưa đọc
    public function unreadCount()
    {
        $user = JWTAuth::parseToken()->authenticate();
        $count = Notification::where('user_id', $user->id)
            ->where('is_read', false)
            ->count();
        return response()->json(['status' => 200, 'data' => $count]);
    }

    public function sendNotification($userId, $type, $title, $message, $link = null)
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
} 