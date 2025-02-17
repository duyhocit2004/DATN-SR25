<?php
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiBannerController;
use App\Http\Controllers\Api\ApiCategoryController;
use App\Http\Controllers\Api\ApiProductController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ApiColorController;
use App\Http\Controllers\api\ApiSizeController;
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

Route::middleware('auth:sanctum')->group( function (){
Route::delete('/logout',[ApiAuthController::class,'logout']);
Route::get('/user',[ApiAuthController::class,'user']);
});

// Route::get('products', [ApiProductController::class, 'index']);
Route::post('login',[ApiAuthController::class,'login']);
Route::post('register',[ApiAuthController::class,'register']);

// Route sản phẩm
Route::get('products', [ApiProductController::class,'index']);
Route::post('products', [ApiProductController::class,'store']);
Route::get('products/{id}', [ApiProductController::class,'show']);
Route::put('products/{id}', [ApiProductController::class,'update']);
Route::delete('products/{id}', [ApiProductController::class,'destroy']);

// Route danh mục
Route::get('categories', [ApiCategoryController::class,'index']);
Route::post('categories', [ApiCategoryController::class,'store']);
Route::get('categories/{id}', [ApiCategoryController::class,'show']);
Route::put('categories/{id}', [ApiCategoryController::class,'update']);
Route::delete('categories/{id}', [ApiCategoryController::class,'destroy']);

// Route màu
Route::get('colors', [ApiColorController::class,'index']);
Route::post('colors', [ApiColorController::class,'store']);
Route::get('colors/{id}', [ApiColorController::class,'show']);
Route::put('colors/{id}', [ApiColorController::class,'update']);
Route::delete('colors/{id}', [ApiColorController::class,'destroy']);

Route::get('sizes', [ApiSizeController::class,'index']);
Route::post('sizes', [ApiSizeController::class,'store']);
Route::get('sizes/{id}', [ApiSizeController::class,'show']);
Route::put('sizes/{id}', [ApiSizeController::class,'update']);
Route::delete('sizes/{id}', [ApiSizeController::class,'destroy']);

//Banner trang chủ
Route::apiResource('banner',ApiBannerController::class);

//users
Route::get('users', [ApiUserController::class, 'index']);
Route::post('users', [ApiUserController::class, 'store']);
Route::get('users/{id}', [ApiUserController::class, 'show']);
Route::put('users/{id}', [ApiUserController::class, 'update']);
Route::delete('users/{id}', [ApiUserController::class, 'destroy']);

