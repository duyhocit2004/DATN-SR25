<?php

namespace App\Services\Client\cart\impl;

use App\Helpers\BaseResponse;
use App\Repositories\CartRepositories;
use App\Services\Client\cart\ICartService;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;


class CartService implements ICartService
{

    public CartRepositories $cartRepositories;

    public function __construct(CartRepositories $cartRepositories)
    {
        $this->cartRepositories = $cartRepositories;
    }

    public function getProductsInCart(Request $request)
{
    $listRequest = $request->input('listCartInfo');

    $listProductInCart = $this->cartRepositories->getProductsInCart($listRequest);
    $list = $listProductInCart->map(function ($item) {
        return [
            'id' => $item->id,
            'categoriesId' => $item->categories_id,
            'name' => $item->name,
            'image' => $item->image,
            'priceRegular' => $item->price_regular,
            'priceSale' => $item->price_sale,
            'description' => $item->description,
            'views' => $item->views,
            'content' => $item->content,
            'quantitySold' => $item->quantity_sold,
            'rate' => $item->rate,
            'discount' => $item->discount,
            'quantity' => $item->variantQuantity,
            'size' => $item->size,
            'color' => $item->color,
            'createdAt' => $item->created_at,
            'updatedAt' => $item->updated_at,
            'deletedAt' => $item->deleted_at,
        ];
    });
    return $list;
}

    public function getProductsInCartByUserId(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        $listProductInCart = $this->cartRepositories->getProductsInCartByUserId($userId);
        $list = $listProductInCart->map(function ($item) {
            return [
                'id' => $item->cartId,
                'quantity' => $item->cartQuantity,
                'color' => $item->color,
                'size' => $item->size,
                'userId' => $item->user_id,
                'createdAt' => $item->created_at,
                'updatedAt' => $item->updated_at,
                'product' => [
                    'id' => $item->product_id,
                    'categoriesId' => $item->categories_id,
                    'name' => $item->name,
                    'image' => $item->image,
                    'priceRegular' => $item->price_regular,
                    'priceSale' => $item->price_sale,
                    'description' => $item->description,
                    'views' => $item->views,
                    'content' => $item->content,
                    'quantitySold' => $item->quantity_sold,
                    'rate' => $item->rate,
                    'discount' => $item->discount,
                    'quantity' => $item->variantQuantity,
                    'createdAt' => $item->created_at,
                    'updatedAt' => $item->updated_at,
                    'deletedAt' => $item->deleted_at,
                ]
            ];
        });
        return $list;
    }

    public function addCart(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;
        $cart = $this->cartRepositories->addCart($request, $userId);
        return $cart;
    }
    public function updateCart(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $userId = $user->id;

        if(!is_null($request->input('cartId')) && !is_null($request->input('quantity'))){
            $this->cartRepositories->updateCart($request, $userId);
        }else{
            $this->cartRepositories->truncate();
        }

        return [];
    }
}
