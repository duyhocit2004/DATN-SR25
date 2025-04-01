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
    public function addOrder(Request $request)
    {
        try {
            $products = $request->input('products');
            $totalAmount = 0;
            foreach ($products as $product) {
                $productReal = Product::where('id', $product['productId'])->first();
                $productVariant = ProductVariant::where('product_id', $product['productId'])->first();
                if (!empty($productReal) && !empty($productVariant)) {
                    if ($productVariant['quantity'] < $product['quantity']) {
                        BaseResponse::failure('400', 'quantity is less than order quantity', 'quantity.is.less.than.order.quantity', []);
                    }
                    if (!empty($productReal['price_sale'])) {
                        $totalAmount = $totalAmount + ($productReal['price_sale'] * $product['quantity']);
                    } else {
                        $totalAmount = $totalAmount + ($productReal['price_regular'] * $product['quantity']);
                    }
                } else {
                    BaseResponse::failure('400', 'Product not found', 'product.not.found', []);
                }
            }

            if ($request->input('voucher')) {
                $voucher = Voucher::where('code', $request->input('voucher'))->first();
                if ($voucher) {
                    $totalAmount = $totalAmount - $voucher['voucher_price'];
                } else {
                    BaseResponse::failure('400', 'Voucher not found', 'voucher.not.found', []);
                }
            }

            if ($totalAmount < 0) {
                $totalAmount = 0;
            }
            DB::beginTransaction();
            $order = Order::create([
                'code' => 'Od' . Str::random(4),
                'customer_name' => $request->input('customerName'),
                'email' => $request->input('email') ?? 'default@email.com',
                'phone_number' => $request->input('phoneNumber'),
                'total_price' => $totalAmount,
                'voucher' => $request->input('voucher'),
                'voucher_price' => $request->input('voucherPrice'),
                'shipping_address' => $request->input('shippingAddress', ''),
                'payment_method' => $request->input('paymentMethod', ''),
                'payment_status' => 'Unpaid',
                'note' => $request->input('note'),
                'status' => 'Processing',
                'date' => $request->input('createAt') ? $request->input('createAt') : now()
            ]);

            $listProducts = [];

            foreach ($products as $product) {
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
                DB::update('update products set quantity = quantity - ? where id = ?', [$product['quantity'], $product['productId']]);
                DB::update('update vouchers set used = used + 1 where code = ?', [$request->input('voucher')]);
                Cart::query()->where('color', '=', $product['color'])->where('size', '=', $product['size'])->where('product_id', '=', $product['productId'])->delete();

                $sql = "
                    UPDATE product_variants
                    JOIN colors ON product_variants.color_id = colors.id
                    JOIN sizes ON product_variants.size_id = sizes.id
                    SET product_variants.quantity = product_variants.quantity - ?
                    WHERE colors.code = ? AND sizes.size = ? AND product_variants.product_id = ?
                ";
                DB::statement($sql, [$product['quantity'], $product['color'], $product['size'], $product['productId']]);
                $listProducts[] = $product;
            }
            DB::commit();
            $order['products'] = $listProducts;
            return $order;
        } catch (Exception $e) {
            DB::rollBack();
            BaseResponse::failure(500, '', $e->getMessage(), []);
//            BaseResponse::failure(500, "System error addProductWithVariant", []);
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

        $query = Order::with(['order_details']);
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
        if (!empty($sortType)) {
            $query->orderByRaw('IFNULL(date, status) ' . $sortType);
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

    public function updateOrderPayment($code, $payment_status)
    {
        $order = Order::where('code', $code)->first();

        if (!empty($order)) {
            $order->update([
                'payment_status' => $payment_status,
            ]);
            return $order;
        } else {
            BaseResponse::failure(400, '', 'order.item.not.found', []);
        }
    }
}
