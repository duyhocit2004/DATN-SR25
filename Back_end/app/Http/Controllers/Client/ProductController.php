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
}
