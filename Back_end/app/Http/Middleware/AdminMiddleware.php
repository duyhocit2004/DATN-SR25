<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            $adminRoles = ['Quản trị viên', 'Quản lý'];
            if (empty($user) || !in_array($user->role, $adminRoles)) {
                return response()->json([
                    'status' => 403,
                    'timestamp' => time(),
                    'message' => 'Bạn không có quyền xóa',
                    'messageKey' => 'no.permission.delete',
                    'data' => []
                ], 403);
            }
        } catch (\Exception $e) {
            return response()->json([
                'status' => 403,
                'timestamp' => time(),
                'message' => 'Bạn không có quyền xóa',
                'messageKey' => 'no.permission.delete',
                'data' => []
            ], 403);
        }
        return $next($request);
    }
} 