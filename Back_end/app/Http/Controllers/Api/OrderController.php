<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\NotificationService;
use App\Models\Order;
use App\Models\OrderStatusHistory;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $notificationService;

    public function __construct(NotificationService $notificationService)
    {
        $this->notificationService = $notificationService;
    }

    public function updateStatus(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $oldStatus = $order->status;
            $newStatus = $request->status;
            $note = $request->note;

            // Update order status
            $order->update([
                'status' => $newStatus
            ]);

            // Create order status history
            OrderStatusHistory::create([
                'order_id' => $order->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
                'name_change' => auth()->user()->name,
                'role_change' => auth()->user()->role,
                'note' => $note,
                'change_at' => now(),
                'updated_by' => auth()->id()
            ]);

            // Create notification for status update
            $this->notificationService->createOrderStatusNotification($order, $oldStatus, $newStatus, $note);

            return response()->json([
                'status' => 200,
                'message' => 'Cập nhật trạng thái đơn hàng thành công'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng'
            ]);
        }
    }
} 