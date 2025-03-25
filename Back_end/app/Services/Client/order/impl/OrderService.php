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

    public function __construct(OrderRepositories   $orderRepositories,
                                VoucherRepositories $voucherRepositories)
    {
        $this->orderRepositories = $orderRepositories;
        $this->voucherRepositories = $voucherRepositories;
    }

    public function addOrder(Request $request)
    {
        $order = $this->orderRepositories->addOrder($request);
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
                'totalPrice' => $order->total_price,
                'priceSale' => $order->price_sale,
                'voucher' => $order->voucher,
                'voucherPrice' => $order->voucher_price,
                'shippingAddress' => $order->address,
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
            'totalPrice' => $order->total_price,
            'priceSale' => $order->price_sale,
            'voucher' => $order->voucher,
            'voucherPrice' => $order->voucher_price,
            'shippingAddress' => $order->shipping_address,
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
}
