<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Support\Facades\DB;

class WishListRepositories
{
    public function getWishList($userId)
    {
        $wishLish = Wishlist::with('product')->where('user_id', '=', $userId)->get();
        return $wishLish;
    }

    public function addWishList($userId, $productId)
    {

        $wishlist = Wishlist::firstOrCreate(
            ['user_id' => $userId, 'product_id' => $productId],
            ['user_id' => $userId, 'product_id' => $productId]
        );

        if ($wishlist->wasRecentlyCreated) {
            return $wishlist;
        } else {
            BaseResponse::failure(400, 'Product already in wishlist', 'wishlist.is.exists', []);
        }

    }

    public function deleteWishList($userId, $productIds)
    {
        Wishlist::whereIn('product_id', $productIds)->where('user_id', $userId)->delete();
    }

    public function truncate()
    {
        DB::table('wishlist')->truncate();
    }

}
