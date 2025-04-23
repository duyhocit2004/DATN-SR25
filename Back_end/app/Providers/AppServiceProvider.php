<?php

namespace App\Providers;

// use App\Repositories\SizeRepositories;
// use App\Services\Size\SizeService;
use App\Services\Auth\IAuthService;
use App\Services\MoMo\IMoMoService;
use Illuminate\Pagination\Paginator;
use App\Services\Admin\IAdminService;
use App\Services\VnPay\IVnpayService;
use App\Services\Auth\impl\AuthService;
use App\Services\Common\ICommonService;
use App\Services\MoMo\impl\MoMoService;
use Illuminate\Support\ServiceProvider;
use App\Services\Admin\impl\AdminService;
use App\Services\VnPay\impl\VnpayService;
use App\Services\Client\cart\ICartService;
use App\Services\Common\impl\CommonService;
use App\Services\Client\order\IOrderService;
use App\Services\Client\product\IHomeService;
use App\Services\Client\cart\impl\CartService;
use App\Services\Client\order\impl\OrderService;
use App\Services\Client\product\IProductService;
use App\Services\Client\product\impl\HomeService;
use App\Services\Admin\product\IAdminProductService;
use App\Services\Client\product\impl\ProductService;
use App\Services\Admin\product\impl\AdminProductService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //Client
        $this->app->bind(IProductService::class, ProductService::class);
        $this->app->bind(IAuthService::class, AuthService::class);
        $this->app->bind(IHomeService::class, HomeService::class);
        $this->app->bind(ICartService::class, CartService::class);
        $this->app->bind(ICommonService::class, CommonService::class);
        $this->app->bind(IOrderService::class, OrderService::class);
        $this->app->bind(IAdminService::class, AdminService::class);
        $this->app->bind(IVnpayService::class, VnpayService::class);
        $this->app->bind(IMoMoService::class, MoMoService::class);
        //Admin
        $this->app->bind(IAdminProductService::class, AdminProductService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Paginator::useBootstrap();
    }
}
