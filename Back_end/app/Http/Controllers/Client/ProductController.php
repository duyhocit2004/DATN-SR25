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
