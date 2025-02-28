<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'phone_number' => '0123456789',
                'password' => Hash::make('password'),
                'user_image' => 'default.png',
                'gender'=>'male',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone_number' => '0987654321',
                'password' => Hash::make('password'),
                'user_image' => 'default.png',
                'gender'=>'male',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
