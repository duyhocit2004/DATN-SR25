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

Route::prefix('products')->group(function () {
    Route::post('/getAllFilter', [ProductController::class, 'getAllProductWithImages']);
    Route::post('/getProduct', [ProductController::class, 'getProduct']);
    Route::post('/getProductDetail', [ProductController::class, 'getProductDetail']);
    Route::post('/getSizeByProductIdAndColor', [ProductController::class, 'getSizeByProductIdAndColor']);
    Route::post('/getColorByProductIdAndSize', [ProductController::class, 'getColorByProductIdAndSize']);
    Route::post('/getTopDiscountedProducts', [ProductController::class, 'getTopDiscountedProducts']);
    Route::post('/getTopNewestProducts', [ProductController::class, 'getTopNewestProducts']);
    Route::post('/getTopBestSellingProducts', [ProductController::class, 'getTopBestSellingProducts']);
    Route::post('/getRelatedProducts', [ProductController::class, 'getRelatedProducts']);
    Route::post('/getAllSizes', [ProductController::class, 'getAllSizes']);
    Route::post('/getAllColors', [ProductController::class, 'getAllColors']);
    Route::post('/getComment', [ProductController::class, 'getComment']);
    Route::post('/getWishListStorage', [ProductController::class, 'getWishListStorage']);
    Route::post('/addComment', [ProductController::class, 'addComment']);
});

Route::prefix('home')->group(function () {
    Route::post('/getAllCategories', [HomeController::class, 'getAllCategories']);
    Route::post('/getAllBanners', [HomeController::class, 'getAllBanners']);
    Route::post('/getParentCategories', [HomeController::class, 'getParentCategories']);
    Route::post('/getChildrenCategories', [HomeController::class, 'getChildrenCategories']);
});

Route::prefix('carts')->group(function () {
    Route::post('/getProductsInCart', [CartController::class, 'getProductsInCart']);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'loginAdmin']);
    Route::post('/getAllCategoriesNonTree', [AdminController::class, 'getAllCategoriesNonTree']);
    Route::post('/getParentCommentPaging', [ProductController::class, 'getParentCommentPaging']);
    Route::post('/getCommentWithReply', [ProductController::class, 'getCommentWithReply']);
});

Route::prefix('users')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgotPassword', [AuthController::class, 'forgotPassword']);
});

Route::prefix('orders')->group(function () {
    Route::post('/addOrder', [OrderController::class, 'addOrder']);
    Route::post('/getOrders', [OrderController::class, 'getOrders']);
    Route::post('/getOrderDetail', [OrderController::class, 'getOrderDetail']);
    Route::post('/getVoucher', [OrderController::class, 'getVoucher']);
});


Route::post('/vnpay/create', [VNPayController::class, 'createPayment']);
Route::get('/vnpay/return', [VNPayController::class, 'returnPayment']);

//các api cần authen
Route::middleware('jwt.auth')->group(function () {
    Route::prefix('products')->group(function () {
        Route::post('/getWishList', [ProductController::class, 'getWishList']);
        Route::post('/addWishList', [ProductController::class, 'addWishList']);
        Route::post('/deleteWishList', [ProductController::class, 'deleteWishList']);
    });
    Route::prefix('carts')->group(function () {
        Route::post('/getProductsInCartByUserId', [CartController::class, 'getProductsInCartByUserId']);
        Route::post('/addCart', [CartController::class, 'addCart']);
        Route::post('/updateCart', [CartController::class, 'updateCart']);
    });
    Route::prefix('users')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/updateUser', [AuthController::class, 'updateUser']);
        Route::post('/changePassword', [AuthController::class, 'changePassword']);

    });
    Route::post('/uploadImage', [CommonController::class, 'uploadImage']);


    // các api màn admin
    Route::prefix('admin')->group(function () {
        Route::prefix('dashboard')->group(function () {
            Route::post('/getDataStats', [AdminController::class, 'getDataStats']);
            Route::post('/getDashboardChart', [AdminController::class, 'getDashboardChart']);
        });

        Route::prefix('users')->group(function () {
            Route::post('/getUserInfoByEmail', [AuthController::class, 'getUser']);
            Route::post('/updateUserAdmin', [AuthController::class, 'updateUserAdmin']);
            Route::post('/getAllUser', [AdminController::class, 'getAllUser']);
            Route::post('/deleteUser', [AdminController::class, 'deleteUser']);
        });

        Route::prefix('orders')->group(function () {
            Route::post('/getOrdersPaging', [OrderController::class, 'getOrdersPaging']);
            Route::post('/updateOrder', [OrderController::class, 'updateOrder']);
            Route::post('/deleteOrder', [OrderController::class, 'deleteOrder']);
            Route::post('/refundOrder', [OrderController::class, 'refundOrder']);

        });

        Route::prefix('colors')->group(function () {
            Route::post('/addColor', [AdminController::class, 'addColor']);
            Route::post('/updateColor', [AdminController::class, 'updateColor']);
            Route::post('/deleteColor', [AdminController::class, 'deleteColor']);
        });
        Route::prefix('sizes')->group(function () {
            Route::post('/addSize', [AdminController::class, 'addSize']);
            Route::post('/updateSize', [AdminController::class, 'updateSize']);
            Route::post('/deleteSize', [AdminController::class, 'deleteSize']);
        });


        Route::prefix('products')->group(function () {
            Route::post('/addProductWithVariant', [ProductAdminController::class, 'addProductWithVariant']);
            Route::post('/updateProductWithVariant', [ProductAdminController::class, 'updateProductWithVariant']);
            Route::post('/deleteProduct', [ProductAdminController::class, 'deleteProduct']);
        });

        Route::prefix('categories')->group(function () {
            Route::post('/addCategory', [AdminController::class, 'addCategory']);
            Route::post('/updateCategory', [AdminController::class, 'updateCategory']);
            Route::post('/deleteCategory', [AdminController::class, 'deleteCategory']);
        });

        Route::prefix('vouchers')->group(function () {
            Route::post('/getAllVoucher', [AdminController::class, 'getAllVoucher']);
            Route::post('/addVoucher', [AdminController::class, 'addVoucher']);
            Route::post('/updateVoucher', [AdminController::class, 'updateVoucher']);
            Route::post('/deleteVoucher', [AdminController::class, 'deleteVoucher']);
            Route::post('/toggleStatus', [AdminController::class, 'toggleStatus']);
        });

        Route::prefix('banners')->group(function () {
            Route::post('/addBanner', [AdminController::class, 'addBanner']);
            Route::post('/updateBanner', [AdminController::class, 'updateBanner']);
            Route::post('/deleteBanner', [AdminController::class, 'deleteBanner']);
        });
    });
});


