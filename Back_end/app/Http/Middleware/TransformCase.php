<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class TransformCase
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        if ($response->headers->get('Content-Type') === 'application/json') {
            $data = json_decode($response->getContent(), true);
            $transformed = $this->convertSnakeToCamel($data);
            $response->setContent(json_encode($transformed));
        }
        return $response;
    }

    private function convertSnakeToCamel($data)
    {
        $result = [];
        foreach ($data as $key => $value) {
            $newKey = Str::camel($key); // Dùng hàm camelCase của Laravel
            $result[$newKey] = is_array($value) ? $this->convertSnakeToCamel($value) : $value;
        }
        return $result;
    }
}
