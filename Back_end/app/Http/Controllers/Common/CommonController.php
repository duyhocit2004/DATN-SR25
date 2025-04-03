<?php

namespace App\Http\Controllers\Common;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Common\ICommonService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommonController extends Controller
{
    public ICommonService $commonService;

    public function __construct(ICommonService $commonService)
    {
        $this->commonService = $commonService;
    }

    public function uploadImage(Request $request): JsonResponse
    {
        $result = $this->commonService->uploadImage($request);
        return BaseResponse::success($result);
    }

}
