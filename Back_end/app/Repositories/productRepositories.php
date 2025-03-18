<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ProductRepositories
{
    public function getDataStats(Request $request)
    {
        $fromDate= $request->input('fromDate', Carbon::now()->startOfYear());
        $toDate = $request->input('toDate', Carbon::now()->endOfYear());

        $result = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->selectRaw('COUNT(*) as total_orders, SUM(total_price) as total_revenue')
            ->first();
        $totalProducts = DB::table('products')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->count();
        $totalUsers = DB::table('users')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->count();

        return [
            'order' => $result->total_orders,
            'product' => $totalProducts,
            'revenue' => $result->total_revenue,
            'user' => $totalUsers,
        ];
    }

    public function getDashboardChart(Request $request)
    {
        $fromDate= $request->input('fromDate', Carbon::now()->startOfYear());
        $toDate = $request->input('toDate', Carbon::now()->endOfYear());
        $filterType = $request->input('time', 'month');


        $listResult = [];
        if('month'==$filterType){
            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth();


            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('YEARWEEK(created_at, 1) as week, COUNT(*) as total_orders, SUM(total_price) as total_revenue')
                ->groupBy('week')
                ->orderBy('week', 'asc')
                ->get();

            $stt = 1;
            foreach ($result as $week) {
                $listResult[] = [
                    'stt' => $stt,
                    'orders' => $week->total_orders,
                    'revenue' => $week->total_revenue
                ];
                $stt++;
            }
        }

        if('quarter'==$filterType){
            $startDate = Carbon::now()->firstOfQuarter();
            $endDate = Carbon::now()->lastOfQuarter();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total_orders, SUM(total_price) as total_revenue')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get();


            foreach ($result as $month) {
                $monthNumber = (int)substr($month->month, 5, 2);
                $quarter = ceil($monthNumber / 3);
                $listResult[] = [
                    'stt' => $quarter,
                    'orders' => $month->total_orders,
                    'revenue' => $month->total_revenue
                ];
            }
        }

        if('year'==$filterType){
            $startDate = Carbon::now()->startOfYear();
            $endDate = Carbon::now()->endOfYear();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total_orders, SUM(total_price) as total_revenue')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get();

            foreach ($result as $month) {
                $listResult[] = [
                    'stt' => substr($month->month, 5, 2),
                    'orders' => $month->total_orders,
                    'revenue' => $month->total_revenue
                ];
            }
        }

        return $listResult;
    }

}
