<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\Client\AuthController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Common\CommonController;
use App\Http\Controllers\VNPayController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('users')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});

Route::prefix('admin')->group(function () {
    Route::post('login', [AuthController::class, 'loginAdmin']);
});

//các api cần authen
Route::middleware('jwt.auth')->group(function () {

    Route::prefix('users')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/updateUser', [AuthController::class, 'updateUser']);
    });


    // các api màn admin
    Route::prefix('admin')->group(function () {

        Route::prefix('users')->group(function () {
            Route::post('/getUserInfoByEmail', [AuthController::class, 'getUser']);
            Route::post('/updateUserAdmin', [AuthController::class, 'updateUserAdmin']);
            Route::post('/getAllUser', [AdminController::class, 'getAllUser']);
            Route::post('/deleteUser', [AdminController::class, 'deleteUser']);
        });

    });
});

