<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Services\Auth\IAuthService;
use Illuminate\Http\JsonResponse;
class PasswordResetController extends Controller
{
    public IAuthService $authService;

    public function __construct(IAuthService $authService)
    {
        $this->authService = $authService;
    }
    public function forgotPassword(Request $request)
    {
        $this->authService->forgotPassword($request);
        return BaseResponse::success([$request]);
    }
    
    // public function resetPassword(Request $request)
    // {
    //     $validatedData = $request->validate(['token' => 'required', 'new_password' => 'required']);
    //     $token = $validatedData['token'];
    //     $newPassword = $validatedData['newPassword'];
    //     try {
    //         $this->authService->resetPassword($token, $newPassword);
    //         return BaseResponse::success(['message' => 'Password reset successfully.']);
    //     } catch (\Exception $e) {
    //         return BaseResponse::error($e->getMessage(), $e->getCode());
    //     }
    // }
}
