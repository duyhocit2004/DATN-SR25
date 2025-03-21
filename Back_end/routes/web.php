<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BoxchatController;
use App\Http\Controllers\admin\CartController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\admin\colorController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\admin\VariantController;
use App\Http\Controllers\admin\VoucherController;
use App\Http\Controllers\admin\OrderController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\admin\CommentController;


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
    return view('admin.dashboard');
})->name('/');

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

Route::prefix('admmin')->middleware('admin')->group(function () {

});

// Route danh mục
Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
Route::post('postCategories', [CategoryController::class, 'store'])->name('categories.store');
Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
Route::delete('categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');

// Route size
Route::get('sizes', [SizeController::class, 'index'])->name('sizes.index');
Route::post('sizes', [SizeController::class, 'store'])->name('sizes.store');
Route::get('sizes/create', [SizeController::class, 'create'])->name('sizes.create');
Route::get('sizes/{id}/edit', [SizeController::class, 'edit'])->name('sizes.edit');
Route::put('sizes/{id}', [SizeController::class, 'update'])->name('sizes.update');
Route::delete('sizes/{id}', [SizeController::class, 'destroy'])->name('sizes.destroy');

// Route tài khoản
Route::get('users', [UserController::class, 'index'])->name('users.index');
Route::get('users/show', [UserController::class, 'show'])->name('users.show');
Route::post('users', [UserController::class, 'store'])->name('users.store');
Route::get('users/create', [UserController::class, 'create'])->name('users.create');
Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
Route::delete('users/{id}', [UserController::class, 'destroy'])->name('users.destroy');

// Route biến thể
Route::get('variant', [VariantController::class, 'index'])->name('variant.index');
Route::get('get\{id}\variant', [VariantController::class, 'edit'])->name('variant.listid');
Route::get('create\{id}\variant', [VariantController::class, 'create'])->name('variant.create');
Route::get('show\variant', [VariantController::class, 'show'])->name('variant.show');
Route::post('store\variant', [VariantController::class, 'store'])->name('variant.store');
Route::put('update\{id}\variant', [VariantController::class, 'update'])->name('variant.update');
Route::delete('/variant/{id}', [VariantController::class, 'destroy'])->name('variant.delete');

// Route Orders
Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
Route::post('orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('orders/create', [OrderController::class, 'create'])->name('orders.create');
Route::get('orders/{id}', [OrderController::class, 'show'])->name('orders.show');
Route::get('orders/{id}/edit', [OrderController::class, 'edit'])->name('orders.edit');
Route::put('orders/{id}', [OrderController::class, 'update'])->name('orders.update');
Route::delete('orders/{id}', [OrderController::class, 'destroy'])->name('orders.destroy');

// Route đăng kí
route::get('register', [AuthController::class, 'formRegister'])->name("register");
route::post('post-register', [AuthController::class, 'postRegister'])->name("post-register");


route::get('login', [AuthController::class, 'formLogin'])->name("login");
route::post('post-login', [AuthController::class, 'postLogin'])->name('post-login');
// Route đăng xuất
route::get('logout', [AuthController::class, 'logout'])->name("logout");

route::resource('Voucher',VoucherController::class);


// Route Cart
Route::get('carts', [CartController::class, 'index'])->name('carts.index');
Route::post('carts', [CartController::class, 'store'])->name('carts.store');
Route::post('carts/{id}', [CartController::class, 'show'])->name('carts.show');
Route::get('carts/create', [CartController::class, 'create'])->name('carts.create');
Route::get('/carts/{id}/edit', [CartController::class, 'edit'])->name('carts.edit');
Route::put('/carts/{id}', [CartController::class, 'update'])->name('carts.update');
Route::delete('carts/{id}/items/{item}', [CartController::class, 'destroyItem'])->name('carts.destroy.item');
Route::delete('carts/{id}', [CartController::class, 'destroy'])->name('carts.destroy');


//Tin nhắn
Route::get('boxchat',[BoxchatController::class,'index'])->name('boxchat.index');

//comment

route::resource('comment',CommentController::class);
// Route Voucher
Route::get('vouchers', [VoucherController::class, 'index']) -> name('vouchers.index');
Route::get('vouchers/crate', [VoucherController::class, 'create']) -> name('vouchers.create');
Route::post('vouchers', [VoucherController::class, 'store']) -> name('vouchers.store');
Route::get('voucher/{id}/edit', [VoucherController::class, 'edit']) -> name('vouchers.edit');
Route::put('vouchers/{id}', [VoucherController::class, 'update']) -> name('vouchers.update');
Route::delete('vouchers/{id}', [VoucherController::class, 'destroy']) -> name('vouchers.destroy');


// Route Comment
Route::get('comments', [CommentController::class, 'index']) -> name('comments.index');
Route::get('comments/crate', [CommentController::class, 'create']) -> name('comments.create');
Route::post('comments', [CommentController::class, 'store']) -> name('comments.store');
Route::get('comments/{id}/edit', [CommentController::class, 'edit']) -> name('comments.edit');
Route::put('comments/{id}', [CommentController::class, 'update']) -> name('comments.update');
Route::delete('comments/{id}', [CommentController::class, 'destroy']) -> name('comments.destroy');
