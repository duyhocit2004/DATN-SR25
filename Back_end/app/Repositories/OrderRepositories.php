<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\Order;
use Firebase\JWT\JWT;
use App\Models\Product;
use App\Models\Voucher;
use App\Models\OrderDetail;

use App\Models\OrderStatusHistory;
use App\Models\PaymentStatusHistory;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;


class OrderRepositories
{

    public function addOrder(array $data)
    {
        try {
            $products = $data['products'];
            $totalAmount = 0;
            $voucherAmount = 0;

            // Validate products
            foreach ($products as $product) {
                \Log::info('Processing product for order', [
                    'product' => $product,
                    'productId' => $product['productId'],
                    'color' => $product['color'],
                    'size' => $product['size']
                ]);

                $productReal = Product::where('id', $product['productId'])->first();
                if (!$productReal) {
                    \Log::error('Product not found', ['productId' => $product['productId']]);
                    return BaseResponse::failure('400', 'Product not found', 'product.not.found', []);
                }

                $color = \App\Models\Color::where('code', $product['color'])
                    ->orWhere('name', $product['color'])
                    ->first();
                if (!$color) {
                    \Log::error('Color not found', [
                        'colorCode' => $product['color'],
                        'product' => $product
                    ]);
                    return BaseResponse::failure('400', 'Color not found', 'color.not.found', []);
                }

                $size = \App\Models\Size::where('size', $product['size'])->first();
                if (!$size) {
                    \Log::error('Size not found', ['size' => $product['size']]);
                    return BaseResponse::failure('400', 'Size not found', 'size.not.found', []);
                }

                $productVariant = ProductVariant::where('product_id', $product['productId'])
                    ->where('color_id', $color->id)
                    ->where('size_id', $size->id)
                    ->first();

                \Log::info('Product variant search result', [
                    'productVariant' => $productVariant,
                    'colorId' => $color->id,
                    'sizeId' => $size->id
                ]);

                if (!$productVariant) {
                    \Log::error('Product variant not found', [
                        'productId' => $product['productId'],
                        'colorId' => $color->id,
                        'sizeId' => $size->id
                    ]);
                    return BaseResponse::failure('400', 'Product variant not found', 'product.variant.not.found', []);
                }

                if ($productVariant['quantity'] < $product['quantity']) {
                    return BaseResponse::failure(
                        '400',
                        'Sản phẩm ' . $productReal->name . ' (Màu: ' . $color->name . ', Size: ' . $size->size . ') đã hết hàng hoặc không đủ số lượng.',
                        'product.out.of.stock',
                        [
                            'productName' => $productReal->name,
                            'color' => $color->name,
                            'size' => $size->size,
                            'availableQuantity' => $productVariant['quantity']
                        ]
                    );
                }

                if (!empty($productReal['price_sale'])) {
                    $totalAmount += $productReal['price_sale'] * $product['quantity'];
                } else {
                    $totalAmount += $productReal['price_regular'] * $product['quantity'];
                }
            }

            // Validate voucher                 
            if (!empty($data['voucher'])) {
                $voucher = Voucher::where('code', $data['voucher'])->first();
                if ($voucher) {
                    if ($voucher->end_date && $voucher->end_date < now()) {
                        return BaseResponse::failure('400', 'Voucher đã hết hạn sử dụng', 'voucher.expired', []);
                    }
                    if ($voucher->min_order_value && $totalAmount < $voucher->min_order_value) {
                        return BaseResponse::failure('400', 'Đơn hàng chưa đạt giá trị tối thiểu ' . number_format($voucher->min_order_value) . ' VNĐ để áp dụng voucher', 'order.not.meet.min.value', []);
                    }
                    if ($voucher->used >= $voucher->quantity) {
                        // Update voucher status to INACTIVE when usage limit is reached
                        $voucher->update([
                            'status' => 'INACTIVE'
                        ]);
                        return BaseResponse::failure('400', 'Voucher đã hết lượt sử dụng. Số lượt đã sử dụng: ' . $voucher->used . '/' . $voucher->quantity, 'voucher.usage.limit.reached', []);
                    }
                    if ($voucher->status !== 'ACTIVE') {
                        return BaseResponse::failure('400', 'Voucher không còn hoạt động', 'voucher.not.active', []);
                    }
                    $voucherAmount = $voucher->voucher_price;
                    $totalAmount -= $voucherAmount;

                    // Update voucher usage count
                    $voucher->update([
                        'used' => $voucher->used + 1,
                        // If this is the last usage, set status to INACTIVE
                        'status' => ($voucher->used + 1 >= $voucher->quantity) ? 'INACTIVE' : $voucher->status
                    ]);
                } else {
                    return BaseResponse::failure('400', 'Voucher không tồn tại hoặc không hợp lệ', 'voucher.not.found', []);
                }
            }

            if ($totalAmount < 0) {
                $totalAmount = 0;
            }

            // Validate addresses
            if (empty($data['shippingAddress'])) {
                return BaseResponse::failure('400', 'Shipping address is required', 'shipping.address.required', []);
            }

            // Optional: Validate address format (e.g., contains at least street, ward, district, city)
            if (!preg_match('/.*,.*,.*,.*$/', $data['shippingAddress'])) {
                return BaseResponse::failure('400', 'Invalid shipping address format', 'invalid.shipping.address.format', []);
            }

            if (!empty($data['receiverAddress']) && !preg_match('/.*,.*,.*,.*$/', $data['receiverAddress'])) {
                return BaseResponse::failure('400', 'Invalid receiver address format', 'invalid.receiver.address.format', []);
            }

            DB::beginTransaction();

            $order = Order::create([
                'users_id' => $data['users_id'] ?? null,
                'code' => 'Od' . Str::random(4),
                'customer_name' => $data['customerName'],
                'email' => $data['email'] ?? 'default@email.com',
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

            // Process order details
            foreach ($data['products'] as $product) {
                $productReal = Product::where('id', $product['productId'])->first();
                // Kiểm tra tồn kho tổng sản phẩm
                if ($productReal->quantity < $product['quantity']) {
                    return BaseResponse::failure(
                        '400',
                        'Sản phẩm ' . $productReal->name . ' đã hết số lượng!',
                        'product.out.of.stock',
                        []
                    );
                }
                OrderDetail::create([
                    'order_id' => $order->id,
                    'name' => $productReal['name'],
                    'image' => $productReal['image'],
                    'price_regular' => $productReal['price_regular'],
                    'price_sale' => $productReal['price_sale'],
                    'discount' => $productReal['discount'],
                    'color' => DB::table('colors')->where('code', $product['color'])->value('name'),
                    'size' => $product['size'],
                    'quantity_order' => $product['quantity'],
                    'product_id' => $product['productId'],
                ]);

                // Update product variant quantity
                $productVariant = ProductVariant::where('product_id', $product['productId'])
                    ->where('color_id', function ($query) use ($product) {
                        $query->select('id')
                            ->from('colors')
                            ->where('code', $product['color'])
                            ->orWhere('name', $product['color'])
                            ->first();
                    })
                    ->where('size_id', function ($query) use ($product) {
                        $query->select('id')
                            ->from('sizes')
                            ->where('size', $product['size'])
                            ->first();
                    })
                    ->first();

                // Kiểm tra tồn kho biến thể
                if ($productVariant && $productVariant->quantity < $product['quantity']) {
                    return BaseResponse::failure(
                        '400',
                        'Sản phẩm ' . $productReal->name . ' (Màu: ' . ($productVariant->color->name ?? $product['color']) . ', Size: ' . ($productVariant->size->size ?? $product['size']) . ') đã hết hàng hoặc không đủ số lượng. Số lượng còn lại: ' . $productVariant->quantity,
                        'product.out.of.stock',
                        [
                            'productName' => $productReal->name,
                            'color' => $productVariant->color->name ?? $product['color'],
                            'size' => $productVariant->size->size ?? $product['size'],
                            'availableQuantity' => $productVariant->quantity
                        ]
                    );
                }

                if ($productVariant) {
                    $productVariant->quantity -= $product['quantity'];
                    $productVariant->save();
                }

                // Update product total quantity
                $productReal->quantity -= $product['quantity'];
                $productReal->quantity_sold += $product['quantity'];
                $productReal->save();
            }

            DB::commit();
            return $order;
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

        $query = Order::with(['order_details']);

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
            $query->where('phone_number', '=', $phoneNumber);
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

        $paymentStatus = $request->input('paymentStatus');
        $paymentMethod = $request->input('paymentMethod');

        $query = Order::with(['order_details']);
        if (!empty($status)) {
            $statuses = is_array($status) ? $status : explode(',', $status);
            $query->whereIn('status', $statuses);
        }
        if (!empty($phoneNumber)) {
            $query->where('phone_number', '=', $phoneNumber);
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

    public function updateOrder(Request $request)
    {
        $order = Order::where('id', $request->input('id'))->first();
        $user = auth()->user();
        if (!empty($order)) {
            // Lưu lại giá trị cũ
            $oldStatus = $order->status;
            $oldPaymentStatus = $order->payment_status;

            // Lấy giá trị mới từ request
            $status = $request->input('status', $order->status);
            $paymentStatus = $request->input('paymentStatus', $order->payment_status);

            // Check if status is delivered and payment method is COD
            if ($status === 'Delivered' && $order->payment_method === 'COD') {
                $paymentStatus = 'PAID';
            }

            // Lưu lịch sử thay đổi trạng thái thanh toán trước khi cập nhật
            if ($oldPaymentStatus !== $paymentStatus) {
                PaymentStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $oldPaymentStatus,
                    'new_status' => $paymentStatus,
                    'name_change' => $user->name ?? 'System',
                    'role_change' => $user->role ?? 'System',
                    'note' => $request->input('note'),
                    'change_at' => now()
                ]);
            }

            // Lưu lịch sử thay đổi trạng thái đơn hàng trước khi cập nhật
            if ($oldStatus !== $status) {
                OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $oldStatus,
                    'new_status' => $status,
                    'name_change' => $user->name ?? 'System',
                    'role_change' => $user->role ?? 'System',
                    'note' => $request->input('note'),
                    'change_at' => now()
                ]);
            }

            // Cập nhật order
            $order->status = $status;
            $order->payment_status = $paymentStatus;
            // Chỉ cập nhật note nếu không phải hoàn tiền
            if ($status !== 'Cancel' && $paymentStatus !== 'REFUNDED') {
                $order->note = $request->input('note');
            }
            $order->save();

            return $order;
        } else {
            BaseResponse::failure(400, '', 'order.item.not.found', []);
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
        $orderCode = $request->input('orderCode');
        $user = auth()->user();

        // Tìm đơn hàng theo mã và user_id (đảm bảo người dùng chỉ được hủy đơn của mình)
        $order = Order::where('code', $orderCode)
            ->where('users_id', $user->id)
            ->first();

        if (!$order) {
            return BaseResponse::failure('404', 'Đơn hàng không tồn tại hoặc không thuộc quyền sở hữu của bạn', 'order.not.found', []);
        }

        if ($order->status === 'Cancelled') {
            return BaseResponse::failure('400', 'Đơn hàng đã được hủy trước đó', 'order.already.cancelled', []);
        }

        if (!in_array($order->status, ['Unconfirmed', 'Confirmed'])) {
            return BaseResponse::failure('400', 'Không thể hủy đơn hàng ở trạng thái hiện tại', 'order.cannot.cancel', []);
        }

        try {
            DB::beginTransaction();

            // Cập nhật trạng thái đơn hàng
            $order->status = 'Cancelled';
            $order->updated_at = now();
            $order->save();

            // Lưu lịch sử trạng thái đơn hàng (nếu có bảng `order_status_histories`)
            OrderStatusHistory::create([
                'order_id' => $order->id,
                'status' => 'Cancelled',
                'changed_by' => $user->id,
                'changed_at' => now()
            ]);

            DB::commit();
            return BaseResponse::success('Hủy đơn hàng thành công', 'order.cancelled.success', $order);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Cancel order failed', ['error' => $e->getMessage()]);
            return BaseResponse::failure('500', 'Đã xảy ra lỗi khi hủy đơn hàng', 'order.cancel.error', []);
        }
    }

}
