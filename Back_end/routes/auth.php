<?php

use Laravel\Passport\Http\Controllers\AccessTokenController;
use Illuminate\Support\Facades\Route;

Route::post('/oauth/token', [AccessTokenController::class, 'issueToken']);
