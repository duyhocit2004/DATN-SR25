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
        
        if (empty($user) || ($user->role !== 'Quản lý' && $user->role !== 'Quản trị viên')) {
            return BaseResponse::failure(403, 'Forbidden: Access is denied', 'forbidden', []);
        }

        // Check if the request method is not GET (viewing) and not related to order updates
        if ($user->role === 'Quản lý' && $request->method() !== 'GET' && !$this->isOrderUpdateRequest($request)) {
            return BaseResponse::failure(403, 'Quản lý chỉ có quyền xem dữ liệu và cập nhật đơn hàng', 'manager.read.only', []);
        }

        return $next($request);
    }

    private function isOrderUpdateRequest(Request $request)
    {
        // Check if the request is for updating an order
        return $request->is('api/orders/updateOrder') || 
               $request->is('api/orders/*/update') ||
               str_contains($request->path(), 'orders/update');
    }
} 