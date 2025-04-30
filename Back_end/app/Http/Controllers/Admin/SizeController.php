<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\IAdminService;

class SizeController extends Controller
{
    public IAdminService $adminService;
    public function __construct(IAdminService $adminService)
    {
        $this->adminService = $adminService;
    }
    public function addSize(Request $request)
    {
        $products = $this->adminService->addSize($request);
        return BaseResponse::success($products);
    }
    public function updateSize(Request $request)
    {
        $size = $this->adminService->updateSize($request);
        return BaseResponse::success($size);
    }
    public function deleteSize(Request $request)
    {
        $size = $this->adminService->deleteSize($request);
        return BaseResponse::success($size);
    }
}
