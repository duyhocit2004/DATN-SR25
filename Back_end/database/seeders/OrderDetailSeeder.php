<?php

namespace Database\Seeders;

use App\Models\products;
use App\Models\ProductVariants;
use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\OrderDetail;

class OrderDetailSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::pluck('id')->toArray();
        $products = products::pluck('id')->toArray();
        $variants = ProductVariants::pluck('id')->toArray();
        $colors = ['Red', 'Blue', 'Green', 'Black', 'White'];
        $sizes = ['S', 'M', 'L', 'XL', 'XXL'];

        foreach ($orders as $orderId) {
            for ($i = 0; $i < rand(1, 5); $i++) { // Mỗi đơn hàng có 1-5 sản phẩm
                $quantity = rand(1, 10);
                $productId = $products[array_rand($products)];
                $variantId = $variants[array_rand($variants)];

                OrderDetail::create([
                    'order_id' => $orderId,
                    'product_id' => $productId,
                    'product_variant_id' => $variantId,
                    'color' => $colors[array_rand($colors)],
                    'size' => $sizes[array_rand($sizes)],
                    'quantity' => $quantity,
                    'total_price' => $quantity * rand(50000, 200000), // Giá giả định
                ]);
            }
        }

        echo "✅ Đã tạo dữ liệu cho bảng order_detail!\n";
    }
}
