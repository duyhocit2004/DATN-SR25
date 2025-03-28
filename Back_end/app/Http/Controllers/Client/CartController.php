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

    public function getProductsInCart(Request $request): JsonResponse
    {
        $products = $this->cartService->getProductsInCart($request);
        return BaseResponse::success($products);
    }

    public function getProductsInCartByUserId(Request $request): JsonResponse
    {
        $products = $this->cartService->getProductsInCartByUserId($request);
        return BaseResponse::success($products);
    }

    public function addCart(Request $request)
    {
        $card = $this->cartService->addCart($request);
        return BaseResponse::success($card);
    }

    public function updateCart(Request $request)
    {
        $card = $this->cartService->updateCart($request);
        return BaseResponse::success($card);
    }

}
