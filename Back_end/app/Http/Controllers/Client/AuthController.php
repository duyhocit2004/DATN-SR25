<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
<<<<<<< HEAD
=======
use App\Helpers\CommonHelper;
>>>>>>> a9bca3b99d94a1587f7c59610338b86ac9f82d21
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
<<<<<<< HEAD

    public function forgotPassword(Request $request)
    {
        $newPassword = $this->authService->forgotPassword($request);
        return BaseResponse::success($newPassword);
    }

    public function changePassword(Request $request)
    {
        $this->authService->changePassword($request);
        return BaseResponse::success(['message' => 'Password reset successfully.']);
    }
}
=======
    
    public function forgotPassword(Request $request)
{
    $validatedData = $request->validate(['email' => 'required|email']);
    $email = $validatedData['email'];
    $this->authService->requestPasswordReset($email);
    return BaseResponse::success(['message' => 'Password reset email sent.']);
}

public function resetPassword(Request $request)
{
    $validatedData = $request->validate(['token' => 'required', 'new_password' => 'required']);
    $token = $validatedData['token'];
    $newPassword = $validatedData['newPassword'];
    try {
        $this->authService->resetPassword($token, $newPassword);
        return BaseResponse::success(['message' => 'Password reset successfully.']);
    } catch (\Exception $e) {
        return BaseResponse::error($e->getMessage(), $e->getCode());
    }
}
}
>>>>>>> a9bca3b99d94a1587f7c59610338b86ac9f82d21
