<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \Log::info('Broadcast route booting');
        Broadcast::routes(['middleware' => ['jwt.auth']]);

        require base_path('routes/channels.php');
    }
}
