<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\IAdminService;

class BannerController extends Controller
{
    public IAdminService $adminService;
    public function __construct(IAdminService $adminService)
    {
        $this->adminService = $adminService;
    }
    public function addBanner(Request $request)
    {
        $products = $this->adminService->addBanner($request);
        return BaseResponse::success($products);
    }
    public function updateBanner(Request $request)
    {
        $products = $this->adminService->updateBanner($request);
        return BaseResponse::success($products);
    }

    public function deleteBanner(Request $request)
    {
        $products = $this->adminService->deleteBanner($request);
        return BaseResponse::success($products);
    }
}
