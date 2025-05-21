<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Helpers\BaseResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function getLatestOrders()
    {
        $orders = Order::with(['user', 'order_details'])
            ->select(
                'id', 
                'code', 
                'users_id', 
                'total_price', 
                'status', 
                'created_at', 
                'customer_name',
                'phone_number',
                'shipping_address',
                'payment_method',
                'payment_status'
            )
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'code' => $order->code,
                    'customerName' => $order->user ? $order->user->name : $order->customer_name,
                    'totalPrice' => $order->total_price,
                    'status' => $order->status,
                    'createdAt' => $order->created_at,
                    'phoneNumber' => $order->phone_number,
                    'shippingAddress' => $order->shipping_address,
                    'paymentMethod' => $order->payment_method,
                    'paymentStatus' => $order->payment_status,
                    'productCount' => $order->order_details->count()
                ];
            });

        return BaseResponse::success($orders);
    }

    public function getPopularProducts()
    {
        $products = Product::withCount([
            'order_details as total_orders' => function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->whereNotIn('status', ['Cancel', 'Cancel Confirm']);
                });
            },
            'order_details as total_cancelled' => function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->whereIn('status', ['Cancel', 'Cancel Confirm']);
                });
            }
        ])
        ->having('total_orders', '>', 0)
        ->orderBy('total_orders', 'desc')
        ->take(5)
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'totalOrders' => $product->total_orders,
                'totalCancelled' => $product->total_cancelled,
            ];
        });

        return BaseResponse::success($products);
    }

    public function getMostCancelledProducts()
    {
        $products = Product::withCount([
            'order_details as total_orders' => function ($query) {
                $query->whereHas('order');
            },
            'order_details as total_cancelled' => function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->whereIn('status', ['Cancel', 'Cancel Confirm']);
                });
            }
        ])
        ->having('total_cancelled', '>', 0)
        ->orderBy('total_cancelled', 'desc')
        ->take(5)
        ->get()
        ->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'totalOrders' => $product->total_orders,
                'totalCancelled' => $product->total_cancelled,
            ];
        });

        return BaseResponse::success($products);
    }
} 