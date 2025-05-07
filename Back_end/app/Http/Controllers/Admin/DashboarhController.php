<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\impl\AdminService;

class DashboarhController extends Controller
{
    public $adminService;
    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }
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
