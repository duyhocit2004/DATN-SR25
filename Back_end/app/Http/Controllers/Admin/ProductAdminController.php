<?php

namespace App\Http\Controllers\Admin;


use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Admin\product\IAdminProductService;
use Illuminate\Http\Request;

class ProductAdminController extends Controller
{
    public IAdminProductService $adminProductService;

    public function __construct(IAdminProductService $adminProductService){
        $this->adminProductService = $adminProductService;
    }

    public function addProductWithVariant(Request $request)
    {
        $products = $this->adminProductService->addProductWithVariant($request);
        return BaseResponse::success($products);
    }

    public function updateProductWithVariant(Request $request)
    {
        $products = $this->adminProductService->updateProductWithVariant($request);
        return BaseResponse::success($products);
    }
    public function deleteProduct(Request $request)
    {
        $products = $this->adminProductService->deleteProduct($request);
        return BaseResponse::success($products);
    }

}
