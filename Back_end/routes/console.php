<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Artisan::command('vouchers:auto-lock', function () {
//     $this->comment('Auto-locking vouchers...');
//     // Call the command to auto-lock vouchers
//     $this->call('vouchers:auto-lock');
// })->purpose('Auto-lock vouchers every 5 minutes');