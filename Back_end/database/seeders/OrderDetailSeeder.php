<?php

namespace Database\Seeders;

use App\Models\Product;

use App\Models\ProductVariants;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\OrderDetail;
use App\Models\Color;
use App\Models\Size;

class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::pluck('id')->toArray();
        $products = Product::pluck('id')->toArray();

        $variants = ProductVariants::pluck('id')->toArray();

        $colors = Color::pluck('id')->toArray(); // Lấy danh sách ID của bảng colors
        $sizes = Size::pluck('id')->toArray(); // Lấy danh sách ID của bảng sizes

        if (empty($orders) || empty($products) || empty($variants) || empty($colors) || empty($sizes)) {
            echo "⚠️ Không có đủ dữ liệu trong bảng orders, products, product_variants, colors hoặc sizes!\n";
            return;
        }

        foreach ($orders as $orderId) {
            for ($i = 0; $i < rand(1, 5); $i++) {
                $quantity = rand(1, 10);
                $productId = $products[array_rand($products)];
                $variantId = $variants[array_rand($variants)];
                $colorId = $colors[array_rand($colors)]; // Lấy ID của màu
                $sizeId = $sizes[array_rand($sizes)]; // Lấy ID của kích thước

                OrderDetail::create([
                    'order_id' => $orderId,
                    'product_id' => $productId,
                    'product_variant_id' => $variantId,
                    'color_id' => $colorId, // Sửa thành color_id
                    'size_id' => $sizeId, // Sửa thành size_id
                    'quantity' => $quantity,
                    'total_price' => $quantity * rand(50000, 200000),
                    'status' => 'pending',
                ]);
            }
        }

        echo "✅ Đã seed dữ liệu cho bảng order_details!\n";
    }
}
