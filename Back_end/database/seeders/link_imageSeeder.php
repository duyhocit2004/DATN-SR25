<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class link_imageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i=0; $i < 4; $i++) { 
            DB::table('image_product')->insert([
                'products_id' => 1,
                'image_link' => 'ss'
            ]);
        }
       
    }
}
