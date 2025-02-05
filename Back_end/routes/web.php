<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\colorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\ProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('admin.index');
});
Route::get('/', [ProductController::class, 'index'])->name('index');


route::get('color',[colorController::class,'index'])->name("color");
route::get('createcolor',[colorController::class,'create'])->name("createcolor");
route::post('postcolor',[colorController::class,'store'])->name("postcolor");
Route::get('/color/{id}/edit', [ColorController::class, 'edit'])->name('getcolor');
route::put('updatecolor/{id}/update',[colorController::class,'Update'])->name("updatecolor");
route::delete('deletecolor/{id}/delete',[colorController::class,'destroy'])->name("deletecolor");
Route::prefix('admmin')->middleware('admin')->group(function(){

});

//Route Auth
//Đăng nhập
route::get('login',[AuthController::class,'formLogin'])->name("login");
route::post('post-login',[AuthController::class,'postLogin'])->name("post-login");

// Đăng kí
route::get('register',[AuthController::class,'formRegister'])->name("register");
route::post('post-register',[AuthController::class,'postRegister'])->name("post-register");

// Đăng xuất
route::get('logout',[AuthController::class,'logout'])->name("logout");
