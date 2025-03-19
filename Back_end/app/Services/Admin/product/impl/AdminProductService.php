<?php

namespace App\Services\Admin\product\impl;

use App\Helpers\BaseResponse;
use App\Models\ImageProduct;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Repositories\ProductRepositories;
use App\Repositories\VariantRepositories;
use App\Services\Admin\product\IAdminProductService;
use Cloudinary\Cloudinary;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;


class AdminProductService implements IAdminProductService
{
    public ProductRepositories $productRepositories;
    public VariantRepositories $variantRepositories;

    protected $cloudinary;

    public function __construct(ProductRepositories $productRepositories,
                                VariantRepositories $variantRepositories,
                                Cloudinary $cloudinary)
    {
        $this->productRepositories = $productRepositories;
        $this->variantRepositories = $variantRepositories;
        $this->cloudinary = $cloudinary;
    }



}
