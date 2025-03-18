<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\cart\ICartService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public ICartService $cartService;

    protected $cloudinary;

    public function __construct(ICartService $cartService)
    {
        $this->cartService = $cartService;
    }



}
