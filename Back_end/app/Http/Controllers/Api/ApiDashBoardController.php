<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\products;

class ApiDashBoardController extends Controller
{

    public function countCustomer()
    {
        $countCustomer = User::where('role', "Khách hàng")->count();

        return $countCustomer;
    }
    public function totalsum(Request $request)
    {
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        if (is_null($startDate) && is_null($endDate)) {
            // Nếu không có ngày bắt đầu và ngày kết thúc, tính tổng cho tháng hiện tại
            $sum = Order::whereBetween('created_at', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth()
            ])->sum('total_price');
        } else {
            // Nếu có ngày bắt đầu và ngày kết thúc, tính tổng trong khoảng thời gian đó
            $sum = Order::whereBetween('created_at',  [$startDate, $endDate])
                ->sum('total_price');
        }

        return response()->json(['total' => $sum]);
    }
    public function countOrder(Request $request)
    {
        $startDate = $request->query('startDate');
        $endDate = $request->query('endDate');

        if (is_null($startDate) && is_null($endDate)) {
            // Nếu không có ngày bắt đầu và ngày kết thúc, tính tổng cho tháng hiện tại
            $count = Order::whereBetween('created_at', [
                Carbon::now()->startOfMonth(),
                Carbon::now()->endOfMonth()
            ])->count();
        } else {
            // Nếu có ngày bắt đầu và ngày kết thúc, tính tổng trong khoảng thời gian đó
            $count = Order::whereBetween('created_at', [$startDate, $endDate])
                ->count();
        }

        return response()->json($count);
    }
    public function getOrderDataorder(){

            $revenues = Order::selectRaw('DATE(created_at) as date,SUM(total_price) as total')
            ->Wherehas('orderDetails',function($query){
                $query->where('status');
            })
            ->where('created_at','>=',Carbon::now()->subMonth(3))
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderby('date');

        return $revenues;
    }
    public function productExpired(){
        $countStock = products::Where('base_stock','<=',20)
        ->count();
        return $countStock;
    }
    public function sumproduct(){
        $countStock = products::count();
        return $countStock;
    }

}
