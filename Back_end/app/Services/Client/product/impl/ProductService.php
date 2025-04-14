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

    public function __construct(
        ProductRepositories $productRepositories,
        VariantRepositories $variantRepositories,
        ColorRepositories $colorRepositories,
        SizeRepositories $sizeRepositories,
        WishListRepositories $wishListRepositories,
        CommentRepositories $commentRepositories
    ) {
        $this->productRepositories = $productRepositories;
        $this->variantRepositories = $variantRepositories;
        $this->colorRepositories = $colorRepositories;
        $this->sizeRepositories = $sizeRepositories;
        $this->wishListRepositories = $wishListRepositories;
        $this->commentRepositories = $commentRepositories;
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

    public function getSizeByProductIdAndColor(Request $request)
    {
        $this->validateGetSizeByProductIdAndColor($request);
        $variants = $this->variantRepositories->getSizeByProductIdAndColor($request);
        if ($variants->isEmpty()) {
            BaseResponse::failure(400, '', 'product.not.found', []);
        }

        return $variants;
    }

    private function validateGetSizeByProductIdAndColor(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'productId' => 'required|integer',
            'color' => 'required|string'
        ], [
            'productId.required' => 'productId.is.required',
            'productId.integer' => 'productId.is.integer',
            'color.required' => 'color.is.required',
            'color.string' => 'color.is.string',
        ]);

        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        }
    }

    public function getColorByProductIdAndSize(Request $request)
    {
        $this->validateGetColorByProductIdAndSize($request);
        $variants = $this->variantRepositories->getColorByProductIdAndSize($request);
        if ($variants->isEmpty()) {
            BaseResponse::failure(400, '', 'color.not.found', []);
        }

        return $variants;

    }

    private function validateGetColorByProductIdAndSize(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'productId' => 'required|integer',
            'size' => 'required|string'
        ], [
            'productId.required' => 'productId.is.required',
            'productId.integer' => 'productId.is.integer',
            'size.required' => 'size.is.required',
            'size.string' => 'size.is.string',
        ]);

        if ($validate->fails()) {
            BaseResponse::failure(400, '', $validate->errors()->first(), []);
        }
    }

    public function getTopDiscountedProducts(Request $request)
    {
        $topNumber = $request->input('topNumber', 5);
        $topDiscountedProducts = $this->productRepositories->getTopDiscountedProducts($topNumber);
        $list = $topDiscountedProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                'image' => $product->image,
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
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });

        return $list;
    }

    public function getTopNewestProducts(Request $request)
    {
        $topNumber = $request->input('topNumber', 5);
        $topNewestProducts = $this->productRepositories->getTopNewestProducts($topNumber);
        $list = $topNewestProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                'image' => $product->image,
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
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });

        return $list;
    }

    public function getTopBestSellingProducts(Request $request)
    {
        $topNumber = $request->input('topNumber', 5);
        $topNewestProducts = $this->productRepositories->getTopBestSellingProducts($topNumber);
        $list = $topNewestProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                'image' => $product->image,
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
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });

        return $list;
    }

    public function getRelatedProducts(Request $request)
    {
        $topNumber = $request->input('topNumber', 5);
        $topReleatedProducts = $this->productRepositories->getRelatedProducts($topNumber, $request->input('categoryId'));
        $list = $topReleatedProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                'image' => $product->image,
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
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });

        return $list;
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

    public function getWishList(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;

        $wishList = $this->wishListRepositories->getWishList($userId);
        $list = $wishList->map(function ($item) {
            $product = $item->product;
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                'image' => $product->image,
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
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });
        return $list;
    }

    public function getWishListStorage(Request $request)
    {
        $listProduct = $this->productRepositories->getWishListStorage($request->input('productIds'));
        $list = $listProduct->map(function ($product) {
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                'image' => $product->image,
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
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
            ];
        });
        return $list;
    }

    public function getComment(Request $request)
    {
        $comment = $this->commentRepositories->getComment($request->input('productId'));
        return $comment;
    }

    public function getParentCommentPaging(Request $request)
    {
        $comment = $this->commentRepositories->getParentCommentPaging($request);
        return $comment;

    }

    public function getCommentWithReply(Request $request)
    {
        $comment = $this->commentRepositories->getCommentWithReply($request);
        return $comment;

    }

    public function addWishList(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        $productId = $request->input('productId');

        $wishList = $this->wishListRepositories->addWishList($userId, $productId);
        return $wishList;

    }

    public function deleteWishList(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        $productIds = $request->input('productIds');
        if (!is_null($productIds)) {
            $this->wishListRepositories->deleteWishList($userId, $productIds);
        } else {
            $this->wishListRepositories->truncate();
        }

        return [];

    }

    public function addComment(Request $request)
    {
        $wishList = $this->commentRepositories->addComment($request);
        return $wishList;
    }

}
