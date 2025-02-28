<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;

class ColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = [
            'red',
            'blue',
            'green',
            'yellow',
            'black' ,
            'white',
        ];
        // $faker = Faker::create();
        foreach ($colors as $as){
            DB::table('colors')->insert(
                [
                    'name'=>$as
                ],
            );
        }
        
    }
}
