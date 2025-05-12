<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Helpers\BaseResponse;

class ManagerMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $user = JWTAuth::parseToken()->authenticate();
        
        if (empty($user) || $user->role !== 'Quản lý') {
            JWTAuth::invalidate(JWTAuth::getToken());
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        return $next($request);
    }
} 