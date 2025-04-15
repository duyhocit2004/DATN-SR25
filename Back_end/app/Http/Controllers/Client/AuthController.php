<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;

use App\Helpers\CommonHelper;

use App\Http\Controllers\Controller;
use App\Services\Auth\IAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public IAuthService $authService;

    public function __construct(IAuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request): JsonResponse
    {
        $dataResponse = $this->authService->login($request);
        return BaseResponse::success($dataResponse);
    }

    public function getUser(Request $request): JsonResponse
    {
        $dataResponse = $this->authService->getUser($request);
        return BaseResponse::success($dataResponse);
    }

    public function updateUserAdmin(Request $request): JsonResponse
    {
        $dataResponse = $this->authService->updateUserAdmin($request);
        return BaseResponse::success($dataResponse);
    }

    public function updateUser(Request $request): JsonResponse
    {
        $dataResponse = $this->authService->updateUser($request);
        return BaseResponse::success($dataResponse);
    }

    public function register(Request $request)
    {
        $register = $this->authService->register($request);
        return BaseResponse::success($register);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request);
        return BaseResponse::success([]);
    }

    public function loginAdmin(Request $request)
    {
        $dataResponse = $this->authService->loginAdmin($request);
        return BaseResponse::success($dataResponse);
    }

    
   
}

