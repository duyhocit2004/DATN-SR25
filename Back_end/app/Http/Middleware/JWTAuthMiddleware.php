<?php

namespace App\Http\Middleware;

use App\Helpers\BaseResponse;
use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWTAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (JWTException $e) {
            return response()->json([
                'status' => 401,
                'messageKey' => 'Unauthorized',
                'data' => []
            ], 401);
        }

        return $next($request);
    }

}
