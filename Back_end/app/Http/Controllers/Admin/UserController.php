<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use Illuminate\Http\JsonResponse;
use App\Services\Auth\IAuthService;
use App\Http\Controllers\Controller;
use App\Services\Admin\IAdminService;

class UserController extends Controller
{    
    public IAuthService $authService;
    public IAdminService $adminService;

    public function __construct(IAdminService $adminService,IAuthService $authService){
        $this->adminService = $adminService;
        $this->authService = $authService;
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
    public function updateUserAdmin(Request $request): JsonResponse
    {
        $dataResponse = $this->authService->updateUserAdmin($request);
        return BaseResponse::success($dataResponse);
    }
}
