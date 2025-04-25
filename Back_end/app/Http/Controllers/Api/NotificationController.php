<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'status' => 200,
            'message' => 'success',
            'data' => $notifications
        ]);
    }

    public function unreadCount()
    {
        $user = Auth::user();
        $count = Notification::where('user_id', $user->id)
            ->where('status', 'unread')
            ->count();

        return response()->json([
            'status' => 200,
            'message' => 'success',
            'data' => $count
        ]);
    }

    public function markAsRead($id)
    {
        $notification = Notification::findOrFail($id);
        
        if ($notification->user_id !== Auth::id()) {
            return response()->json([
                'status' => 403,
                'message' => 'Unauthorized'
            ]);
        }

        $notification->markAsRead();

        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function markAllAsRead()
    {
        $user = Auth::user();
        Notification::where('user_id', $user->id)
            ->where('status', 'unread')
            ->update([
                'status' => 'read',
                'read_at' => now()
            ]);

        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    }

    public function destroy($id)
    {
        $notification = Notification::findOrFail($id);
        
        if ($notification->user_id !== Auth::id()) {
            return response()->json([
                'status' => 403,
                'message' => 'Unauthorized'
            ]);
        }

        $notification->delete();

        return response()->json([
            'status' => 200,
            'message' => 'success'
        ]);
    }
} 