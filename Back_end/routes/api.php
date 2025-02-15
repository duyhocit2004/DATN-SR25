<?php

use App\Http\Controllers\Api\ApiProductController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
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

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::get('products', [ApiProductController::class, 'index']);

Route::get('users', [ApiUserController::class, 'index']);

Route::post('users', [ApiUserController::class, 'store']);
Route::get('users/{id}', [ApiUserController::class, 'show']);
Route::put('users/{id}', [ApiUserController::class, 'update']);
Route::delete('users/{id}', [ApiUserController::class, 'destroy']);
