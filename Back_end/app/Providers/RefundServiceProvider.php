<?php

namespace App\Providers;

use App\Services\Refund\IRefundService;
use App\Services\Refund\impl\RefundService;
use Illuminate\Support\ServiceProvider;

class RefundServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(IRefundService::class, RefundService::class);
    }

    public function boot()
    {
        //
    }
} 