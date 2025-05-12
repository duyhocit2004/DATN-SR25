<?php

namespace App\Services\Client\order\impl;

use App\Helpers\BaseResponse;
use App\Models\Order;
use App\Models\OrderStatusHistory;
use App\Repositories\OrderRepositories;
use App\Repositories\VoucherRepositories;
use App\Services\Client\order\IOrderService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Services\EmailService;


class OrderService implements IOrderService
{

    public OrderRepositories $orderRepositories;
    public VoucherRepositories $voucherRepositories;
    protected $emailService;

    public function __construct(
        OrderRepositories $orderRepositories,
        VoucherRepositories $voucherRepositories,
        EmailService $emailService
    ) {
        $this->orderRepositories = $orderRepositories;
        $this->voucherRepositories = $voucherRepositories;
        $this->emailService = $emailService;
    }


    public function addOrder(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'nullable| integer|exists:users,id',
            'customerName' => 'required|string',
            'email' => 'required|email',
            'phoneNumber' => 'required|string',
            'receiverName' => 'nullable|string',
            'receiverPhoneNumber' => 'nullable|string',
            'receiverAddress' => 'nullable|string',
            'shippingAddress' => 'required|string',
            'totalAmount' => 'required|numeric',
            'paymentMethod' => 'required|string',
            'products' => 'required|array',
            'voucher' => 'nullable|string',
            'voucherPrice' => 'nullable|numeric',
            'note' => 'nullable|string',
        ]);

        // Gán giá trị mặc định nếu không có voucher
        $validatedData['voucher'] = $validatedData['voucher'] ?? null;

        // Gửi dữ liệu đến repository
        $order = $this->orderRepositories->addOrder($validatedData);
        
        // Broadcast notification event
        if ($order) {
            app(\App\Services\NotificationService::class)->createNewOrderNotification($order);
            
            // Send order confirmation email
            $this->emailService->sendOrderConfirmation($order);
        }
        
        return $order;
    }

    public function getOrders(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user)) {
            return BaseResponse::failure(401, 'Unauthorized', 'unauthorized', []);
        }
        $request->merge(['userId' => $user->id]);
        $orders = $this->orderRepositories->getOrders($request);

        $list = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'code' => $order->code,
                'users_id' => $order->users_id,
                'customerName' => $order->customer_name,
                'email' => $order->email,
                "phoneNumber" => $order->phone_number,
                'receiverName' => $order->receiver_name ?? null,
                'receiverPhoneNumber' => $order->receiver_phone_number ?? null,
                'receiverAddress' => $order->receiver_address ?? null,
                'totalPrice' => $order->total_price,
                'priceSale' => $order->price_sale,
                'voucher' => $order->voucher,
                'voucherPrice' => $order->voucher_price,
                'shippingAddress' => $order->shipping_address,
                'note' => $order->note,
                'status' => $order->status,
                'orderTime' => $order->date,
                'products' =>
                    $order->order_details ? $order->order_details->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'orderId' => $product->order_id,
                            'product_id' => $product->product_id,
                            'name' => $product->name,
                            'image' => $product->image,
                            'priceRegular' => $product->price_regular,
                            'priceSale' => $product->price_sale,
                            'discount' => $product->discount,
                            'color' => $product->color,
                            'size' => $product->size,
                            'quantity' => $product->quantity_order,
                            'status' => $product->product ? $product->product->status : 'active',
                        ];
                    }) : [],
                'createdAt' => $order->created_at,
                'updatedAt' => $order->updated_at,
                'deletedAt' => $order->deleted_at,
            ];
        });
        return $list;

    }

    public function getOrdersPaging(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user)) {
            return BaseResponse::failure(401, 'Unauthorized', 'unauthorized', []);
        }
        $request->merge(['userId' => $user->id]);
        $orders = $this->orderRepositories->getOrdersPaging($request);

        $list = $orders->getCollection()->map(function ($order) {
            return [
                'id' => $order->id,
                'code' => $order->code,
                'users_id' => $order->users_id,
                'customerName' => $order->customer_name,
                'email' => $order->email,
                "phoneNumber" => $order->phone_number,
                'totalPrice' => $order->total_price,
                'priceSale' => $order->price_sale,
                'voucher' => $order->voucher,
                'voucherPrice' => $order->voucher_price,
                'shippingAddress' => $order->shipping_address,
                'paymentStatus' => $order->payment_status,
                'paymentMethod' => $order->payment_method,
                'note' => $order->note,
                'status' => $order->status,
                'orderTime' => $order->date,
                'products' =>
                    $order->order_details ? $order->order_details->map(function ($product) {
                        return [
                            'id' => $product->id,
                            'orderId' => $product->order_id,
                            'product_id' => $product->product_id,
                            'name' => $product->name,
                            'image' => $product->image,
                            'priceRegular' => $product->price_regular,
                            'priceSale' => $product->price_sale,
                            'discount' => $product->discount,
                            'color' => $product->color,
                            'size' => $product->size,
                            'quantity' => $product->quantity_order,
                            'status' => $product->product ? $product->product->status : 'active',
                        ];
                    }) : [],
                'createdAt' => $order->created_at,
                'updatedAt' => $order->updated_at,
                'deletedAt' => $order->deleted_at,
            ];
        });
        return $orders->setCollection($list);
    }

    public function getOrderDetail(Request $request)
    {
        $order = $this->orderRepositories->getOrderDetail($request);
        if ($order) {
            return [
                'id' => $order->id,
                'code' => $order->code,
                'users_id' => $order->users_id,
                'customerName' => $order->customer_name,
                'email' => $order->email,
                "phoneNumber" => $order->phone_number,
                'receiverName' => $order->receiver_name ?? null,
                'receiverPhoneNumber' => $order->receiver_phone_number ?? null,
                'receiverAddress' => $order->receiver_address ?? null,
                'totalPrice' => $order->total_price,
                'priceSale' => $order->price_sale,
                'voucher' => $order->voucher,
                'voucherPrice' => $order->voucher_price,
                'shippingAddress' => $order->shipping_address,
                'paymentStatus' => $order->payment_status,
                'paymentMethod' => $order->payment_method,
                'note' => $order->note,
                'status' => $order->status,
                'orderTime' => $order->date,
                'products' => $order->order_details ? $order->order_details->map(function ($product) {
                    return [
                        'id' => $product->id,
                        'orderId' => $product->order_id,
                        'product_id' => $product->product_id,
                        'name' => $product->name,
                        'image' => $product->image,
                        'priceRegular' => $product->price_regular,
                        'priceSale' => $product->price_sale,
                        'discount' => $product->discount,
                        'color' => $product->color,
                        'size' => $product->size,
                        'quantity' => $product->quantity_order,
                        'status' => $product->product ? $product->product->status : 'active',
                    ];
                }) : [],
                'statusHistories' => $order->statusHistories ? $order->statusHistories->map(function ($history) {
                    return [
                        'id' => $history->id,
                        'order_id' => $history->order_id,
                        'old_status' => $history->old_status,
                        'new_status' => $history->new_status,
                        'name_change' => $history->name_change,
                        'role_change' => $history->role_change,
                        'note' => $history->note,
                        'change_at' => $history->change_at,
                    ];
                }) : [],
                'paymentStatusHistories' => $order->paymentStatusHistories ? $order->paymentStatusHistories->map(function ($history) {
                    return [
                        'id' => $history->id,
                        'order_id' => $history->order_id,
                        'old_status' => $history->old_status,
                        'new_status' => $history->new_status,
                        'name_change' => $history->name_change,
                        'role_change' => $history->role_change,
                        'note' => $history->note,
                        'change_at' => $history->change_at,
                    ];
                }) : [],
                'createdAt' => $order->created_at,
                'updatedAt' => $order->updated_at,
                'deletedAt' => $order->deleted_at,
            ];
        }
        return null;
    }

    public function getVoucher(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user)) {
            return BaseResponse::failure(401, 'Unauthorized', 'unauthorized', []);
        }

        $request->merge(['userId' => $user->id]);
        // Lấy response từ repository
        $response = $this->voucherRepositories->applyVoucher($request);
        // Nếu là instance của Illuminate\Http\JsonResponse thì trả về luôn
        if ($response instanceof \Illuminate\Http\JsonResponse) {
            return $response;
        }
        // Nếu là array thì trả về dạng json
        return response()->json($response);
    }

    public function updateOrder(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN') && $user->role !== config('constants.USER_TYPE_MANAGER'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }
        $list = $this->orderRepositories->updateOrder($request);
        return $list;
    }


    public function deleteOrder(Request $request)
    {
        
        // Xác thực người dùng
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN') && $user->role !== config('constants.USER_TYPE_MANAGER'))) {
            JWTAuth::invalidate(JWTAuth::getToken());
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        // Xóa đơn hàng
        $orderId = $request->input('id');
        $result = $this->orderRepositories->deleteOrder($orderId);

        if ($result) {
            return BaseResponse::success(['message' => 'Đơn hàng đã được xóa thành công']);
        } else {
            return BaseResponse::failure(400, 'Không thể xóa đơn hàng', 'order.delete.failed', []);
        }
    }



    public function refundOrder(Request $request)
    {
        $orderId = $request->input('orderId');
        \Log::info('Bắt đầu xử lý hoàn tiền cho orderId:', ['orderId' => $orderId]); // Log orderId

        $order = Order::find($orderId);

        if (!$order || $order->payment_method !== 'ONLINE' || $order->payment_status !== 'PAID') {
            \Log::warning('Đơn hàng không hợp lệ để hoàn tiền:', ['order' => $order]);
            throw new \Exception('Đơn hàng không hợp lệ để hoàn tiền.');
        }

        // Gọi API VNPay để hoàn tiền
        $refundResponse = VNPayService::refund($order->transaction_id, $order->total_price);
        \Log::info('Phản hồi từ VNPay:', ['response' => $refundResponse]); // Log phản hồi từ VNPay

        if ($refundResponse['success']) {
            $order->update([
                'payment_status' => 'REFUNDED',
                'status' => 'CANCELLED',
            ]);
            \Log::info('Hoàn tiền thành công cho orderId:', ['orderId' => $orderId]);
            return $order;
        } else {
            \Log::error('Hoàn tiền thất bại:', ['response' => $refundResponse]);
            throw new \Exception('Hoàn tiền thất bại.');
        }
    }




    public function cancelOrderByClient(Request $request)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return BaseResponse::failure(401, 'Unauthorized', 'auth.unauthorized', []);
            }

            $orderId = $request->input('orderId');
            $orderCode = $request->input('orderCode');

            if (!$orderId && !$orderCode) {
                return BaseResponse::failure(400, 'Mã đơn hàng không được để trống', 'order.id.required', []);
            }

            Log::info('Attempting to cancel order:', ['orderId' => $orderId, 'orderCode' => $orderCode, 'userId' => $user->id]);

            $query = Order::where('users_id', $user->id);
            if ($orderId) {
                $query->where('id', $orderId);
            } else {
                $query->where('code', $orderCode);
            }
            $order = $query->first();

            if (!$order) {
                Log::warning('Order not found or not owned by user:', ['orderId' => $orderId, 'orderCode' => $orderCode, 'userId' => $user->id]);
                return BaseResponse::failure(404, 'Không tìm thấy đơn hàng', 'order.not_found', []);
            }

            Log::info('Current order status:', ['orderId' => $order->id, 'status' => $order->status]);

            if (!in_array($order->status, ['Unconfirmed', 'Confirmed'])) {
                Log::warning('Invalid order status for cancellation:', ['orderId' => $order->id, 'status' => $order->status]);
                return BaseResponse::failure(400, 'Không thể hủy đơn hàng ở trạng thái này', 'order.cancel.invalid_status', []);
            }

            DB::beginTransaction();
            try {
                $oldStatus = $order->status;
                $order->status = 'Cancel';
                $order->save();

                Log::info('Order status updated:', ['orderId' => $order->id, 'oldStatus' => $oldStatus, 'newStatus' => 'Cancel']);

                OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $oldStatus,
                    'new_status' => 'Cancel',
                    'name_change' => $user->name,
                    'role_change' => $user->role,
                    'note' => 'Khách hàng hủy đơn hàng',
                    'change_at' => now()
                ]);

                DB::commit();
                Log::info('Order cancelled successfully:', ['orderId' => $order->id]);
                
                return BaseResponse::success([
                    'message' => 'Hủy đơn hàng thành công',
                    'order' => $order
                ]);
            } catch (\Exception $e) {
                DB::rollBack();
                Log::error('Error during order cancellation transaction:', [
                    'error' => $e->getMessage(),
                    'orderId' => $order->id,
                    'trace' => $e->getTraceAsString()
                ]);
                return BaseResponse::failure(500, 'Có lỗi xảy ra khi hủy đơn hàng: ' . $e->getMessage(), 'order.cancel.error', []);
            }
        } catch (\Exception $e) {
            Log::error('Unexpected error during order cancellation:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return BaseResponse::failure(500, 'Có lỗi xảy ra khi hủy đơn hàng: ' . $e->getMessage(), 'order.cancel.error', []);
        }
    }

}
