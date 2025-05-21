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

                // Kiểm tra token_version
                $payload = JWTAuth::parseToken()->getPayload();
                $tokenVersion = $payload->get('token_version');
                if ($user->token_version != $tokenVersion) {
                    return response()->json([
                        'status' => 401,
                        'messageKey' => 'token.invalidated',
                        'message' => 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
                        'data' => []
                    ], 401);
                }

                // Check if user account is locked
                if ($user->is_locked) {
                    return response()->json([
                        'status' => 403,
                        'messageKey' => 'account.locked',
                        'message' => 'Your account has been locked. Please contact support for assistance.',
                        'data' => []
                    ], 403);
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
