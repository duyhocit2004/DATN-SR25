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


}
