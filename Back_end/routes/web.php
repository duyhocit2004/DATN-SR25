<?php

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

//route sản phẩm và biến sản phẩm
route::get('product',[ProductController::class,'index'])->name('product');
route::get('createProduct',[ProductController::class,'create'])->name('createProduct');
route::post('postProduct',[ProductController::class,'Store'])->name('postProduct');


// route màu
route::get('color',[colorController::class,'index'])->name("color");
route::get('createcolor',[colorController::class,'create'])->name("createcolor");
route::post('postcolor',[colorController::class,'store'])->name("postcolor");
Route::get('/color/{id}/edit', [ColorController::class, 'edit'])->name('getcolor');
route::put('updatecolor/{id}/update',[colorController::class,'Update'])->name("updatecolor");
route::delete('deletecolor/{id}/delete',[colorController::class,'destroy'])->name("deletecolor");

Route::prefix('admmin')->middleware('admin')->group(function(){
  
});

