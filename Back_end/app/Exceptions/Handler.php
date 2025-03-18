<?php

namespace App\Exceptions;

use App\Helpers\BaseResponse;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Auth\AuthenticationException;

class Handler extends ExceptionHandler
{
    /**
     * A list of exception types with their corresponding custom log levels.
     *
     * @var array<class-string<\Throwable>, \Psr\Log\LogLevel::*>
     */
    protected $levels = [
        //
    ];

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<\Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    protected function unauthenticated($request, AuthenticationException $exception)
    {
        abort(response()->json('Unauthorized', 403));
    }

    public function render($request, Throwable $e) {
        // Ép JSON nếu URL bắt đầu bằng /api/
        if ($request->is('api/*')) {
            return response()->json([
                'timestamp' => time(),
                'message' => $e->getMessage(),
                'messageKey' => '',
                'data' => [],
                'status' => $this->getStatusCode($e)
            ], $this->getStatusCode($e));
        }
        return parent::render($request, $e);
    }

    private function getStatusCode($e) {
        return method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;
    }
}
