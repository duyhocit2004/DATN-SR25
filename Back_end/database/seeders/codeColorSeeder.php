<?php

namespace Database\Seeders;

use App\Models\colorModel;
use App\Models\codecolorsModel;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class codeColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('code_colors')->truncate(); // Xóa toàn bộ dữ liệu trước khi thêm
        $colors = [
        '#FF0000',
        '#0000FF',
        '#008000',
        '#FFFF00',
        '#000000',
        '#FFFFFF',
    ];

    $index1 = [1, 2, 3, 4, 5, 6];

    foreach ($colors as $key => $as) {
        DB::table('code_colors')->insert([
            'colors_id' => $index1[$key], // Lấy giá trị từ $index1 dựa trên chỉ mục
            'CodeColor' => $as,
        ]);
    }
    }
}
