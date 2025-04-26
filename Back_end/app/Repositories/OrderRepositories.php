<?php

namespace App\Repositories;

use App\Models\Cart;
use App\Models\Order;
use Firebase\JWT\JWT;
use App\Models\Product;
use App\Models\Voucher;

use App\Models\OrderStatusHistory;
use App\Models\PaymentStatusHistory;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\OrderDetail;

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
                $productReal = Product::where('id', $product['productId'])->first();
                $productVariant = ProductVariant::where('product_id', $product['productId'])->first();
                if (!empty($productReal) && !empty($productVariant)) {
                    if ($productVariant['quantity'] < $product['quantity']) {
                        return BaseResponse::failure('400', 'quantity is less than order quantity', 'quantity.is.less.than.order.quantity', []);
                    }
                    if (!empty($productReal['price_sale'])) {
                        $totalAmount += $productReal['price_sale'] * $product['quantity'];
                    } else {
                        $totalAmount += $productReal['price_regular'] * $product['quantity'];
                    }
                } else {
                    return BaseResponse::failure('400', 'Product not found', 'product.not.found', []);
                }
            }

            // Validate voucher
            if (!empty($data['voucher'])) {
                $voucher = Voucher::where('code', $data['voucher'])->first();
                if ($voucher) {
                    if ($voucher->end_date && $voucher->end_date < now()) {
                        return BaseResponse::failure('400', 'Voucher expired', 'voucher.expired', []);
                    }
                    if ($voucher->min_order_value && $totalAmount < $voucher->min_order_value) {
                        return BaseResponse::failure('400', 'Order does not meet minimum value for voucher', 'order.not.meet.min.value', []);
                    }
                    $voucherAmount = $voucher->voucher_price;
                    $totalAmount -= $voucherAmount;
                } else {
                    return BaseResponse::failure('400', 'Voucher not found', 'voucher.not.found', []);
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
        $orders = $query->orderBy('created_at','desc')->paginate($perPage, ['*'], 'page', $page);
        return $orders;

    }

    public function getOrderDetail(Request $request)
    {
        $code = $request->input('orderCode');
        $order = Order::with('order_details')->where('code', '=', $code)->first();
        return $order;
    }

    public function updateOrder(Request $request)
    {
        $order = Order::where('id', $request->input('id'))->first();
        $user = auth()->user();
        if (!empty($order)) {
            //get value in data
            $oldStatus = $order->status;

            //get value in request
            $status = $request->input('status', $order->status);
            $paymentStatus = $request->input('paymentStatus', $order->payment_status);

            // Check if new data matches old data
          
            $data = [];
            if($oldStatus !== $status){
                $data['order_id'] = $order->id;
                $data['old_status'] = $oldStatus;
                $data['new_status'] = $status;
                $data['name_change'] = $user->name;
                $data['role_change'] = $user->role;
                $data['change_at'] = now();
                $data['created_at'] = now();
                $data['updated_at'] = null;
            }
            // Check if status is delivered and payment method is COD
            if ($status === 'Delivered' && $order->payment_method === 'COD') {
                $paymentStatus = 'PAID';
            }

            // Lưu lịch sử thay đổi trạng thái đơn hàng
            if ($status !== $order->status) {
                OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $order->status,
                    'new_status' => $status,
                    'name_change' => $request->user()->name ?? 'System',
                    'role_change' => $request->user()->role ?? 'System',
                    'note' => $request->input('note'),
                    'change_at' => now()
                ]);
            }

            // Lưu lịch sử thay đổi trạng thái thanh toán
            if ($paymentStatus !== $order->payment_status) {
                PaymentStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $order->payment_status,
                    'new_status' => $paymentStatus,
                    'name_change' => $request->user()->name ?? 'System',
                    'role_change' => $request->user()->role ?? 'System',
                    'note' => $request->input('note'),
                    'change_at' => now()
                ]);
            }

            $order->update([
                'status' => $status,
                'payment_status' => $paymentStatus,
                'payment_method' => $request->input('paymentMethod', $order->payment_method),
            ]);
            // if($data !== []){
            //     orderStatusHistories::create([
            //         'order_id' => $order->id,
            //         'old_status' => $data['old_status'],
            //         'new_status' => $data['new_status'],
            //         'name_change' => $user->name,
            //         'role_change' => $user->role,
            //         'change_at' => now(),
            //     ]);
            // }else{
            //     return $order;
            // }
           
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
            \Log::info('Starting refund process', [
                'orderId' => $orderId,
                'adminId' => $adminId,
                'refundReason' => $refundReason
            ]);

            $order = Order::find($orderId);
            
            if (!$order) {
                \Log::error('Order not found', ['orderId' => $orderId]);
                return [
                    'status' => 'error',
                    'message' => 'Không tìm thấy đơn hàng',
                    'code' => 404,
                    'data' => []
                ];
            }

            \Log::info('Order found', [
                'order' => $order->toArray(),
                'payment_status' => $order->payment_status,
                'refund_status' => $order->refund_status
            ]);

            if ($order->payment_status !== 'PAID') {
                \Log::error('Order not paid', ['order' => $order->toArray()]);
                return [
                    'status' => 'error',
                    'message' => 'Đơn hàng chưa thanh toán',
                    'code' => 400,
                    'data' => []
                ];
            }

            if ($order->refund_status === 'REFUNDED') {
                \Log::error('Order already refunded', ['order' => $order->toArray()]);
                return [
                    'status' => 'error',
                    'message' => 'Đơn hàng đã được hoàn tiền trước đó',
                    'code' => 400,
                    'data' => []
                ];
            }

            if (!Auth::check()) {
                \Log::error('User not authenticated');
                return [
                    'status' => 'error',
                    'message' => 'Người dùng chưa đăng nhập',
                    'code' => 401,
                    'data' => []
                ];
            }

            DB::beginTransaction();

            try {
                // Update order status
                $updateResult = $order->update([
                    'refund_status' => 'REFUNDED',
                    'refund_reason' => $refundReason,
                    'refunded_by' => $adminId,
                    'refunded_at' => now(),
                    'payment_status' => 'REFUNDED'
                ]);

                if (!$updateResult) {
                    throw new \Exception('Không thể cập nhật trạng thái đơn hàng');
                }

                \Log::info('Order updated successfully', ['order' => $order->toArray()]);

                // Add status history
                $historyResult = OrderStatusHistory::create([
                    'order_id' => $order->id,
                    'old_status' => $order->status,
                    'new_status' => 'REFUNDED',
                    'name_change' => Auth::user()->name ?? 'System',
                    'role_change' => Auth::user()->role ?? 'System',
                    'note' => $refundReason
                ]);

                if (!$historyResult) {
                    throw new \Exception('Không thể tạo lịch sử trạng thái');
                }

                \Log::info('Status history created');

                DB::commit();

                return [
                    'status' => 'success',
                    'message' => 'Hoàn tiền thành công',
                    'code' => 200,
                    'data' => $order
                ];
            } catch (\Exception $e) {
                DB::rollBack();
                \Log::error('Refund transaction error', [
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
            \Log::error('Refund error', [
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
}
