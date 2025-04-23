<?php

namespace App\Providers;

use App\Services\Momo\IMomoService;
use App\Services\Momo\impl\MomoService;
use Illuminate\Support\ServiceProvider;

class MomoServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(IMomoService::class, MomoService::class);
    }

    public function boot()
    {
        //
    }
} 