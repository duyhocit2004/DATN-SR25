<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\product\IProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public IProductService $productService;

    protected $cloudinary;

    public function __construct(IProductService $IProductService)
    {
        $this->productService = $IProductService;
    }

    public function getAllSizes(Request $request)
    {
        $sizes = $this->productService->getAllSizes($request);
        return BaseResponse::success($sizes);
    }

    public function getAllColors(Request $request)
    {
        $color = $this->productService->getAllColors($request);
        return BaseResponse::success($color);
    }

    public function getAllProductWithImages(Request $request): JsonResponse
    {
        $products = $this->productService->getAllProductWithImages($request);
        return BaseResponse::success($products);
    }

    public function getProduct(Request $request): JsonResponse
    {
        $products = $this->productService->getProduct($request);
        return BaseResponse::success($products);
    }

    public function getProductDetail(Request $request): JsonResponse
    {
        $products = $this->productService->getProductDetail($request);
        return BaseResponse::success($products);
    }

    public function getColorByProductIdAndSize(Request $request): JsonResponse
    {
        $sizes = $this->productService->getColorByProductIdAndSize($request);
        return BaseResponse::success($sizes);
    }

    public function getSizeByProductIdAndColor(Request $request): JsonResponse
    {
        $sizes = $this->productService->getSizeByProductIdAndColor($request);
        return BaseResponse::success($sizes);
    }

    public function getTopDiscountedProducts(Request $request): JsonResponse
    {
        $sizes = $this->productService->getTopDiscountedProducts($request);
        return BaseResponse::success($sizes);
    }

    public function getTopNewestProducts(Request $request): JsonResponse
    {
        $sizes = $this->productService->getTopNewestProducts($request);
        return BaseResponse::success($sizes);
    }

    public function getTopBestSellingProducts(Request $request): JsonResponse
    {
        $sizes = $this->productService->getTopBestSellingProducts($request);
        return BaseResponse::success($sizes);
    }

    public function getRelatedProducts(Request $request): JsonResponse
    {
        $sizes = $this->productService->getRelatedProducts($request);
        return BaseResponse::success($sizes);
    }

}
