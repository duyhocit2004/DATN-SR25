<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\IAdminService;

class VoucherController extends Controller
{
    public IAdminService $adminService;
    public function __construct(IAdminService $adminService)
    {
        $this->adminService = $adminService;
    }
    public function getAllVoucher(Request $request)
    {
        $products = $this->adminService->getAllVoucher($request);
        return BaseResponse::success($products);
    }
    public function addVoucher(Request $request)
    {
        $products = $this->adminService->addVoucher($request);
        return BaseResponse::success($products);
    }
    public function updateVoucher(Request $request)
    {
        $products = $this->adminService->updateVoucher($request);
        return BaseResponse::success($products);
    }

    public function deleteVoucher(Request $request)
    {
        $products = $this->adminService->deleteVoucher($request);
        return BaseResponse::success($products);
    }

    public function toggleStatus(Request $request)
    {
        $products = $this->adminService->toggleStatus($request);
        return BaseResponse::success($products);
    }
}
