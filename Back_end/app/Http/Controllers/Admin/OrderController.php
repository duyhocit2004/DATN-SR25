<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\PaymentStatusHistory;
use App\Repositories\OrderRepositories;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected $orderRepository;

    public function __construct(OrderRepositories $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $orders = Order::with(['user', 'orderDetails.product'])->latest()->paginate(10);
        return response()->json($orders);
    }

    public function show($id)
    {
        $order = Order::with([
            'user', 
            'orderDetails.product',
            'statusHistories',
            'paymentStatusHistories'
        ])->findOrFail($id);
        return response()->json($order);
    }

    public function refund(Request $request, $id)
    {
        try {
            $order = Order::findOrFail($id);
            $refundReason = $request->input('refund_reason');

            if ($order->refund_status === 'REFUNDED') {
                return response()->json([
                    'status' => 400,
                    'message' => 'Đơn hàng đã được hoàn tiền trước đó',
                    'data' => []
                ], 400);
            }

            // Lấy thông tin admin
            $admin = Auth::user();
            $adminName = $admin->name ?? 'System';
            $adminRole = $admin->role ?? 'admin';

            DB::beginTransaction();
            try {
                // Cập nhật trạng thái đơn hàng
                $oldPaymentStatus = $order->payment_status;
                $order->refund_status = 'REFUNDED';
                $order->refund_reason = $refundReason;
                $order->refunded_by = $admin->id;
                $order->refunded_at = now();
                $order->payment_status = 'REFUNDED';
                $order->save();

                // Thêm lịch sử hoàn tiền vào payment_status_histories
                PaymentStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $oldPaymentStatus ?? 'PAID',
                    'new_status' => 'REFUNDED',
                    'name_change' => $adminName,
                    'role_change' => $adminRole,
                    'note' => $refundReason,
                    'change_at' => now()
                ]);

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => 'Hoàn tiền thành công',
                    'data' => $order
                ]);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Lỗi hoàn tiền: ' . $e->getMessage());
            return response()->json([
                'status' => 500,
                'message' => 'Lỗi hoàn tiền: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateOrder(Request $request)
    {
        try {
            if (!Auth::check()) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Người dùng chưa đăng nhập'
                ], 401);
            }

            $order = Order::find($request->input('id'));
            if (!$order) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Không tìm thấy đơn hàng'
                ], 404);
            }

            $admin = Auth::user();
            $adminName = $admin->name ?? 'System';
            $adminRole = $admin->role ?? 'admin';

            DB::beginTransaction();
            try {
                $oldStatus = $order->status;
                $oldPaymentStatus = $order->payment_status;
                
                // Cập nhật trạng thái đơn hàng
                $order->status = $request->input('status', $order->status);
                $order->payment_status = $request->input('paymentStatus', $order->payment_status);
                $order->note = $request->input('note', $order->note);
                
                // Nếu đơn hàng được giao thành công và thanh toán COD, tự động cập nhật trạng thái thanh toán
                if ($order->status === 'Delivered' && $order->payment_method === 'COD') {
                    $order->payment_status = 'PAID';
                }
                
                $order->save();

                // Lưu lịch sử thay đổi trạng thái đơn hàng
                if ($oldStatus !== $order->status) {
                    \App\Models\OrderStatusHistory::create([
                        'order_id' => $order->id,
                        'old_status' => $oldStatus,
                        'new_status' => $order->status,
                        'name_change' => $adminName,
                        'role_change' => $adminRole,
                        'note' => $request->input('note'),
                        'change_at' => now(),
                        'updated_by' => $admin->id
                    ]);
                }

                // Lưu lịch sử thay đổi trạng thái thanh toán
                if ($oldPaymentStatus !== $order->payment_status) {
                    PaymentStatusHistory::create([
                        'order_id' => $order->id,
                        'old_status' => $oldPaymentStatus ?? 'UNPAID',
                        'new_status' => $order->payment_status,
                        'name_change' => $adminName,
                        'role_change' => $adminRole,
                        'note' => $request->input('note'),
                        'change_at' => now()
                    ]);
                }

                DB::commit();

                return response()->json([
                    'status' => 200,
                    'message' => 'Cập nhật đơn hàng thành công',
                    'data' => $order
                ]);
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        } catch (\Exception $e) {
            Log::error('Lỗi cập nhật đơn hàng: ' . $e->getMessage());
            return response()->json([
                'status' => 500,
                'message' => 'Lỗi cập nhật đơn hàng: ' . $e->getMessage()
            ], 500);
        }
    }
} 