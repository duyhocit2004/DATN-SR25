<?php
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\Api\ApiProductController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\ApiPostController;
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


// Route post
Route::get('posts', [ApiPostController::class, 'index']); // Lấy danh sách bài viết
Route::post('posts', [ApiPostController::class, 'store']); // Tạo bài viết mới
Route::get('posts/{id}', [ApiPostController::class, 'show']); // Lấy chi tiết bài viết
Route::put('posts/{id}', [ApiPostController::class, 'update']); // Cập nhật bài viết
Route::delete('posts/{id}', [ApiPostController::class, 'destroy']); // Xóa bài viết
