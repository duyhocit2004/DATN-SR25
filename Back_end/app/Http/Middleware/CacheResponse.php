<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class CacheResponse
{
    public function handle(Request $request, Closure $next, $ttl = 60)
    {
        // Chỉ cache GET requests
        if ($request->method() !== 'GET') {
            return $next($request);
        }

        // Tạo cache key từ URL và query parameters
        $cacheKey = 'api:' . $request->fullUrl();

        // Kiểm tra cache
        if (Cache::has($cacheKey)) {
            return response()->json(Cache::get($cacheKey));
        }

        // Lấy response
        $response = $next($request);

        // Cache response nếu là JSON response
        if ($response->headers->get('content-type') === 'application/json') {
            Cache::put($cacheKey, $response->getData(), $ttl);
        }

        return $response;
    }
} 