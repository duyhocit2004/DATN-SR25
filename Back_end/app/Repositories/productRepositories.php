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
    public function getDataStats(Request $request)
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
                // Use the year from selectedDate, fallback to current year if invalid
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

        $result = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->selectRaw('
                COUNT(*) as total_orders,
                COALESCE(SUM(CASE WHEN payment_status = "PAID" THEN total_price ELSE 0 END), 0) as total_revenue
            ')
            ->first();

        // Count all products created on or before $toDate
        $totalProducts = DB::table('products')
            ->where('created_at', '<=', $toDate)
            ->count();

        // Count all users created on or before $toDate
        $totalUsers = DB::table('users')
            ->where('created_at', '<=', $toDate)
            ->count();
        return [
            'order' => $result->total_orders ?? 0,
            'product' => $totalProducts ?? 0,
            'revenue' => $result->total_revenue ?? 0,
            'user' => $totalUsers ?? 0,
        ];
    }


    public function getDashboardChart(Request $request)
    {
        $filterType = $request->input('time', 'month');
        // Sử dụng ngày từ request nếu có, nếu không thì lấy ngày hiện tại
        $selectedDate = $request->input('date')
            ? Carbon::parse($request->input('date'))->startOfDay()
            : Carbon::today()->startOfDay();

        $listResult = [];

        if ('day' == $filterType) {
            $endOfDay = $selectedDate->copy()->endOfDay();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$selectedDate, $endOfDay])
                ->selectRaw('
                DATE_FORMAT(created_at, "%H:00") as hour,
                COUNT(*) as total_orders,
                SUM(CASE WHEN payment_status = "PAID" THEN total_price ELSE 0 END) as total_revenue
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
            $startDate = Carbon::now()->startOfWeek();
            $endDate = Carbon::now()->endOfWeek();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('
                    DATE_FORMAT(created_at, "%d/%m/%Y") as day,
                    COUNT(*) as total_orders,
                    SUM(CASE WHEN payment_status = "PAID" THEN total_price ELSE 0 END) as total_revenue
                ')
                ->groupBy('day')
                ->orderBy('day', 'asc')
                ->get()
                ->keyBy('day');

            // Danh sách các ngày trong tuần
            $allDays = [];
            $current = $startDate->copy();
            while ($current->lte($endDate)) {
                $allDays[] = $current->format('d/m/Y');
                $current->addDay();
            }

            // Kết quả đầu ra
            $listResult = [];
            foreach ($allDays as $index => $day) {
                if ($result->has($day)) {
                    $listResult[] = [
                        'stt' => $day,
                        'order' => $result[$day]->total_orders,
                        'revenue' => $result[$day]->total_revenue
                    ];
                } else {
                    $listResult[] = [
                        'stt' => $day,
                        'order' => 0,
                        'revenue' => 0
                    ];
                }
            }
        }

        if ('month' == $filterType) {
            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth();


            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('
                    YEARWEEK(created_at, 1) as week,
                    COUNT(*) as total_orders,
                    SUM(CASE WHEN payment_status = "PAID" THEN total_price ELSE 0 END) as total_revenue
                ')
                ->groupBy('week')
                ->orderBy('week', 'asc')
                ->get()
                ->keyBy('week');

            $allWeeks = [];
            $current = $startDate->copy()->startOfWeek();
            while ($current->lte($endDate)) {
                $allWeeks[] = $current->format('oW'); // oW: YEARWEEK (ISO-8601)
                $current->addWeek();
            }

            // Lặp qua tất cả các tuần để đảm bảo tuần nào không có dữ liệu cũng được thêm
            foreach ($allWeeks as $index => $week) {
                if ($result->has($week)) {
                    $listResult[] = [
                        'stt' => $index + 1,
                        'order' => $result[$week]->total_orders,
                        'revenue' => $result[$week]->total_revenue
                    ];
                } else {
                    $listResult[] = [
                        'stt' => $index + 1,
                        'order' => 0,
                        'revenue' => 0
                    ];
                }
            }
        }

        if ('quarter' == $filterType) {
            $startDate = Carbon::now()->firstOfQuarter();
            $endDate = Carbon::now()->lastOfQuarter();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('
                    DATE_FORMAT(created_at, "%Y-%m") as month,
                    COUNT(*) as total_orders,
                    SUM(CASE WHEN payment_status = "PAID" THEN total_price ELSE 0 END) as total_revenue
                ')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get()
                ->keyBy('month');

            // Danh sách các tháng trong quý
            $allMonths = [];
            $current = $startDate->copy();
            while ($current->lte($endDate)) {
                $allMonths[] = $current->format('Y-m');
                $current->addMonth();
            }

            // Kết quả đầu ra
            $listResult = [];
            foreach ($allMonths as $month) {
                $monthNumber = (int) substr($month, 5, 2);
                if ($result->has($month)) {
                    $listResult[] = [
                        'stt' => $monthNumber, // Thứ tự tháng trong quý
                        'order' => $result[$month]->total_orders,
                        'revenue' => $result[$month]->total_revenue
                    ];
                } else {
                    $listResult[] = [
                        'stt' => $monthNumber, // Thứ tự tháng trong quý
                        'order' => 0, // Mặc định nếu không có dữ liệu
                        'revenue' => 0
                    ];
                }
            }

        }

        if ('year' == $filterType) {
            // Lấy năm từ selectedDate, nếu không hợp lệ thì dùng năm hiện tại
            try {
                $year = $selectedDate->year;
            } catch (\Exception $e) {
                $year = Carbon::now()->year;
            }
            $startDate = Carbon::create($year, 1, 1)->startOfDay();
            $endDate = Carbon::create($year, 12, 31)->endOfDay();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('
                    DATE_FORMAT(created_at, "%m") as month,
                    COUNT(*) as total_orders,
                    COALESCE(SUM(CASE WHEN payment_status = "PAID" THEN total_price ELSE 0 END), 0) as total_revenue
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
                    'stt' => (int) $month, // Trả về số tháng (1-12)
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

        $products = $query->paginate($perPage, ['*'], 'page', $page);
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
        $product = Product::with(['image_products', 'sizes', 'colors', 'category'])->find($productId);
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
            ->distinct('products.id')
            ->take($number)
            ->with('image_products')
            ->get();
        return $topDiscountedProducts;
    }

    public function getTopNewestProducts($number)
    {
        $topNewestProducts = Product::orderBy('created_at', 'desc')
            ->distinct('products.id')
            ->take($number)
            ->with('image_products')
            ->get();
        return $topNewestProducts;
    }

    public function getTopBestSellingProducts($number)
    {
        $topBestSellingProducts = Product::select('products.*', DB::raw('SUM(quantity_sold) as quantity_sold'))
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
        $topReleatedProducts = Product::query()->where('categories_id', '=', $categoryId)
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
