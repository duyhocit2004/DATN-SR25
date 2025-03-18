<?php

namespace App\Services\Client\product\impl;

use App\Helpers\BaseResponse;
use App\Helpers\CommonHelper;
use App\Repositories\ColorRepositories;
use App\Repositories\CommentRepositories;
use App\Repositories\ProductRepositories;
use App\Repositories\SizeRepositories;
use App\Repositories\VariantRepositories;
use App\Repositories\WishListRepositories;
use App\Services\Client\product\IProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class ProductService implements IProductService
{
    public ProductRepositories $productRepositories;
    public VariantRepositories $variantRepositories;
    public ColorRepositories $colorRepositories;
    public SizeRepositories $sizeRepositories;
    public WishListRepositories $wishListRepositories;
    public CommentRepositories $commentRepositories;

    public function __construct(ProductRepositories  $productRepositories,
                                VariantRepositories  $variantRepositories,
                                ColorRepositories    $colorRepositories,
                                SizeRepositories     $sizeRepositories,
                                WishListRepositories $wishListRepositories,
                                CommentRepositories  $commentRepositories)
    {
        $this->productRepositories = $productRepositories;
        $this->variantRepositories = $variantRepositories;
        $this->colorRepositories = $colorRepositories;
        $this->sizeRepositories = $sizeRepositories;
        $this->wishListRepositories = $wishListRepositories;
        $this->commentRepositories = $commentRepositories;
    }

    public function getAllSizes(Request $request)
    {
        $pageNum = $request->get('pageNum', null);
        $pageSize = $request->get('pageSize', null);
        if (empty($pageNum) || empty($pageSize)) {
            $sizes = $this->sizeRepositories->getAllSizes();
            return $sizes;
        } else {
            $sizes = $this->sizeRepositories->getSizesPaging($request);
            return $sizes;
        }

    }

    public function getAllColors(Request $request)
    {
        $pageNum = $request->get('pageNum', null);
        $pageSize = $request->get('pageSize', null);
        if (empty($pageNum) || empty($pageSize)) {
            $colors = $this->colorRepositories->getAllColors();
            return $colors;
        } else {
            $sizes = $this->colorRepositories->getColorsPaging($request);
            return $sizes;
        }
    }

}
