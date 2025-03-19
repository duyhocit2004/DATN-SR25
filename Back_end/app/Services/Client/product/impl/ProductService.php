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

    public function getAllProductWithImages(Request $request)
    {

        $products = $this->productRepositories->getAllproductWithImages($request);
        $list = $products->getCollection()->map(function ($product) {
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                "image" => $product->image,
//                'listImage' => $product->image_products->isEmpty() ? [] : $product->image_products->pluck('image_link'),
                'priceRegular' => $product->price_regular,
                'priceSale' => $product->price_sale,
                'description' => $product->description,
                'views' => $product->views,
                'content' => $product->content,
                'rate' => $product->rate,
                'quantity' => $product->quantity,
                'quantitySold' => $product->quantity_sold,
                'discount' => $product->discount,
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });

        return $products->setCollection($list);
    }

    public function getProduct(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'productId' => 'required|integer'
        ], [
            'productId.required' => 'productId.is.required',
            'productId.integer' => 'productId.is.integer',
        ]);

        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        }

        $getProductResult = $this->productRepositories->getProduct($request->input('productId'));

        return $getProductResult;

    }

    public function getProductDetail(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'productId' => 'required|integer'
        ], [
            'productId.required' => 'productId.is.required',
            'productId.integer' => 'productId.is.integer',
        ]);

        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        }

        $product = $this->productRepositories->getProductDetail($request->input('productId'));

        return [
            'id' => $product->id,
            'categoriesId' => [$product->categories_id, $product->category->parent_id],
            'categoriesName' => $product->category ? $product->category->name : null,
            'name' => $product->name,
            "image" => $product->image,
            'listImage' => $product->image_products->isEmpty() ? [] : $product->image_products->pluck('image_link'),
            'priceRegular' => $product->price_regular,
            'priceSale' => $product->price_sale,
            'description' => $product->description,
            'views' => $product->views,
            'content' => $product->content,
            'rate' => $product->rate,
            'quantity' => $product->quantity,
            'quantitySold' => $product->quantity_sold,
            'discount' => $product->discount,
            'variants' => CommonHelper::convertToCamelCase($product->product_variants),
            'createdAt' => $product->created_at,
            'updatedAt' => $product->updated_at,
            'deletedAt' => $product->deleted_at,
        ];

        return $list;
    }

}
