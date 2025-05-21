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
        $result = $this->adminService->addSize($request);
        if (isset($result['status']) && $result['status'] === '400') {
            return BaseResponse::failure($result['status'], $result['message'], $result['messageKey'], $result['data']);
        }
        return BaseResponse::success($result);
    }
    public function updateSize(Request $request)
    {
        $result = $this->adminService->updateSize($request);
        if (isset($result['status']) && $result['status'] === '400') {
            return BaseResponse::failure($result['status'], $result['message'], $result['messageKey'], $result['data']);
        }
        return BaseResponse::success($result);
    }
    public function deleteSize(Request $request)
    {
        $result = $this->adminService->deleteSize($request);
        if (isset($result['status']) && $result['status'] === '400') {
            return BaseResponse::failure($result['status'], $result['message'], $result['messageKey'], $result['data']);
        }
        return BaseResponse::success($result);
    }
}
