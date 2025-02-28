<?php

namespace Database\Seeders;

use Nette\Utils\Random;
use faker\Factory as faker;
use Illuminate\Support\Arr;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class categoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = faker::create();

        $type = [
            'women',
            'man'
        ];
        $categories = [
            'Form Slim Fit',
            'Regular Fit',
            'Smart Fit',
            'Form Loose Fit'
        ];

        for ($i = 0 ; $i < 5 ; $i++){
            foreach ($categories as $key => $value) {
                    DB::table('categories')->insert([
                        'name' => $value,
                        'type'=>Arr::random($type) // Lấy 1 phần tử ngẫu nhiên  trong mang 
                    ]);
                }
                
            }
        }
        
    }
