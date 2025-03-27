<?php

namespace App\Services\Client\cart;

use Illuminate\Http\Request;

interface ICartService
{
    public function getProductsInCart(Request $request);

    public function getProductsInCartByUserId(Request $request);
    public function addCart(Request $request);
    public function updateCart(Request $request);

}
