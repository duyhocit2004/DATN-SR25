<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ProductRepositories
{
    public function getDataStats(Request $request   )
    {
        $filterType = $request->input('time', 'year');
        $selectedDate = $request->input('date')
            ? Carbon::parse($request->input('date'))->startOfDay()
            : Carbon::today()->startOfDay();
        $fromDate = null;
        $toDate = null;
        switch ($filterType) {
            case 'day':
                $fromDate = $selectedDate;
                $toDate = $selectedDate->copy()->endOfDay();
                break;
            case 'week':
                $fromDate = Carbon::now()->startOfWeek();
                $toDate = Carbon::now()->endOfWeek();
                break;
            case 'month':
                $fromDate = Carbon::now()->startOfMonth();
                $toDate = Carbon::now()->endOfMonth();
                break;
            case 'quarter':
                $fromDate = Carbon::now()->firstOfQuarter();
                $toDate = Carbon::now()->lastOfQuarter();
                break;
            case 'year':
                try {
                    $year = $selectedDate->year;
                } catch (\Exception $e) {
                    $year = Carbon::now()->year;
                }
                $fromDate = Carbon::create($year, 1, 1)->startOfDay();
                $toDate = Carbon::create($year, 12, 31)->endOfDay();
                break;
            default:
                $fromDate = Carbon::now()->startOfYear();
                $toDate = Carbon::now()->endOfYear();
                break;
        }

        // Lấy tổng số đơn hàng và doanh thu
        $orderStats = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->selectRaw('COUNT(*) as total_orders')
            ->first();

        // Đếm số đơn hàng chưa xác nhận
        $unconfirmedOrders = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->where('status', 'Unconfirmed')
            ->count();

        // Đếm số đơn hàng đã xác nhận
        $confirmedOrders = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->where('status', 'Confirmed')
            ->count();

        // Đếm số đơn hàng đã hủy
        $cancelledOrders = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->whereIn('status', ['Cancel', 'Cancel Confirm'])
            ->count();

        // Tính tổng doanh thu từ đơn hàng đã giao và đã thanh toán
        $revenue = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->where('status', 'Delivered')
            ->where('payment_status', 'PAID')
            ->sum('total_price');

        // Đếm tổng số sản phẩm
        $totalProducts = DB::table('products')
            ->where('created_at', '<=', $toDate)

            ->count();

        // Đếm tổng số người dùng
        $totalUsers = DB::table('users')
            ->whereBetween('created_at', [$fromDate,$toDate])
            ->count();

        // count all failOrder
        $Delivered = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->where('payment_status', '=', 'PAID')
            ->where('status', '=', 'Delivered')
            ->count();

        // Debug log
        \Log::info('Order Stats:', [
            'total_orders' => $orderStats->total_orders,
            'unconfirmed' => $unconfirmedOrders,
            'confirmed' => $confirmedOrders,
            'cancelled' => $cancelledOrders,
            'revenue' => $revenue,
            'fromDate' => $fromDate,
            'toDate' => $toDate
        ]);

        return [
            'order' => $orderStats->total_orders ?? 0,
            'unconfirmed_orders' => $unconfirmedOrders ?? 0,
            'confirmed_orders' => $confirmedOrders ?? 0,
            'cancelled_orders' => $cancelledOrders ?? 0,
            'product' => $totalProducts ?? 0,
            'revenue' => $revenue ?? 0,
            'user' => $totalUsers ?? 0,
            'delivered_orders' => $Delivered ?? 0
        ];
    }


    public function getDashboardChart(Request $request)
    {
        $filterType = $request->input('time', 'month');
        $startDate = $request->input('startDate') 
            ? Carbon::createFromFormat('d/m/Y', $request->input('startDate'))->startOfDay()
            : null;
        $endDate = $request->input('endDate')
            ? Carbon::createFromFormat('d/m/Y', $request->input('endDate'))->endOfDay()
            : null;

        $listResult = [];

        if ('day' == $filterType) {
            if (!$startDate || !$endDate) {
                $startDate = Carbon::today()->startOfDay();
                $endDate = Carbon::today()->endOfDay();
            }

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('payment_status', '=', 'PAID')
                ->where('status', '=', 'Delivered')
                ->selectRaw('
                    DATE_FORMAT(created_at, "%H:00") as hour,
                    COUNT(*) as total_orders,
                    COALESCE(SUM(total_price), 0) as total_revenue
                ')
                ->groupBy('hour')
                ->orderBy('hour', 'asc')
                ->get()
                ->keyBy('hour');

            $allHours = [];
            for ($i = 0; $i < 24; $i++) {
                $allHours[] = sprintf("%02d:00", $i);
            }

            foreach ($allHours as $hour) {
                $listResult[] = [
                    'stt' => $hour,
                    'order' => $result->has($hour) ? $result[$hour]->total_orders : 0,
                    'revenue' => $result->has($hour) ? $result[$hour]->total_revenue : 0
                ];
            }
        }
        if ('week' == $filterType) {
            if (!$startDate || !$endDate) {
                $startDate = Carbon::now()->startOfWeek();
                $endDate = Carbon::now()->endOfWeek();
            }

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('payment_status', '=', 'PAID')
                ->where('status', '=', 'Delivered')
                ->selectRaw('
                    DATE_FORMAT(created_at, "%d/%m/%Y") as day,
                    COUNT(*) as total_orders,
                    COALESCE(SUM(total_price), 0) as total_revenue
                ')
                ->groupBy('day')
                ->orderBy('day', 'asc')
                ->get()
                ->keyBy('day');

            $allDays = [];
            $current = $startDate->copy();
            while ($current->lte($endDate)) {
                $allDays[] = $current->format('d/m/Y');
                $current->addDay();
            }

            foreach ($allDays as $day) {
                $listResult[] = [
                    'stt' => $day,
                    'order' => $result->has($day) ? $result[$day]->total_orders : 0,
                    'revenue' => $result->has($day) ? $result[$day]->total_revenue : 0
                ];
            }
        }

        if ('month' == $filterType) {
            if (!$startDate || !$endDate) {
                $startDate = Carbon::now()->startOfMonth();
                $endDate = Carbon::now()->endOfMonth();
            }

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('payment_status', '=', 'PAID')
                ->where('status', '=', 'Delivered')
                ->selectRaw('
                    YEARWEEK(created_at, 1) as week,
                    COUNT(*) as total_orders,
                    COALESCE(SUM(total_price), 0) as total_revenue
                ')
                ->groupBy('week')
                ->orderBy('week', 'asc')
                ->get()
                ->keyBy('week');

            $allWeeks = [];
            $current = $startDate->copy()->startOfWeek();
            while ($current->lte($endDate)) {
                $allWeeks[] = $current->format('oW');
                $current->addWeek();
            }

            foreach ($allWeeks as $index => $week) {
                $listResult[] = [
                    'stt' => $index + 1,
                    'order' => $result->has($week) ? $result[$week]->total_orders : 0,
                    'revenue' => $result->has($week) ? $result[$week]->total_revenue : 0
                ];
            }
        }

        if ('quarter' == $filterType) {
            if (!$startDate || !$endDate) {
                $startDate = Carbon::now()->firstOfQuarter();
                $endDate = Carbon::now()->lastOfQuarter();
            }

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('payment_status', '=', 'PAID')
                ->where('status', '=', 'Delivered')
                ->selectRaw('
                    DATE_FORMAT(created_at, "%Y-%m") as month,
                    COUNT(*) as total_orders,
                    COALESCE(SUM(total_price), 0) as total_revenue
                ')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get()
                ->keyBy('month');

            $allMonths = [];
            $current = $startDate->copy();
            while ($current->lte($endDate)) {
                $allMonths[] = $current->format('Y-m');
                $current->addMonth();
            }

            foreach ($allMonths as $month) {
                $monthNumber = (int) substr($month, 5, 2);
                $listResult[] = [
                    'stt' => $monthNumber,
                    'order' => $result->has($month) ? $result[$month]->total_orders : 0,
                    'revenue' => $result->has($month) ? $result[$month]->total_revenue : 0
                ];
            }
        }

        if ('year' == $filterType) {
            if (!$startDate || !$endDate) {
                $startDate = Carbon::now()->startOfYear();
                $endDate = Carbon::now()->endOfYear();
            }

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('payment_status', '=', 'PAID')
                ->where('status', '=', 'Delivered')
                ->selectRaw('
                    DATE_FORMAT(created_at, "%m") as month,
                    COUNT(*) as total_orders,
                    COALESCE(SUM(total_price), 0) as total_revenue
                ')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get()
                ->keyBy('month');

            $allMonths = [];
            for ($month = 1; $month <= 12; $month++) {
                $allMonths[] = sprintf("%02d", $month);
            }

            foreach ($allMonths as $month) {
                $listResult[] = [
                    'stt' => (int) $month,
                    'order' => $result->has($month) ? $result[$month]->total_orders : 0,
                    'revenue' => $result->has($month) ? $result[$month]->total_revenue : 0
                ];
            }
        }

        return $listResult;
    }

    public function getAllProductWithImages(Request $request)
    {
        $perPage = $request->input('pageSize', 10);
        $page = $request->input('pageNum', 1);
        $categories_id = $request->input('categoriesId', null);
        $name = $request->input('name', null);
        $fromPrice = $request->input('fromPrice', null);
        $toPrice = $request->input('toPrice', null);
        $sortType = $request->input('sortType', null);

        $query = Product::with(['category']);
        if (!empty($categories_id)) {
            $categoryIds = Category::where('id', $categories_id) // Tìm parent category
                ->orWhere('parent_id', $categories_id) // Lấy tất cả child categories
                ->pluck('id') // Chỉ lấy ID
                ->toArray();

            // Lọc sản phẩm theo danh sách categories ID
            $query->whereIn('categories_id', $categoryIds);
        }

        // if (!empty($name)) {
        //     $query->where('name', 'like', '%' . $name . '%');
        // }
        if (!empty($name)) {
            $query->whereRaw("BINARY name LIKE ?", ['%' . $name . '%']);
        }

        if (!empty($fromPrice)) {
            $query->where(function ($query) use ($fromPrice) {
                $query->where('price_sale', '>', $fromPrice)
                    ->orWhere(function ($query) use ($fromPrice) {
                        $query->whereNull('price_sale')
                            ->where('price_regular', '>', $fromPrice);
                    });
            });
        }

        if (!empty($toPrice)) {
            $query->where(function ($query) use ($toPrice) {
                $query->where('price_sale', '<', $toPrice)
                    ->orWhere(function ($query) use ($toPrice) {
                        $query->whereNull('price_sale')
                            ->where('price_regular', '<', $toPrice);
                    });
            });
        }

        if (!empty($sortType)) {
            $query->orderByRaw('IFNULL(price_sale, price_regular) ' . $sortType);
        }

        // Only show products with quantity greater than 0
        $query->where('quantity', '>', 0);

        $products = $query->orderby('created_at','desc')->paginate($perPage, ['*'], 'page', $page);
        return $products;
    }

    public function getWishListStorage($productIds)
    {
        $listProduct = collect();

        if (!empty($productIds)) {
            $listProduct = Product::with(['category'])->whereIn('id', $productIds)->get();
        }

        return $listProduct;
    }

    public function getProduct($productId)
    {
        \Log::info('Repository - Looking for product:', ['productId' => $productId]);
        $product = Product::with(['image_products', 'sizes', 'colors', 'category'])->find($productId);
        \Log::info('Repository - Found product:', ['product' => $product]);
        
        if ($product) {
            $product->sizes = $product->sizes->unique('size')->pluck('size');
            $product->colors = $product->colors->unique('code')->pluck('code');
            return [
                'id' => $product->id,
                'categoriesId' => $product->categories_id,
                'categoriesName' => $product->category ? $product->category->name : null,
                'name' => $product->name,
                "image" => $product->image,
                'listImage' => $product->image_products->isEmpty() ? [] : $product->image_products->pluck('image_link'),
                'priceRegular' => $product->price_regular,
                'priceSale' => $product->price_sale,
                'description' => $product->description,
                'views' => $product->views,
                'content' => $product->content,
                'rate' => $product->rate,
                'quantity' => $product->quantity,
                'quantitySold' => $product->quantity_sold,
                'discount' => $product->discount,
                'createdAt' => $product->created_at,
                'updatedAt' => $product->updated_at,
                'deletedAt' => $product->deleted_at,
                'listSizes' => $product->sizes,
                'listColors' => $product->colors
            ];
        } else {
            BaseResponse::failure(400, '', 'product.not.found', []);
        }
    }

    public function getProductDetail($productId)
    {
        $products = ProductVariant::with(['product.image_products', 'product.category', 'product.product_variants'])
            ->join('colors', 'colors.id', '=', 'product_variants.color_id')
            ->join('sizes', 'sizes.id', '=', 'product_variants.size_id')
            ->join('products', 'product_variants.product_id', '=', 'products.id')
            ->where('product_id', '=', $productId)
            ->select('product_variants.*', 'products.*', 'product_variants.id as variantId', 'product_variants.quantity as variantQuantity')
            ->first();
        return $products->product;
    }

    public function getTopDiscountedProducts($number)
    {
        $topDiscountedProducts = Product::orderBy('discount', 'desc')
            ->where('quantity', '>', 0)
            ->distinct('products.id')
            ->take($number)
            ->with('image_products')
            ->get();
        return $topDiscountedProducts;
    }

    public function getTopNewestProducts($number)
    {
        $topNewestProducts = Product::orderBy('created_at', 'desc')
            ->where('quantity', '>', 0)
            ->distinct('products.id')
            ->take($number)
            ->with('image_products')
            ->get();
        return $topNewestProducts;
    }

    public function getTopBestSellingProducts($number)
    {
        $topBestSellingProducts = Product::select('products.*', DB::raw('SUM(quantity_sold) as quantity_sold'))
            ->where('quantity', '>', 0)
            ->groupBy('products.id')
            ->orderByDesc('quantity_sold')
            ->distinct('products.id')
            ->take($number)
            ->with('image_products')
            ->get();

        return $topBestSellingProducts;
    }

    public function getRelatedProducts($number, $categoryId)
    {
        $topReleatedProducts = Product::query()
            ->where('categories_id', '=', $categoryId)
            ->where('quantity', '>', 0)
            ->groupBy('products.id')
            ->distinct('products.id')
            ->take($number)
            ->with('image_products')
            ->get();

        return $topReleatedProducts;
    }

    public function deleteProduct(Request $request)
    {
        $product = Product::find($request->input('id'));

        if (!$product) {
            BaseResponse::failure('400', 'product not found', 'product.not.found', []);
        }

        //khi xoá category các bảng sau sẽ bị xoá theo
        //product_variants;
        //image_product;
        //wishlist;
        //carts;
        //comment;
        $product->delete();

        return $product;
    }

}
