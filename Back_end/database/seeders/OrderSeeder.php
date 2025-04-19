<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Order;
use App\Models\Shipper;
use App\Models\Voucher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class OrderSeeder extends Seeder
{
    public function run()
    {
        $users = User::pluck('id')->toArray(); // Lấy danh sách tất cả user_id
        $shippers = Shipper::pluck('id')->toArray();
        $vouchers = Voucher::pluck('id')->toArray();

        for ($i = 1; $i <= 10; $i++) {
            Order::create([
                'slug' => 'order-' . Str::random(6),
                'user_id' => $users[array_rand($users)], // Chọn user ngẫu nhiên
                'order_code' => 'ORD' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'shipping_fee' => rand(10000, 50000),
                'shipper_id' => $shippers ? $shippers[array_rand($shippers)] : null,
                'voucher_id' => $vouchers ? $vouchers[array_rand($vouchers)] : null,
                'date' => now()->subDays(rand(0, 30)), // Ngẫu nhiên trong vòng 30 ngày
                'user_name' => fake()->name(),
                'email' => fake()->safeEmail(),
                'phone_number' => fake()->phoneNumber(),
                'address' => fake()->address(),
                'note' => fake()->optional()->sentence(),
            ]);
        }

        echo "✅ Đã tạo 10 đơn hàng thành công!\n";
    }
}
