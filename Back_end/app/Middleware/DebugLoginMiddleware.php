<?php

namespace App\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class DebugLoginMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Log thông tin request
        Log::info('Login request', [
            'email' => $request->input('email'),
            'has_password' => !empty($request->input('password')),
            'request_data' => $request->all()
        ]);

        // Tiếp tục xử lý request
        return $next($request);
    }
} 