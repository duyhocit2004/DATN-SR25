<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\admin\BannerController;
use App\Http\Controllers\admin\CategoryController;
use App\Http\Controllers\Admin\ColorController;
use App\Http\Controllers\admin\DashboarhController;
use App\Http\Controllers\Admin\ProductAdminController;
use App\Http\Controllers\admin\SizeController;
use App\Http\Controllers\admin\UserController;
use App\Http\Controllers\admin\VoucherController;
use App\Http\Controllers\Client\AuthController;
use App\Http\Controllers\Client\CartController;
use App\Http\Controllers\Client\HomeController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\ProductController;
use App\Http\Controllers\Common\CommonController;
use App\Http\Controllers\VNPayController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Client\PasswordResetController;
use App\Http\Controllers\MoMoController;
use App\Http\Controllers\Client\NotificationController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\Admin\DashboardController;

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
    Route::post('/getSizesByType', [ProductController::class, 'getSizesByType']);
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
    Route::post('/clearCart', [CartController::class, 'clearCart']);
});

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'loginAdmin']);
    Route::post('/getAllCategoriesNonTree', [CategoryController::class, 'getAllCategoriesNonTree']);
    Route::post('/getParentCommentPaging', [ProductController::class, 'getParentCommentPaging']);
    Route::post('/getCommentWithReply', [ProductController::class, 'getCommentWithReply']);

    // Dashboard routes
    Route::get('/dashboard/latest-orders', [DashboardController::class, 'getLatestOrders']);
    Route::get('/dashboard/popular-products', [DashboardController::class, 'getPopularProducts']);
    Route::get('/dashboard/most-cancelled-products', [DashboardController::class, 'getMostCancelledProducts']);
});

Route::prefix('users')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgotPassword', [PasswordResetController::class, 'forgotPassword']);
});

Route::post('/vnpay/create', [VNPayController::class, 'createPayment']);
Route::get('/vnpay/return', [VNPayController::class, 'returnPayment']);

