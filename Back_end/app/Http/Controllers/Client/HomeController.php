<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\product\IHomeService;
use App\Services\Client\product\IProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;


class HomeController extends Controller
{
    public IHomeService $homeService;
    public IProductService $productService;

    public function __construct(IHomeService $homeService, IProductService $productService)
    {
        $this->homeService = $homeService;
        $this->productService = $productService;
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

    public function getHomeSummary(Request $request)
    {
        $cacheKey = 'home:summary';
        $topNumber = $request->input('topNumber', 8);
        $result = Cache::remember($cacheKey, 120, function () use ($topNumber, $request) {
            $banners = $this->homeService->getAllBanners($request);
            $topDiscountedProducts = $this->productService->getTopDiscountedProducts(new \Illuminate\Http\Request(['topNumber' => $topNumber]));
            $topNewestProducts = $this->productService->getTopNewestProducts(new \Illuminate\Http\Request(['topNumber' => $topNumber]));
            $topBestSellingProducts = $this->productService->getTopBestSellingProducts(new \Illuminate\Http\Request(['topNumber' => $topNumber]));
            return [
                'banners' => $banners,
                'topDiscountedProducts' => $topDiscountedProducts,
                'topNewestProducts' => $topNewestProducts,
                'topBestSellingProducts' => $topBestSellingProducts,
            ];
        });
        return response()->json($result);
    }

}
