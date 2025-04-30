<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboarhController extends Controller
{
    public function getDataStats(Request $request)
    {
        $products = $this->adminService->getDataStats($request);
        return BaseResponse::success($products);
    }
    public function getDashboardChart(Request $request)
    {
        $products = $this->adminService->getDashboardChart($request);
        return BaseResponse::success($products);
    }
}
