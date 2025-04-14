<?php

namespace App\Services\Client\order\impl;

use App\Helpers\BaseResponse;
use App\Repositories\OrderRepositories;
use App\Repositories\VoucherRepositories;
use App\Services\Client\order\IOrderService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class OrderService implements IOrderService
{

    public OrderRepositories $orderRepositories;
    public VoucherRepositories $voucherRepositories;

    public function __construct(
        OrderRepositories $orderRepositories,
        VoucherRepositories $voucherRepositories
    ) {
        $this->orderRepositories = $orderRepositories;
        $this->voucherRepositories = $voucherRepositories;
    }


    public function addOrder(Request $request)
    {
        $validatedData = $request->validate([
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
        ]);

        // Gán giá trị mặc định nếu không có voucher
        $validatedData['voucher'] = $validatedData['voucher'] ?? null;

        // Gửi dữ liệu đến repository
        $order = $this->orderRepositories->addOrder($validatedData);
        return $order;
    }

    public function getOrders(Request $request)
    {
        $orders = $this->orderRepositories->getOrders($request);

        $list = $orders->map(function ($order) {
            return [
                'id' => $order->id,
                'code' => $order->code,
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
                            'name' => $product->name,
                            'image' => $product->image,
                            'priceRegular' => $product->price_regular,
                            'priceSale' => $product->price_sale,
                            'discount' => $product->discount,
                            'color' => $product->color,
                            'size' => $product->size,
                            'quantity' => $product->quantity_order,
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
        $orders = $this->orderRepositories->getOrdersPaging($request);

        $list = $orders->getCollection()->map(function ($order) {
            return [
                'id' => $order->id,
                'code' => $order->code,
                'customerName' => $order->customer_name,
                'email' => $order->email,
                "phoneNumber" => $order->phone_number,
                'totalPrice' => $order->total_price,
                'priceSale' => $order->price_sale,
                'voucher' => $order->voucher,
                'voucherPrice' => $order->voucher_price,
                'shippingAddress' => $order->address,
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
                            'name' => $product->name,
                            'image' => $product->image,
                            'priceRegular' => $product->price_regular,
                            'priceSale' => $product->price_sale,
                            'discount' => $product->discount,
                            'color' => $product->color,
                            'size' => $product->size,
                            'quantity' => $product->quantity_order,
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
        $products = $order->order_details ? $order->order_details->map(function ($product) {
            return [
                'id' => $product->id,
                'orderId' => $product->order_id,
                'name' => $product->name,
                'image' => $product->image,
                'priceRegular' => $product->price_regular,
                'priceSale' => $product->price_sale,
                'discount' => $product->discount,
                'color' => $product->color,
                'size' => $product->size,
                'quantity' => $product->quantity_order,
            ];
        }) : [];

        $list = [
            'id' => $order->id,
            'code' => $order->code,
            'customerName' => $order->customer_name,
            'email' => $order->email,
            "phoneNumber" => $order->phone_number,
            'receiverName' => $order->receiver_name, // Trả về thông tin người nhận
            'receiverPhoneNumber' => $order->receiver_phone_number, // Trả về thông tin người nhận
            'receiverAddress' => $order->receiver_address, // Trả về thông tin người nhận
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
            'products' => $products,
            'createdAt' => $order->created_at,
            'updatedAt' => $order->updated_at,
            'deletedAt' => $order->deleted_at,
        ];
        return $list;
    }

    public function getVoucher(Request $request)
    {
        $list = $this->voucherRepositories->getVoucher($request);
        if (!empty($list)) {
            return $list;
        } else {
            BaseResponse::failure(400, '', 'voucher.not.found', []);
        }
    }

    public function updateOrder(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
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
        if (empty($user) || (!empty($user) && $user->role !== config('constants.USER_TYPE_ADMIN'))) {
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

}
