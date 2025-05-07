<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\IAdminService;

class CategoryController extends Controller
{
    public IAdminService $adminService;
    public function __construct(IAdminService $adminService)
    {
        $this->adminService = $adminService;
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
    public function getAllCategoriesNonTree(Request $request)
    {
        $products = $this->adminService->getAllCategoriesNonTree($request);
        return BaseResponse::success($products);
    }
}
