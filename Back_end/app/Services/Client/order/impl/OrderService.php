<?php

namespace App\Services\Client\order\impl;

use App\Helpers\BaseResponse;
use App\Models\Notification;
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
use App\Services\NotificationService;


class OrderService implements IOrderService
{

    public OrderRepositories $orderRepositories;
    public VoucherRepositories $voucherRepositories;
    protected $emailService;
    protected $notificationService;

    public function __construct(
        OrderRepositories $orderRepositories,
        VoucherRepositories $voucherRepositories,
        EmailService $emailService,
        NotificationService $notificationService
    ) {
        $this->orderRepositories = $orderRepositories;
        $this->voucherRepositories = $voucherRepositories;
        $this->emailService = $emailService;
        $this->notificationService = $notificationService;
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
        $orderData = $this->orderRepositories->addOrder($validatedData);

        // Trả về kết quả ngay lập tức nếu tạo thành công
        if ($orderData) {
            // Chuyển đổi mảng thành đối tượng Order
            $order = Order::find($orderData['id']);
            
            if ($order) {
                // Tạo thông báo cho admin và người dùng
                $this->notificationService->createNewOrderNotification($order);
                
                // Gửi email xác nhận đơn hàng
                dispatch(new \App\Jobs\SendOrderConfirmationEmail($order->id));
            }
        }
        return $orderData;
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
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $order = $this->orderRepositories->updateOrder($request);
        return $order;
    }

    public function deleteOrder(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        $order = $this->orderRepositories->deleteOrder($request);
        return $order;
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

                // $this->NotificationToUser($order);
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
    private function AddNotificationToAdmin($order){
        // Gửi thông báo đến admin
         Notification::create([
            'user_id' => null,
            'order_id' => $order->id,
            'message' => 'Đơn hàng '.$order->code.' mới đã được đặt',
            'title' => 'Thông báo đơn hàng mới',
            'is_read' => false,
            'recipient_type' => 'admin',
            'type' => 'new_order'
        ]); 
        // Gửi thông báo đến người dùng
        Notification::create([
            'user_id' => $order->users_id,
            'order_id' => $order->id,
            'message' => 'Đơn hàng '.$order->code.' của bạn đã được đặt thành công',
            'title' => 'Thông báo đơn hàng mới',
            'is_read' => false,
            'recipient_type' => 'user',
            'type' => 'new_order'
        ]);
        return true;
    }
    public function NotificationToUser ($order){
        Notification::create([
            'user_id'=> null ,
            'order_id'=> $order->id,
            'recipient_type'=>'user',
            'message' => 'Đơn hàng ' .$order->code .' đã được hủy',
            'title'=>'Trạng thái đơn hàng',
            'is_read'=>false,
        ]);
        return true;
    }
}
