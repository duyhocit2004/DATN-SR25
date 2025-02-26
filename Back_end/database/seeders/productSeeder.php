<?php

namespace Database\Seeders;

use Illuminate\Support\Arr;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class productSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            'áo dài tay',
            'áo khoác bommer',
            'áo ngắn cổ'
        ];
        DB::table('products')->insert([
            'categories_id' => 1,
            'name_product' => Arr::random($list),
            'SKU' => "KS@@",
            'base_stock' => 200,
            'price_regular' => 221324,
            'price_sale' => 212000,
            'description' => "áo chất lượng cao",
            'views' => 20,
            'content' => "ádsds",
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
