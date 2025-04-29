<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\product\IProductService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public IProductService $productService;

    protected $cloudinary;

    public function __construct(IProductService $IProductService)
    {
        $this->productService = $IProductService;
    }

    public function getAllProductWithImages(Request $request): JsonResponse
    {
        $cacheKey = 'products:all:' . md5(json_encode($request->all()));
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getAllProductWithImages($request);
            return BaseResponse::success($products);
        });
    }

    public function getProduct(Request $request): JsonResponse
    {
        $cacheKey = 'product:' . $request->input('productId');
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getProduct($request);
            return BaseResponse::success($products);
        });
    }

    public function getProductDetail(Request $request): JsonResponse
    {
        $cacheKey = 'product:detail:' . $request->id;
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getProductDetail($request);
            return BaseResponse::success($products);
        });
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
        $cacheKey = 'products:top:discounted';
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getTopDiscountedProducts($request);
            return BaseResponse::success($products);
        });
    }

    public function getTopNewestProducts(Request $request): JsonResponse
    {
        $cacheKey = 'products:top:newest';
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getTopNewestProducts($request);
            return BaseResponse::success($products);
        });
    }

    public function getTopBestSellingProducts(Request $request): JsonResponse
    {
        $cacheKey = 'products:top:best-selling';
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getTopBestSellingProducts($request);
            return BaseResponse::success($products);
        });
    }

    public function getRelatedProducts(Request $request): JsonResponse
    {
        $cacheKey = 'products:related:' . $request->product_id;
        
        return Cache::remember($cacheKey, 60, function () use ($request) {
            $products = $this->productService->getRelatedProducts($request);
            return BaseResponse::success($products);
        });
    }

    public function getAllSizes(Request $request): JsonResponse
    {
        $sizes = $this->productService->getAllSizes($request);
        return BaseResponse::success($sizes);
    }

    public function getSizesByType(Request $request): JsonResponse
    {
        $sizes = $this->productService->getSizesByType($request);
        return BaseResponse::success($sizes);
    }

    public function getAllColors(Request $request)
    {
        $color = $this->productService->getAllColors($request);
        return BaseResponse::success($color);
    }

    public function getWishList(Request $request): JsonResponse
    {
        $color = $this->productService->getWishList($request);
        return BaseResponse::success($color);
    }
    public function getWishListStorage(Request $request): JsonResponse
    {
        $color = $this->productService->getWishListStorage($request);
        return BaseResponse::success($color);
    }
    public function getComment(Request $request): JsonResponse
    {
        $comment= $this->productService->getComment($request);
        return BaseResponse::success($comment);
    }
    public function getParentCommentPaging(Request $request): JsonResponse
    {
        $comment= $this->productService->getParentCommentPaging($request);
        return BaseResponse::success($comment);
    }
    public function getCommentWithReply(Request $request): JsonResponse
    {
        $comment= $this->productService->getCommentWithReply($request);
        return BaseResponse::success($comment);
    }

    public function addWishList(Request $request)
    {
        $withList = $this->productService->addWishList($request);
        return BaseResponse::success($withList);
    }
    public function deleteWishList(Request $request)
    {
        $withList = $this->productService->deleteWishList($request);
        return BaseResponse::success($withList);
    }

    public function addComment(Request $request)
    {
        $withList = $this->productService->addComment($request);
        return BaseResponse::success($withList);
    }

}
