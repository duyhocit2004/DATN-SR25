<?php

namespace App\Providers;

// use App\Repositories\SizeRepositories;
// use App\Services\Size\SizeService;
use Illuminate\Support\ServiceProvider;
use  Illuminate\Pagination\Paginator;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // $this->app->singleton(SizeRepositories::class, function ($app) {
        //     return new SizeRepositories();
        // });

        // $this->app->singleton(SizeService::class, function ($app) {
        //     return new SizeService($app->make(SizeRepositories::class));
        // });
            }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Paginator::useBootstrap();
    }
}
