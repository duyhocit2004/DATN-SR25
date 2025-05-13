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
            $token = $request->header('Authorization');
            \Log::info('Received Authorization header:', ['header' => $token]);
            
            if (!$token) {
                throw new JWTException('Token not provided');
            }
            
            // Remove 'Bearer ' prefix if present
            $token = str_replace('Bearer ', '', $token);
            \Log::info('Token after processing:', ['token' => $token]);
            
            $user = JWTAuth::parseToken()->authenticate();
            auth()->setUser($user);
        } catch (JWTException $e) {
            \Log::error('JWT Authentication failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 401,
                'messageKey' => 'Unauthorized',
                'message' => $e->getMessage(),
                'data' => []
            ], 401);
        }

        return $next($request);
    }

}
