<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\colorController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\admin\VariantController;

use App\Http\Controllers\PostController;

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


// Route sản phẩm và biến sản phẩm
route::get('product', [ProductController::class, 'index'])->name('product');
route::get('createProduct', [ProductController::class, 'create'])->name('createProduct');
route::post('postProduct', [ProductController::class, 'Store'])->name('postProduct');
route::get('edit/{id}/Product', [ProductController::class, 'edit'])->name('get.Product');
route::put('update/{id}/Product', [ProductController::class, 'update'])->name('update.Product');
route::delete('delete/{id}/Product', [ProductController::class, 'destroy'])->name('delete.Product');
//softDelete product
route::get('Listdelete/Product', [ProductController::class, 'trashedProducts'])->name('ListDelete.Product');
route::get('restoneDelete/{id}/Product', [ProductController::class, 'restoreProduct'])->name('restoreProduct.Product');
route::delete('forceDelete/{id}/Product', [ProductController::class, 'forceDelete'])->name('forceDelete.Product');


// Route màu
route::get('color', [colorController::class, 'index'])->name("color");
route::get('createcolor', [colorController::class, 'create'])->name("createcolor");
route::post('postcolor', [colorController::class, 'store'])->name("postcolor");
Route::get('/color/{id}/edit', [ColorController::class, 'edit'])->name('getcolor');
route::put('updatecolor/{id}/update', [colorController::class, 'Update'])->name("updatecolor");
route::delete('deletecolor/{id}/delete', [colorController::class, 'destroy'])->name("deletecolor");
Route::prefix('admmin')->middleware('admin')->group(function () {});

Route::get('users', [UserController::class, 'index'])->name('users.index');
Route::get('users/show', [UserController::class, 'show'])->name('users.show');
Route::post('users', [UserController::class, 'store'])->name('users.store');
Route::get('users/create', [UserController::class, 'create'])->name('users.create');
Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

//Route Auth
//Đăng nhập
route::get('login', [AuthController::class, 'formLogin'])->name("login");
route::post('post-login', [AuthController::class, 'postLogin'])->name("post-login");

// Đăng kí
route::get('register', [AuthController::class, 'formRegister'])->name("register");
route::post('post-register', [AuthController::class, 'postRegister'])->name("post-register");

// Đăng xuất
route::get('logout', [AuthController::class, 'logout'])->name("logout");
