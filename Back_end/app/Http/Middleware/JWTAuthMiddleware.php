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
                return response()->json([
                    'status' => 401,
                    'messageKey' => 'token.not.provided',
                    'message' => 'Token not provided',
                    'data' => []
                ], 401);
            }
            
            // Remove 'Bearer ' prefix if present
            $token = str_replace('Bearer ', '', $token);
            \Log::info('Token after processing:', ['token' => $token]);
            
            try {
                $user = JWTAuth::parseToken()->authenticate();
                if (!$user) {
                    return response()->json([
                        'status' => 401,
                        'messageKey' => 'user.not.found',
                        'message' => 'User not found',
                        'data' => []
                    ], 401);
                }
                auth()->setUser($user);
            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
                return response()->json([
                    'status' => 401,
                    'messageKey' => 'token.expired',
                    'message' => 'Token has expired',
                    'data' => []
                ], 401);
            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
                return response()->json([
                    'status' => 401,
                    'messageKey' => 'token.invalid',
                    'message' => 'Token is invalid',
                    'data' => []
                ], 401);
            }
        } catch (JWTException $e) {
            \Log::error('JWT Authentication failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'status' => 401,
                'messageKey' => 'unauthorized',
                'message' => $e->getMessage(),
                'data' => []
            ], 401);
        }

        return $next($request);
    }

}
