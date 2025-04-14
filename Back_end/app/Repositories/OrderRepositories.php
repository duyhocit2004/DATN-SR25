<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Cart;
use App\Models\ImageProduct;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
                'code' => 'Od' . Str::random(4),
                'customer_name' => $data['customerName'],
                'email' => $data['email'] ?? 'default@email.com',
                'phone_number' => $data['phoneNumber'],
                'receiver_name' => $data['receiverName'] ?? null,
                'receiver_phone_number' => $data['receiverPhoneNumber'] ?? null,
                'receiver_address' => $data['receiverAddress'] ?? null,
                'shipping_address' => $data['shippingAddress'],
                'total_price' => $totalAmount, // Use calculated totalAmount
                'voucher' => $data['voucher'] ?? null,
                'voucher_price' => $voucherAmount,
                'payment_method' => $data['paymentMethod'] ?? '',
                'payment_status' => 'UNPAID',
                'note' => $data['note'] ?? null,
                'status' => 'Unconfirmed',
                'date' => now(),
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
        $orders = $query->paginate($perPage, ['*'], 'page', $page);
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

        if (!empty($order)) {
            $order->update([
                'status' => $request->input('status', $order->status),
                'payment_status' => $request->input('paymentStatus', $order->payment_status),
                'payment_method' => $request->input('paymentMethod', $order->payment_method),
            ]);
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




    public function refundOrder($orderId)
    {
        \Log::info('Bắt đầu xử lý refundOrder trong repository cho orderId:', ['orderId' => $orderId]);

        $order = Order::find($orderId);

        if (!$order || $order->payment_method !== 'ONLINE' || $order->payment_status !== 'PAID') {
            \Log::warning('Đơn hàng không hợp lệ để hoàn tiền:', ['order' => $order]);
            throw new \Exception('Đơn hàng không hợp lệ để hoàn tiền.');
        }

        $order->update([
            'payment_status' => 'REFUNDED',
            'status' => 'CANCELLED',
        ]);

        \Log::info('Cập nhật trạng thái hoàn tiền thành công cho orderId:', ['orderId' => $orderId]);
        return $order;
    }
}
