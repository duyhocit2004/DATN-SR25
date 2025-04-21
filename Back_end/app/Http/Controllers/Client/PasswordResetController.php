<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\BaseResponse;
use App\Services\Auth\IAuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class PasswordResetController extends Controller
{
    public IAuthService $authService;

    public function __construct(IAuthService $authService)
    {
        $this->authService = $authService;
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        try {
            // Validate request
            $validator = Validator::make($request->all(), [
                'email' => 'required|email|exists:users,email',
            ], [
                'email.required' => 'Email là bắt buộc',
                'email.email' => 'Email không đúng định dạng',
                'email.exists' => 'Email không tồn tại trong hệ thống',
            ]);

            if ($validator->fails()) {
                return BaseResponse::error($validator->errors()->first(), 422);
            }

            // Process forgot password
            $result = $this->authService->forgotPassword($request);

            if ($result['success']) {
                return BaseResponse::success([
                    'message' => $result['message']
                ]);
            }

            return BaseResponse::error($result['message'], 400);
        } catch (\Exception $e) {
            Log::error('Forgot password error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString(),
                'request' => $request->all()
            ]);
            
            return BaseResponse::error('Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.', 500);
        }
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
