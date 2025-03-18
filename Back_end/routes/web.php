<?php

//use App\Http\Controllers\Admin\AuthAdminController;
//use App\Http\Controllers\Admin\BoxchatAdminController;
//use App\Http\Controllers\Admin\CartControllerAdmin;
//use App\Http\Controllers\Admin\UserAdminController;
//use App\Http\Controllers\Admin\colorAdminController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\ProductAdminController;


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

//Route::get('/', function () {
//    return view('admin.dashboard');
//})->name('/');
//
//// Route sản phẩm và biến sản phẩm
//route::get('product', [ProductAdminController::class, 'index'])->name('product');
//route::get('createProduct', [ProductAdminController::class, 'create'])->name('createProduct');
//route::post('postProduct', [ProductAdminController::class, 'Store'])->name('postProduct');
//route::get('edit/{id}/Product', [ProductAdminController::class, 'edit'])->name('get.Product');
//route::put('update/{id}/Product', [ProductAdminController::class, 'update'])->name('update.Product');
//route::delete('delete/{id}/Product', [ProductAdminController::class, 'destroy'])->name('delete.Product');
////softDelete product
//route::get('Listdelete/Product', [ProductAdminController::class, 'trashedProducts'])->name('ListDelete.Product');
//route::get('restoneDelete/{id}/Product', [ProductAdminController::class, 'restoreProduct'])->name('restoreProduct.Product');
//route::delete('forceDelete/{id}/Product', [ProductAdminController::class, 'forceDelete'])->name('forceDelete.Product');
//
//
//// Route màu
//route::get('color', [colorAdminController::class, 'index'])->name("color");
//route::get('createcolor', [colorAdminController::class, 'create'])->name("createcolor");
//route::post('postcolor', [colorAdminController::class, 'store'])->name("postcolor");
//Route::get('/color/{id}/edit', [colorAdminController::class, 'edit'])->name('getcolor');
//route::put('updatecolor/{id}/update', [colorAdminController::class, 'Update'])->name("updatecolor");
//route::delete('deletecolor/{id}/delete', [colorAdminController::class, 'destroy'])->name("deletecolor");
//
//Route::prefix('admmin')->middleware('admin')->group(function () {
//
//});
//
//// Route danh mục
//Route::get('categories', [CategoryController::class, 'index'])->name('categories.index');
//Route::get('categories/create', [CategoryController::class, 'create'])->name('categories.create');
//Route::post('postCategories', [CategoryController::class, 'store'])->name('categories.store');
//Route::get('/categories/{id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
//Route::put('/categories/{id}', [CategoryController::class, 'update'])->name('categories.update');
//Route::delete('categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');
//
//// Route size
//Route::get('sizes', [SizeController::class, 'index'])->name('sizes.index');
//Route::post('sizes', [SizeController::class, 'store'])->name('sizes.store');
//Route::get('sizes/create', [SizeController::class, 'create'])->name('sizes.create');
//Route::get('sizes/{id}/edit', [SizeController::class, 'edit'])->name('sizes.edit');
//Route::put('sizes/{id}', [SizeController::class, 'update'])->name('sizes.update');
//Route::delete('sizes/{id}', [SizeController::class, 'destroy'])->name('sizes.destroy');
//
//// Route tài khoản
//Route::get('users', [UserAdminController::class, 'index'])->name('users.index');
//Route::get('users/show', [UserAdminController::class, 'show'])->name('users.show');
//Route::post('users', [UserAdminController::class, 'store'])->name('users.store');
//Route::get('users/create', [UserAdminController::class, 'create'])->name('users.create');
//Route::get('/users/{id}/edit', [UserAdminController::class, 'edit'])->name('users.edit');
//Route::put('/users/{id}', [UserAdminController::class, 'update'])->name('users.update');
//Route::delete('users/{id}', [UserAdminController::class, 'destroy'])->name('users.destroy');
//
//// Route biến thể
//Route::get('variant', [VariantAdminController::class, 'index'])->name('variant.index');
//Route::get('get\{id}\variant', [VariantAdminController::class, 'edit'])->name('variant.listid');
//Route::get('create\{id}\variant', [VariantAdminController::class, 'create'])->name('variant.create');
//Route::get('show\variant', [VariantAdminController::class, 'show'])->name('variant.show');
//Route::post('store\variant', [VariantAdminController::class, 'store'])->name('variant.store');
//Route::put('update\{id}\variant', [VariantAdminController::class, 'update'])->name('variant.update');
//Route::delete('/variant/{id}', [VariantAdminController::class, 'destroy'])->name('variant.delete');
//
//// Route Orders
//Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
//Route::post('orders', [OrderController::class, 'store'])->name('orders.store');
//Route::get('orders/create', [OrderController::class, 'create'])->name('orders.create');
//Route::get('orders/{id}', [OrderController::class, 'show'])->name('orders.show');
//Route::get('orders/{id}/edit', [OrderController::class, 'edit'])->name('orders.edit');
//Route::put('orders/{id}', [OrderController::class, 'update'])->name('orders.update');
//Route::delete('orders/{id}', [OrderController::class, 'destroy'])->name('orders.destroy');
//
//// Route đăng kí
//route::get('register', [AuthAdminController::class, 'formRegister'])->name("register");
//route::post('post-register', [AuthAdminController::class, 'postRegister'])->name("post-register");
//
//
//route::get('login', [AuthAdminController::class, 'formLogin'])->name("login");
//route::post('post-login', [AuthAdminController::class, 'postLogin'])->name('post-login');
//// Route đăng xuất
//route::get('logout', [AuthAdminController::class, 'logout'])->name("logout");
//
//route::resource('Voucher',VoucherAdminController::class);
//
//
//// Route Cart
//Route::get('carts', [CartControllerAdmin::class, 'index'])->name('carts.index');
//Route::post('carts', [CartControllerAdmin::class, 'store'])->name('carts.store');
//Route::post('carts/{id}', [CartControllerAdmin::class, 'show'])->name('carts.show');
//Route::get('carts/create', [CartControllerAdmin::class, 'create'])->name('carts.create');
//Route::get('/carts/{id}/edit', [CartControllerAdmin::class, 'edit'])->name('carts.edit');
//Route::put('/carts/{id}', [CartControllerAdmin::class, 'update'])->name('carts.update');
//Route::delete('carts/{id}/items/{item}', [CartControllerAdmin::class, 'destroyItem'])->name('carts.destroy.item');
//Route::delete('carts/{id}', [CartControllerAdmin::class, 'destroy'])->name('carts.destroy');
//
//
////Tin nhắn
//Route::get('boxchat',[BoxchatAdminController::class,'index'])->name('boxchat.index');
//
////comment
//
//route::resource('comment',CommentAdminController::class);
//// Route Voucher
//Route::get('vouchers', [VoucherAdminController::class, 'index']) -> name('vouchers.index');
//Route::get('vouchers/crate', [VoucherAdminController::class, 'create']) -> name('vouchers.create');
//Route::post('vouchers', [VoucherAdminController::class, 'store']) -> name('vouchers.store');
//Route::get('voucher/{id}/edit', [VoucherAdminController::class, 'edit']) -> name('vouchers.edit');
//Route::put('vouchers/{id}', [VoucherAdminController::class, 'update']) -> name('vouchers.update');
//Route::delete('vouchers/{id}', [VoucherAdminController::class, 'destroy']) -> name('vouchers.destroy');
