<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartRepositories
{
    public function getProductsInCart($list)
    {
        $results = collect();
        foreach ($list as $item) {
            if (!is_null($item['color']) && !is_null($item['size']) && !is_null($item['productId'])) {
                $query = Product::select('products.*', DB::raw('CAST(product_variants.quantity AS UNSIGNED) as variantQuantity'))
                    ->join('product_variants', 'product_variants.product_id', '=', 'products.id')
                    ->join('colors', 'colors.id', '=', 'product_variants.color_id')
                    ->join('sizes', 'sizes.id', '=', 'product_variants.size_id');

                $result = $query->where('product_variants.product_id', $item['productId'])
                    ->where('colors.code', $item['color'])
                    ->where('sizes.size', $item['size'])->get();

                foreach ($result as $product) {
                    $product->color = $item['color'];
                    $product->size = $item['size'];
                }

                $results = $results->merge($result);
            }
        }


        return $results;
    }

    public function getProductsInCartByUserId($userId)
    {
        $query = Cart::select('carts.*', 'carts.id as cartId', 'products.*', 'carts.quantity as cartQuantity', 'product_variants.quantity as variantQuantity')
            ->join('colors', 'colors.code', '=', 'carts.color')
            ->join('sizes', 'sizes.size', '=', 'carts.size')
            ->join('products', 'carts.product_id', '=', 'products.id')
            ->join('product_variants', function ($join) {
                $join->on('product_variants.product_id', '=', 'carts.product_id')
                    ->on('product_variants.color_id', '=', 'colors.id')
                    ->on('product_variants.size_id', '=', 'sizes.id');
            });

        $result = $query->where('carts.user_id', $userId)->get();

        return $result;
    }

    public function addCart(Request $request, $userId)
    {
        $productVariant = ProductVariant::where('product_id', $request->input('productId'))->first();
        if (!empty($productVariant)) {
            if ($productVariant['quantity'] < $request->input('quantity')) {
                BaseResponse::failure('400', 'quantity is less than cart quantity', 'quantity.is.less.than.cart.quantity', []);
            }
        } else {
            BaseResponse::failure('400', 'Product Variant not found', 'product.variant.not.found', []);
        }

        $cart = Cart::where('product_id', $request->input('productId'))
            ->where('color', $request->input('color'))
            ->where('size', $request->input('size'))
            ->where('user_id', $userId)
            ->first();

        if ($cart) {
            $cart->quantity += $request->input('quantity');
            $cart->save();
        } else {
            $cart = Cart::create([
                'product_id' => $request->input('productId'),
                'quantity' => $request->input('quantity'),
                'color' => $request->input('color'),
                'size' => $request->input('size'),
                'user_id' => $userId,
            ]);
        }

//        $sql = "
        //        INSERT INTO carts (product_id, quantity, color, size, user_id)
        //        VALUES (?, ?, ?, ?, ?)
        //        ON DUPLICATE KEY UPDATE
        //        quantity = quantity + VALUES(quantity)
//          ";
//
//        DB::statement($sql, [$request->input('productId'), $request->input('quantity'), $request->input('color'), $request->input('size'), $userId]);

        return $cart;
    }

    public function updateCart(Request $request, $userId)
    {
        $cart = Cart::where('user_id', $userId)->where('id', $request->input('cartId'))->first();

        if (!empty($cart)) {

            if (is_null($request->input('quantity'))) {
                DB::table('carts')->truncate();
            }

            if ($request->input('quantity') > 0) {
                $cart->quantity = $request->input('quantity');
                $cart->save();
            } else {
                $cart->delete();
            }
        } else {
            BaseResponse::failure(400, '', 'cart.item.not.found', []);
        }

    }

    public function truncate()
    {
        DB::table('carts')->truncate();
    }

}
