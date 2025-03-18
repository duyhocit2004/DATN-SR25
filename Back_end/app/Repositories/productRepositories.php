<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ProductRepositories
{
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
            $query->where('categories_id', '=', $categories_id);
        }

        if (!empty($name)) {
            $query->where('name', 'like', '%' . $name . '%');
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

    public function getProduct($productId)
    {
        $product = Product::with(['image_products','sizes', 'colors','category'])->find($productId);
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
            BaseResponse::failure(400, '','product.not.found', []);
        }
    }

    public function getProductDetail($productId)
    {
        $products = ProductVariant::with(['product.image_products','product.category', 'product.product_variants'])
            ->join('colors', 'colors.id', '=', 'product_variants.color_id')
            ->join('sizes', 'sizes.id', '=', 'product_variants.size_id')
            ->join('products', 'product_variants.product_id', '=', 'products.id')
            ->where('product_id', '=', $productId)
            ->select('product_variants.*', 'products.*', 'product_variants.id as variantId', 'product_variants.quantity as variantQuantity')
            ->first();
        return $products->product;
    }


    public function getDataStats(Request $request)
    {
        $fromDate= $request->input('fromDate', Carbon::now()->startOfYear());
        $toDate = $request->input('toDate', Carbon::now()->endOfYear());

        $result = DB::table('orders')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->selectRaw('COUNT(*) as total_orders, SUM(total_price) as total_revenue')
            ->first();
        $totalProducts = DB::table('products')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->count();
        $totalUsers = DB::table('users')
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->count();

        return [
            'order' => $result->total_orders,
            'product' => $totalProducts,
            'revenue' => $result->total_revenue,
            'user' => $totalUsers,
        ];
    }

    public function getDashboardChart(Request $request)
    {
        $fromDate= $request->input('fromDate', Carbon::now()->startOfYear());
        $toDate = $request->input('toDate', Carbon::now()->endOfYear());
        $filterType = $request->input('time', 'month');


        $listResult = [];
        if('month'==$filterType){
            $startDate = Carbon::now()->startOfMonth();
            $endDate = Carbon::now()->endOfMonth();


            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('YEARWEEK(created_at, 1) as week, COUNT(*) as total_orders, SUM(total_price) as total_revenue')
                ->groupBy('week')
                ->orderBy('week', 'asc')
                ->get();

            $stt = 1;
            foreach ($result as $week) {
                $listResult[] = [
                    'stt' => $stt,
                    'orders' => $week->total_orders,
                    'revenue' => $week->total_revenue
                ];
                $stt++;
            }
        }

        if('quarter'==$filterType){
            $startDate = Carbon::now()->firstOfQuarter();
            $endDate = Carbon::now()->lastOfQuarter();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total_orders, SUM(total_price) as total_revenue')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get();


            foreach ($result as $month) {
                $monthNumber = (int)substr($month->month, 5, 2);
                $quarter = ceil($monthNumber / 3);
                $listResult[] = [
                    'stt' => $quarter,
                    'orders' => $month->total_orders,
                    'revenue' => $month->total_revenue
                ];
            }
        }

        if('year'==$filterType){
            $startDate = Carbon::now()->startOfYear();
            $endDate = Carbon::now()->endOfYear();

            $result = DB::table('orders')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as total_orders, SUM(total_price) as total_revenue')
                ->groupBy('month')
                ->orderBy('month', 'asc')
                ->get();

            foreach ($result as $month) {
                $listResult[] = [
                    'stt' => substr($month->month, 5, 2),
                    'orders' => $month->total_orders,
                    'revenue' => $month->total_revenue
                ];
            }
        }

        return $listResult;
    }

}
