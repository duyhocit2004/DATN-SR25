<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\product\IHomeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    public IHomeService $homeService;

    public function __construct(IHomeService $homeService)
    {
        $this->homeService = $homeService;
    }

    public function getAllCategories()
    {
        $sizes = $this->homeService->getAllCategories();
        return BaseResponse::success($sizes);
    }

    public function getParentCategories()
    {
        $sizes = $this->homeService->getParentCategories();
        return BaseResponse::success($sizes);
    }

    public function getChildrenCategories(Request $request)
    {
        $children = $this->homeService->getChildrenCategories($request);
        return BaseResponse::success($children);
    }

    public function getAllBanners(Request $request)
    {
        $banner = $this->homeService->getAllBanners($request);
        return BaseResponse::success($banner);
    }

}