Route::post('/momo/createAtm', [MoMoController::class, 'createPaymentUrlMoMoATM']);
Route::post('/momo/createPay', [MoMoController::class, 'createPaymentUrlPayMoMo']);
Route::get('/momo/return', [MoMoController::class, 'handleReturnMoMo']);

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
        Route::post('/changePassword', [AuthController::class, 'changePassword']);
    });
    Route::post('/uploadImage', [CommonController::class, 'uploadImage']);

    // Orders routes
    Route::prefix('orders')->group(function () {
        Route::post('/addOrder', [OrderController::class, 'addOrder']);
        Route::post('/getOrders', [OrderController::class, 'getOrders']);
        Route::post('/getOrderDetail', [OrderController::class, 'getOrderDetail']);
        Route::post('/cancelOrderByClient', [OrderController::class, 'cancelOrderByClient']);
        Route::post('/getVoucher', [OrderController::class, 'getVoucher']);
        Route::post('/updateStatus', [OrderController::class, 'updateStatus']);
    });

    // các api màn admin
    Route::prefix('admin')->group(function () {
        Route::prefix('dashboard')->group(function () {
            Route::post('/getDataStats', [DashboarhController::class, 'getDataStats']);
            Route::post('/getDashboardChart', [DashboarhController::class, 'getDashboardChart']);
        });

        Route::prefix('users')->group(function () {
            Route::post('/getUserInfoByEmail', [AuthController::class, 'getUser']);
            Route::post('/getAllUser', [UserController::class, 'getAllUser']);
            Route::post('/updateUserAdmin', [UserController::class, 'updateUserAdmin'])->middleware('admin');
            Route::post('/updateUser', [AuthController::class, 'updateUser']);
            Route::post('/deleteUser', [UserController::class, 'deleteUser'])->middleware('admin');
        });

        Route::prefix('orders')->group(function () {
            Route::post('/getOrdersPaging', [OrderController::class, 'getOrdersPaging']);
            Route::post('/updateOrder', [OrderController::class, 'updateOrder'])->middleware('admin');
            Route::post('/deleteOrder', [OrderController::class, 'deleteOrder'])->middleware('admin');
            Route::post('/refundOrder', [OrderController::class, 'refundOrder']);
        });

        Route::prefix('colors')->group(function () {
            Route::post('/addColor', [ColorController::class, 'addColor'])->middleware('admin');
            Route::post('/updateColor', [ColorController::class, 'updateColor'])->middleware('admin');
            Route::post('/deleteColor', [ColorController::class, 'deleteColor'])->middleware('admin');
        });
        Route::prefix('sizes')->group(function () {
            Route::post('/addSize', [SizeController::class, 'addSize'])->middleware('admin');
            Route::post('/updateSize', [SizeController::class, 'updateSize'])->middleware('admin');
            Route::post('/deleteSize', [SizeController::class, 'deleteSize'])->middleware('admin');
        });

        Route::prefix('products')->group(function () {
            Route::post('/addProductWithVariant', [ProductAdminController::class, 'addProductWithVariant'])->middleware('admin');
            Route::post('/updateProductWithVariant', [ProductAdminController::class, 'updateProductWithVariant'])->middleware('admin');
            Route::post('/deleteProduct', [ProductAdminController::class, 'deleteProduct'])->middleware('admin');
        });

        Route::prefix('categories')->group(function () {
            Route::post('/addCategory', [CategoryController::class, 'addCategory'])->middleware('admin');
            Route::post('/updateCategory', [CategoryController::class, 'updateCategory'])->middleware('admin');
            Route::post('/deleteCategory', [CategoryController::class, 'deleteCategory'])->middleware('admin');
        });

        Route::prefix('vouchers')->group(function () {
            Route::post('/getAllVoucher', [VoucherController::class, 'getAllVoucher']);
            Route::post('/addVoucher', [VoucherController::class, 'addVoucher'])->middleware('admin');
            Route::post('/updateVoucher', [VoucherController::class, 'updateVoucher'])->middleware('admin');
            Route::post('/deleteVoucher', [VoucherController::class, 'deleteVoucher'])->middleware('admin');
            Route::post('/toggleStatus', [VoucherController::class, 'toggleStatus'])->middleware('admin');
        });

        Route::prefix('banners')->group(function () {
            Route::post('/addBanner', [BannerController::class, 'addBanner'])->middleware('manager');
            Route::post('/updateBanner', [BannerController::class, 'updateBanner'])->middleware('manager');
            Route::post('/deleteBanner', [BannerController::class, 'deleteBanner'])->middleware('manager');
        });
        
        Route::prefix('notifications')->group(function () {
            Route::get('/getAllNotifications', [NotificationController::class, 'index']);
            Route::post('/{id}/mark-as-read', [NotificationController::class, 'markAsRead']);
            Route::get('/unread-count', [NotificationController::class, 'unreadCount']);
            Route::post('/mark-all-as-read', [NotificationController::class, 'markAllAsRead']);
        });
    });
});

// Location routes
Route::middleware('jwt.auth')->group(function () {
    Route::get('/locations', [LocationController::class, 'index']);
    Route::post('/locations', [LocationController::class, 'store']);
    Route::put('/locations/{id}', [LocationController::class, 'update']);
    Route::delete('/locations/{id}', [LocationController::class, 'destroy']);
});

// Address routes
Route::get('/provinces', [LocationController::class, 'getProvinces']);
Route::get('/districts/{provinceId}', [LocationController::class, 'getDistricts']);
Route::get('/wards/{districtId}', [LocationController::class, 'getWards']);

Route::get('/test-broadcast', function () {
    $testOrder = [
        'id' => 1,
        'code' => 'TEST001',
        'customer_name' => 'Test Customer',
        'email' => 'test@example.com',
        'phone_number' => '0123456789',
        'total_price' => 100000,
        'status' => 'PENDING'
    ];

    return response()->json([
        'message' => 'Test broadcast sent successfully',
        'order' => $testOrder
    ]);
});

// Notification Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::post('/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
});