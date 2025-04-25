<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Size;

class UpdateSizesToTextSeeder extends Seeder
{
    public function run()
    {
        // Cập nhật tất cả size hiện có thành text
        Size::query()->update(['type' => 'text']);
    }
} 