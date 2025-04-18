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

    public function addCategory(Request $request)
    {
        $products = $this->adminService->addCategory($request);
        return BaseResponse::success($products);
    }
    public function updateCategory(Request $request)
    {
        $products = $this->adminService->updateCategory($request);
        return BaseResponse::success($products);
    }
    public function deleteCategory(Request $request)
    {
        $products = $this->adminService->deleteCategory($request);
        return BaseResponse::success($products);
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

    public function getAllCategoriesNonTree(Request $request)
    {
        $products = $this->adminService->getAllCategoriesNonTree($request);
        return BaseResponse::success($products);
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
