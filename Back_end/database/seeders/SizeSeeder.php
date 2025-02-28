<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $size = [
            'S',
            'M',
            'L',
            'XL',
            'XXL',
            '2XL',
        ];
        $faker = Faker::create();
        foreach ($size as $key => $value) {
            DB::table('sizes')->insert( [
                'name'=>$value
            ],
        );
        }
       
    }
}
