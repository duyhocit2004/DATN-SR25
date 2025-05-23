<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\Order;
use Firebase\JWT\JWT;
use App\Models\Product;
use App\Models\Voucher;
use App\Models\OrderDetail;
use App\Services\EmailService;
use App\Services\NotificationService;

use Illuminate\Support\Str;
use App\Models\Notification;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Models\ProductVariant;
use App\Models\OrderStatusHistory;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\PaymentStatusHistory;
use Illuminate\Support\Facades\Auth;

// use App\Models\OrderDetail as OrderDetailModel;

class OrderRepositories
{
    protected $emailService;
    protected $notificationService;

    public function __construct(EmailService $emailService, NotificationService $notificationService)
    {
        $this->emailService = $emailService;
        $this->notificationService = $notificationService;
    }

    public function addOrder(array $data)
    {
        try {
            $products = $data['products'];
            $totalAmount = 0;
            $voucherAmount = 0;

            // Lấy toàn bộ productId, color, size
            $productIds = array_column($products, 'productId');
            $colorNames = array_unique(array_column($products, 'color'));
            $sizeNames = array_unique(array_column($products, 'size'));

            $productMap = \App\Models\Product::whereIn('id', $productIds)->get()->keyBy('id');
            $colorMap = \App\Models\Color::whereIn('name', $colorNames)->get()->keyBy('name');
            $sizeMap = \App\Models\Size::whereIn('size', $sizeNames)->get()->keyBy('size');

            // Lấy toàn bộ variant liên quan (tối ưu, tránh N+1 query)
            $variantKeys = [];
            foreach ($products as $product) {
                $productId = $product['productId'];
                $colorId = $colorMap[$product['color']]->id ?? null;
                $sizeId = $sizeMap[$product['size']]->id ?? null;
                if ($colorId && $sizeId) {
                    $variantKeys[] = [
                        'product_id' => $productId,
                        'color_id' => $colorId,
                        'size_id' => $sizeId
                    ];
                }
            }
            // Truy vấn 1 lần tất cả variant
            $variantQuery = \App\Models\ProductVariant::query();
            foreach ($variantKeys as $key) {
                $variantQuery->orWhere(function($q) use ($key) {
                    $q->where('product_id', $key['product_id'])
                      ->where('color_id', $key['color_id'])
                      ->where('size_id', $key['size_id']);
                });
            }
            $variants = $variantQuery->get();
            $variantMap = [];
            foreach ($variants as $variant) {
                $variantMap[$variant->product_id . '-' . $variant->color_id . '-' . $variant->size_id] = $variant;
            }

            // Validate products & tính tổng tiền
            foreach ($products as $product) {
                $productReal = $productMap[$product['productId']] ?? null;
                if (!$productReal) {
                    throw new \Exception('Product not found: ' . $product['productId']);
                }
                if ($productReal->status !== 'active') {
                    throw new \Exception('Sản phẩm ' . $productReal->name . ' hiện không khả dụng');
                }
                $color = $colorMap[$product['color']] ?? null;
                if (!$color) {
                    throw new \Exception('Color not found: ' . $product['color']);
                }
                $size = $sizeMap[$product['size']] ?? null;
                if (!$size) {
                    throw new \Exception('Size not found: ' . $product['size']);
                }
                $variantKey = $product['productId'] . '-' . $color->id . '-' . $size->id;
                $productVariant = $variantMap[$variantKey] ?? null;
                if (!$productVariant) {
                    throw new \Exception('Product variant not found: ' . $variantKey);
                }
                // Gộp kiểm tra tồn kho
                if ($productVariant->quantity < $product['quantity'] || $productReal->quantity < $product['quantity']) {
                    throw new \Exception('Sản phẩm ' . $productReal->name . ' (Màu: ' . $color->name . ', Size: ' . $size->size . ') đã hết hàng hoặc không đủ số lượng.');
                }
                // Tính tổng tiền: ưu tiên price_sale nếu có, nếu không thì price_regular
                $price = !empty($productReal['price_sale']) ? $productReal['price_sale'] : $productReal['price_regular'];
                $totalAmount += $price * $product['quantity'];
            }

            // Validate voucher
            if (!empty($data['voucher'])) {
                $voucher = \App\Models\Voucher::where('code', $data['voucher'])->first();
                if ($voucher) {
                    if ($voucher->end_date && $voucher->end_date < now()) {
                        throw new \Exception('Voucher đã hết hạn sử dụng');
                    }
                    if ($voucher->min_order_value && $totalAmount < $voucher->min_order_value) {
                        throw new \Exception('Đơn hàng chưa đạt giá trị tối thiểu để áp dụng voucher');
                    }
                    if ($voucher->used >= $voucher->quantity) {
                        $voucher->update(['status' => 'INACTIVE']);
                        throw new \Exception('Voucher đã hết lượt sử dụng.');
                    }
                    if ($voucher->status !== 'ACTIVE') {
                        throw new \Exception('Voucher không còn hoạt động');
                    }
                    $voucherAmount = $voucher->voucher_price;
                    $totalAmount -= $voucherAmount;
                    $voucher->update([
                        'used' => $voucher->used + 1,
                        'status' => ($voucher->used + 1 >= $voucher->quantity) ? 'INACTIVE' : $voucher->status
                    ]);
                } else {
                    throw new \Exception('Voucher không tồn tại hoặc không hợp lệ');
                }
            }
            if ($totalAmount < 0) $totalAmount = 0;
            if (empty($data['shippingAddress'])) {
                throw new \Exception('Shipping address is required');
            }
            if (!preg_match('/.*,.*,.*,.*$/', $data['shippingAddress'])) {
                throw new \Exception('Invalid shipping address format');
            }
            if (!empty($data['receiverAddress']) && !preg_match('/.*,.*,.*,.*$/', $data['receiverAddress'])) {
                throw new \Exception('Invalid receiver address format');
            }

            DB::beginTransaction();
            $user = JWTAuth::parseToken()->authenticate();
            $order = Order::create([
                'users_id' => $user->id ?? null,
                'code' => 'Od' . Str::random(4),
                'customer_name' => $data['customerName'],
                'email' => ($user && $user->email) ? $user->email : ($data['email'] ?? 'default@email.com'),
                'phone_number' => $data['phoneNumber'],
                'receiver_name' => $data['receiverName'] ?? null,
                'receiver_phone_number' => $data['receiverPhoneNumber'] ?? null,
                'receiver_address' => $data['receiverAddress'] ?? null,
                'shipping_address' => $data['shippingAddress'],
                'total_price' => $totalAmount,
                'voucher' => $data['voucher'] ?? null,
                'voucher_price' => $voucherAmount,
                'payment_method' => $data['paymentMethod'] ?? '',
                'payment_status' => 'UNPAID',
                'note' => $data['note'] ?? null,
                'status' => $data['paymentMethod'] === 'ONLINE' ? 'Confirmed' : 'Unconfirmed',
                'date' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]);

            foreach ($products as $product) {
                $productReal = $productMap[$product['productId']];
                $color = $colorMap[$product['color']];
                $size = $sizeMap[$product['size']];
                $variantKey = $product['productId'] . '-' . $color->id . '-' . $size->id;
                $productVariant = $variantMap[$variantKey];

                OrderDetail::create([
                    'order_id' => $order->id,
                    'name' => $productReal['name'],
                    'image' => $productReal['image'],
                    'price_regular' => $productReal['price_regular'],
                    'price_sale' => $productReal['price_sale'],
                    'discount' => $productReal['discount'],
                    'color' => $product['color'],
                    'size' => $product['size'],
                    'quantity_order' => $product['quantity'],
                    'product_id' => $product['productId'],
                ]);
                // Update tồn kho
                $productVariant->quantity -= $product['quantity'];
                $productVariant->save();
                $productReal->quantity -= $product['quantity'];
                $productReal->quantity_sold += $product['quantity'];
                $productReal->save();
            }
            DB::commit();
            // Chỉ trả về dữ liệu cần thiết
            return [
                'id' => $order->id,
                'code' => $order->code,
                'status' => $order->status,
                'message' => 'Đặt hàng thành công!'
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getOrders(Request $request)
    {
        $status = $request->input('status');
        $orderCode = $request->input('orderCode');
        $phoneNumber = $request->input('phoneNumber');
        $fromDate = $request->input('fromDate');
        $toDate = $request->input('toDate');
        $paymentStatus = $request->input('paymentStatus');
        $paymentMethod = $request->input('paymentMethod');
        $voucherCode = $request->input('voucherCode');
        $totalAmount = $request->input('totalAmount');
        $userId = $request->input('userId');

        $query = Order::with(['order_details']);

        // Filter by user_id if provided
        if (!empty($userId)) {
            $query->where('users_id', $userId);
        }

        // Only validate voucher if voucherCode is provided
        if (!empty($voucherCode)) {
            $voucher = Voucher::where('code', $voucherCode)->first();
            if (!$voucher) {
                return BaseResponse::failure('400', 'Voucher not found', 'voucher.not.found', []);
            }
            if ($voucher->status !== 'ACTIVE') {
                return BaseResponse::failure('400', 'Voucher is not active', 'voucher.not.active', []);
            }
            if ($voucher->end_date && $voucher->end_date < now()) {
                return BaseResponse::failure('400', 'Voucher expired', 'voucher.expired', []);
            }
            if ($voucher->min_order_value && $totalAmount < $voucher->min_order_value) {
                return BaseResponse::failure('400', 'Order does not meet minimum value for voucher', 'order.not.meet.min.value', []);
            }
            // Optionally filter orders by voucher
            $query->where('voucher', $voucherCode);
        }

        if (!empty($status)) {
            $query->where('status', '=', $status);
        }
        if (!empty($phoneNumber)) {
            $query->where('receiver_phone_number', '=', $phoneNumber);
        }
        if (!empty($orderCode)) {
            $query->where('code', 'like', '%' . $orderCode . '%');
        }
        if (!empty($fromDate)) {
            $query->where('date', '>=', $fromDate);
        }
        if (!empty($toDate)) {
            $query->where('date', '<=', $toDate);
        }
        if (!empty($paymentStatus)) {
            $query->where('payment_status', '=', $paymentStatus);
        }
        if (!empty($paymentMethod)) {
            $query->where('payment_method', '=', $paymentMethod);
        }

        $orders = $query->get();
        return $orders;
    }

    public function getOrdersPaging(Request $request)
    {
        $status = $request->input('status');
        $orderCode = $request->input('orderCode');
        $phoneNumber = $request->input('phoneNumber');
        $fromDate = $request->input('fromDate');
        $toDate = $request->input('toDate');
        $perPage = $request->input('pageSize', 10);
        $page = $request->input('pageNum', 1);
        $userId = $request->input('userId');
        $isAdmin = $request->input('isAdmin', false);

        $paymentStatus = $request->input('paymentStatus');
        $paymentMethod = $request->input('paymentMethod');

        $query = Order::with(['order_details']);
        
        // Chỉ lọc theo user_id nếu không phải admin và có userId
        if (!$isAdmin && !empty($userId)) {
            $query->where('users_id', $userId);
        }

        if (!empty($status)) {
            $statuses = is_array($status) ? $status : explode(',', $status);
            $query->whereIn('status', $statuses);
        }
        if (!empty($phoneNumber)) {
            $query->where('receiver_phone_number', '=', $phoneNumber);
        }
        if (!empty($orderCode)) {
            $query->where('code', 'like', '%' . $orderCode . '%');
        }
        if (!empty($fromDate)) {
            $query->where('date', '>=', $fromDate);
        }
        if (!empty($toDate)) {
            $query->where('date', '<=', $toDate);
        }
        if (!empty($paymentStatus)) {
            $query->where('payment_status', '=', $paymentStatus);
        }
        if (!empty($paymentMethod)) {
            $query->where('payment_method', '=', $paymentMethod);
        }
        if (!empty($sortType)) {
            $query->orderByRaw('IFNULL(date, status) ' . $sortType);
        }
        $orders = $query->orderBy('created_at', 'desc')->paginate($perPage, ['*'], 'page', $page);
        return $orders;
    }

    public function getOrderDetail(Request $request)
    {
        $code = $request->input('orderCode');
        $order = Order::with(['order_details', 'paymentStatusHistories'])->where('code', '=', $code)->first();
        return $order;
    }

    // public function updateOrder(Request $request)
    // {
    //     $order = Order::where('id', $request->input('id'))->first();
    //     $user = auth()->user();
    //     if (!empty($order)) {
    //         // Lưu lại giá trị cũ
    //         $oldStatus = $order->status;
    //         $oldPaymentStatus = $order->payment_status;

    //         // Lấy giá trị mới từ request
    //         $status = $request->input('status', $order->status);
    //         $paymentStatus = $request->input('paymentStatus', $order->payment_status);

    //         // Check if status is delivered and payment method is COD
    //         if ($status === 'Delivered' && $order->payment_method === 'COD') {
    //             $paymentStatus = 'PAID';
    //         }

    //         // Lưu lịch sử thay đổi trạng thái thanh toán trước khi cập nhật
    //         if ($oldPaymentStatus !== $paymentStatus) {
    //             PaymentStatusHistory::create([
    //                 'order_id' => $order->id,
    //                 'old_status' => $oldPaymentStatus,
    //                 'new_status' => $paymentStatus,
    //                 'name_change' => $user->name ?? 'System',
    //                 'role_change' => $user->role ?? 'System',
    //                 'note' => $request->input('note'),
    //                 'change_at' => now()
    //             ]);
    //         }

    //         // Lưu lịch sử thay đổi trạng thái đơn hàng trước khi cập nhật
    //         if ($oldStatus !== $status) {
    //             OrderStatusHistory::create([
    //                 'order_id' => $order->id,
    //                 'old_status' => $oldStatus,
    //                 'new_status' => $status,
    //                 'name_change' => $user->name ?? 'System',
    //                 'role_change' => $user->role ?? 'System',
    //                 'note' => $request->input('note'),
    //                 'change_at' => now()
    //             ]);
    //         }

    //         // Cập nhật order
    //         $order->status = $status;
    //         $order->payment_status = $paymentStatus;
    //         // Chỉ cập nhật note nếu không phải hoàn tiền
    //         if ($status !== 'Cancel' && $paymentStatus !== 'REFUNDED') {
    //             $order->note = $request->input('note');
    //         }
    //         $order->save();

    //         return $order;
    //     } else {
    //         BaseResponse::failure(400, '', 'order.item.not.found', []);
    //     }
    // }
    private $orderStatusSequence = [
        'Unconfirmed',       // Chưa xác nhận
        'Confirmed',         // Đã xác nhận
        'Processing',        // Đang chuẩn bị hàng
        'Shipping',          // Đang giao hàng 
        'Delivered',         // Đã giao hàng
        'Received',          // Đã nhận được hàng
        'Cancel Confirm',    // Xác nhận hủy
        'Cancel'             // Đã hủy
    ];

    private function validateStatusTransition($currentStatus, $newStatus)
    {
        $currentIndex = array_search($currentStatus, $this->orderStatusSequence);
        if ($currentIndex === false) {
            return false;
        }

        switch ($currentStatus) {
            case 'Received':
                // Từ Received không thể chuyển sang trạng thái khác
                return false;

            case 'Cancel':
                // Từ Cancel không thể chuyển sang trạng thái khác
                return false;

            case 'Unconfirmed':
                // Từ Unconfirmed có thể chuyển sang Confirmed hoặc Cancel Confirm
                return in_array($newStatus, ['Confirmed', 'Cancel Confirm']);

            case 'Confirmed':
                // Từ Confirmed có thể chuyển sang Processing hoặc Cancel Confirm
                return in_array($newStatus, ['Processing', 'Cancel Confirm']);

            case 'Delivered':
                // Từ Delivered chỉ có thể chuyển sang Received
                return $newStatus === 'Received';

            default:
                // Các trường hợp còn lại chỉ được chuyển sang trạng thái kế tiếp
                $nextStatus = $this->orderStatusSequence[$currentIndex + 1] ?? null;
                return $newStatus === $nextStatus;
        }
    }
    public function updateOrder(Request $request)
    {
        $order = Order::find($request->input('id'));
        if (!$order) {
            return BaseResponse::failure(404, 'Đơn hàng không tồn tại', 'order.not.found', []);
        }

        $oldStatus = $order->status;
        $newStatus = $request->input('status');

        // Kiểm tra tính hợp lệ của việc chuyển trạng thái
        if (!$this->validateStatusTransition($oldStatus, $newStatus)) {
            return BaseResponse::failure(400, 'Không thể chuyển trạng thái đơn hàng theo thứ tự này', 'invalid.status.transition', []);
        }

        DB::beginTransaction();
        try {
            // Lưu trạng thái cũ
            $oldPaymentStatus = $order->payment_status;

            // Cập nhật payment status nếu đơn hàng được giao thành công và thanh toán COD
            if ($newStatus === 'Delivered' && $order->payment_method === 'COD') {
                $order->payment_status = 'PAID';
            }

            // Lưu lịch sử thay đổi trạng thái
            OrderStatusHistory::create([
                'order_id' => $order->id,
                'old_status' => $oldStatus,
                'new_status' => $newStatus,
                'name_change' => auth()->user()->name ?? 'System',
                'role_change' => auth()->user()->role ?? 'System',
                'note' => $request->input('note'),
                'change_at' => now()
            ]);

            // Cập nhật đơn hàng
            $order->status = $newStatus;
            $order->note = $request->input('note');
            $order->save();

            event(new \App\Events\UserNotification($order));

            //thông báo trạng thái đơn hàng cho người dùng

            DB::commit();
            return BaseResponse::success($order);

        } catch (\Exception $e) {
            DB::rollBack();
            return BaseResponse::failure(500, $e->getMessage(), 'update.order.error', []);
        }
    }

    public function updateOrderPayment($orderCode, $paymentStatus)
    {
        // Tìm đơn hàng theo mã đơn hàng (orderCode)
        $order = Order::where('code', $orderCode)->first();

        // Nếu không tìm thấy đơn hàng, trả về lỗi
        if (!$order) {
            throw new \Exception('Order not found');
        }

        // Cập nhật trạng thái thanh toán
        $order->update([
            'payment_status' => $paymentStatus,
        ]);

        return $order;
    }

    public function deleteOrder($orderId)
    {
        $order = Order::find($orderId);
        if (!$order) {
            return false;
        }
        $order->delete();
        return true;
    }

    public function refundOrder($orderId, $adminId, $refundReason)
    {
        try {
            \Log::info('Bắt đầu refundOrder', [
                'orderId' => $orderId,
                'adminId' => $adminId,
                'refundReason' => $refundReason
            ]);

            $order = Order::find($orderId);
            if (!$order) {
                \Log::error('Không tìm thấy đơn hàng', ['orderId' => $orderId]);
                return [
                    'status' => 'error',
                    'message' => 'Không tìm thấy đơn hàng',
                    'code' => 404,
                    'data' => []
                ];
            }

            \Log::info('Đơn hàng tìm thấy', [
                'order' => $order->toArray(),
                'payment_status' => $order->payment_status,
                'refund_status' => $order->refund_status
            ]);

            if ($order->payment_status !== 'PAID') {
                \Log::error('Đơn hàng chưa thanh toán', ['order' => $order->toArray()]);
                return [
                    'status' => 'error',
                    'message' => 'Đơn hàng chưa thanh toán',
                    'code' => 400,
                    'data' => []
                ];
            }

            if ($order->refund_status === 'REFUNDED') {
                \Log::error('Đơn hàng đã hoàn tiền', ['order' => $order->toArray()]);
                return [
                    'status' => 'error',
                    'message' => 'Đơn hàng đã được hoàn tiền trước đó',
                    'code' => 400,
                    'data' => []
                ];
            }

            if (!Auth::check()) {
                \Log::error('Quản trị viên chưa đăng nhập');
                return [
                    'status' => 'error',
                    'message' => 'Quản trị viên chưa đăng nhập',
                    'code' => 401,
                    'data' => []
                ];
            }

            DB::beginTransaction();

            try {
                $oldStatus = $order->status;
                $oldPaymentStatus = $order->payment_status;

                \Log::info('Cập nhật trạng thái đơn hàng', [
                    'oldStatus' => $oldStatus,
                    'oldPaymentStatus' => $oldPaymentStatus
                ]);

                $updateResult = $order->update([
                    'status' => 'Cancel',
                    'refund_status' => 'REFUNDED',
                    'refund_reason' => $refundReason,
                    'refunded_by' => $adminId,
                    'refunded_at' => now(),
                    'payment_status' => 'REFUNDED'
                ]);

                \Log::info('Kết quả cập nhật đơn hàng', ['updateResult' => $updateResult]);

                if (!$updateResult) {
                    throw new \Exception('Không thể cập nhật trạng thái đơn hàng');
                }

                $orderHistoryResult = OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $oldStatus,
                    'new_status' => 'Cancel',
                    'name_change' => Auth::user()->name ?? 'System',
                    'role_change' => Auth::user()->role ?? 'System',
                    'note' => $refundReason,
                    'change_at' => now()
                ]);

                \Log::info('Tạo lịch sử trạng thái đơn hàng', ['orderHistoryResult' => $orderHistoryResult]);

                if (!$orderHistoryResult) {
                    throw new \Exception('Không thể tạo lịch sử trạng thái đơn hàng');
                }

                $paymentHistoryResult = PaymentStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $oldPaymentStatus,
                    'new_status' => 'REFUNDED',
                    'name_change' => Auth::user()->name ?? 'System',
                    'role_change' => Auth::user()->role ?? 'System',
                    'note' => $refundReason,
                    'change_at' => now()
                ]);

                \Log::info('Tạo lịch sử trạng thái thanh toán', ['paymentHistoryResult' => $paymentHistoryResult]);

                if (!$paymentHistoryResult) {
                    throw new \Exception('Không thể tạo lịch sử trạng thái thanh toán');
                }

                \Log::info('Tạo lịch sử thành công, commit transaction');

                DB::commit();

                $order = Order::with(['order_details', 'statusHistories', 'paymentStatusHistories'])
                    ->find($orderId);

                return [
                    'status' => 'success',
                    'message' => 'Hoàn tiền thành công',
                    'code' => 200,
                    'data' => $order
                ];
            } catch (\Exception $e) {
                DB::rollBack();
                \Log::error('Lỗi transaction refund', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                    'orderId' => $orderId,
                    'adminId' => $adminId
                ]);
                return [
                    'status' => 'error',
                    'message' => 'Hoàn tiền thất bại: ' . $e->getMessage(),
                    'code' => 500,
                    'data' => []
                ];
            }
        } catch (\Exception $e) {
            \Log::error('Lỗi refundOrder', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'orderId' => $orderId,
                'adminId' => $adminId
            ]);
            return [
                'status' => 'error',
                'message' => 'Hoàn tiền thất bại: ' . $e->getMessage(),
                'code' => 500,
                'data' => []
            ];
        }
    }
    public function cancelOrderByClient(Request $request)
    {

        \Log::info('Bắt đầu xử lý hủy đơn hàng', [
            'orderCode' => $request->input('orderCode'),
            'userId' => auth()->id()
        ]);

        $orderCode = $request->input('orderCode');
        $user = auth()->user();
        $order = Order::where('code', $orderCode)
            ->where('users_id', $user->id)
            ->first();

        if (!$order) {
            \Log::warning('Đơn hàng không tồn tại hoặc không thuộc về user', [
                'orderCode' => $orderCode,
                'userId' => $user->id
            ]);
            return BaseResponse::failure('404', 'Đơn hàng không tồn tại hoặc không thuộc quyền sở hữu của bạn', 'order.not.found', []);
        }

        \Log::info('Tìm thấy đơn hàng', ['order' => $order->toArray()]);

        try {
            DB::beginTransaction();
            // Cập nhật trạng thái đơn hàng
            $order->status = 'Cancelled';
            $order->updated_at = now();
            $order->save();
            \Log::info('Đã cập nhật trạng thái đơn hàng thành công');

            DB::commit();
            return BaseResponse::success('Hủy đơn hàng thành công', 'order.cancelled.success', $order);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Lỗi khi hủy đơn hàng', [
                'error' => $e->getMessage(),
                'orderCode' => $orderCode
            ]);
            return BaseResponse::failure('500', 'Đã xảy ra lỗi khi hủy đơn hàng', 'order.cancel.error', []);
        }
    }

    private function UserOrderStatusNotification($order){

        $user = $order->user_id;
        if ($user) {
            if($order->status == 'CONFIRMED'){
                 Notification::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'message' => 'Đơn hàng '.$order->code.' mới đã được đặt',
                'title' => 'Thông báo đơn hàng mới',
                'is_read' => false,
                'recipient_type' => $order->user_id ? 'user' : 'admin'
                ]); 
            }else if($order->status == 'Cancel Confirm'){
                Notification::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'message' => 'Đơn hàng '.$order->code.' đã được hủy bên hệ thống',
                'title' => 'Thông báo đơn hàng đã hủy',
                'is_read' => false,
                'recipient_type' => $order->user_id ? 'user' : 'admin'
                ]);
            }else if($order->status == 'Shipping'){
                Notification::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'message' => 'Đơn hàng '.$order->code.' đã được giao vui lòng thường xuyên kiểm tra điện thoại để nhận thông báo từ nhân viên giao hàng',
                'title' => 'Thông báo đơn hàng đang được giao',
                'is_read' => false,
                'recipient_type' => $order->user_id ? 'user' : 'admin'
                ]);
            }else if($order->status == 'Delivered'){
                Notification::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'message' => 'Đơn hàng '.$order->code.' đã được giao thành công vui lòng kiểm tra lại đơn hàng của bạn', 
                'title' => 'Thông báo đơn hàng đã giao',
                'is_read' => false,
                'recipient_type' => $order->user_id ? 'user' : 'admin'
                ]);

            }
            // Gửi thông báo cho người dùng
            event(new \App\Events\UserNotification($order));
        } else {
            \Log::warning('Không tìm thấy người dùng cho đơn hàng', ['orderId' => $order->id]);
        }
    }
}

