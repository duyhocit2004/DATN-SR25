<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckUserActive
{
    public function handle(Request $request, Closure $next)
    {
        $user = null;
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            // Không có token hoặc token không hợp lệ, bỏ qua để các middleware khác xử lý
        }
        if ($user && $user->status !== 'ACTIVE') {
            return response()->json([
                'status' => 403,
                'message' => 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin để được hỗ trợ.',
                'code' => 'account.locked'
            ], 403);
        }
        return $next($request);
    }
} 