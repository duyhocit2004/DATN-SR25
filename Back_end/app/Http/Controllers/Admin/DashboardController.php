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
            ->select('id', 'code', 'users_id', 'total_price', 'status', 'created_at', 'customer_name')
            ->orderBy('created_at', 'desc')
            ->take(10)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'code' => $order->code,
                    'customerName' => $order->user ? $order->user->name : $order->customer_name,
                    'totalPrice' => $order->total_price,
                    'status' => $order->status,
                    'createdAt' => $order->created_at,
                ];
            });

        return BaseResponse::success($orders);
    }

    public function getPopularProducts()
    {
        $products = Product::withCount(['order_details as total_orders' => function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->where('status', '!=', 'cancelled');
                });
            }])
            ->having('total_orders', '>', 1)
            ->orderBy('total_orders', 'desc')
            ->take(10)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'totalOrders' => $product->total_orders,
                ];
            });

        return BaseResponse::success($products);
    }

    public function getMostCancelledProducts()
    {
        $products = Product::withCount(['order_details as total_cancelled' => function ($query) {
                $query->whereHas('order', function ($q) {
                    $q->where('status', 'cancelled');
                });
            }])
            ->having('total_cancelled', '>', 1)
            ->orderBy('total_cancelled', 'desc')
            ->take(10)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'totalCancelled' => $product->total_cancelled,
                ];
            });

        return BaseResponse::success($products);
    }
} 