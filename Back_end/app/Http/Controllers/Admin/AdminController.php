<?php

namespace App\Http\Controllers\Admin;


use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\IAdminService;
use App\Services\Admin\product\IAdminProductService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public IAdminService $adminService;

    public function __construct(IAdminService $adminService){
        $this->adminService = $adminService;
    }

    public function getAllUser(Request $request)
    {
        $products = $this->adminService->getAllUser($request);
        return BaseResponse::success($products);
    }

    public function deleteUser(Request $request)
    {
        $products = $this->adminService->deleteUser($request);
        return BaseResponse::success($products);
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

    public function addColor(Request $request)
    {
        $products = $this->adminService->addColor($request);
        return BaseResponse::success($products);
    }
    public function updateColor(Request $request)
    {
        $products = $this->adminService->updateColor($request);
        return BaseResponse::success($products);
    }

    public function deleteColor(Request $request)
    {
        $products = $this->adminService->deleteColor($request);
        return BaseResponse::success($products);
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
