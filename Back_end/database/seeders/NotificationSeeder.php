<?php

namespace Database\Seeders;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        // Get all users
        $users = User::all();

        foreach ($users as $user) {
            // Create sample notifications for each user
            Notification::create([
                'user_id' => $user->id,
                'title' => 'Welcome to our store!',
                'content' => 'Thank you for joining our store. We hope you enjoy shopping with us!',
                'status' => 'unread',
            ]);

            Notification::create([
                'user_id' => $user->id,
                'title' => 'New products available',
                'content' => 'Check out our latest collection of products. Limited time offer!',
                'status' => 'unread',
            ]);

            Notification::create([
                'user_id' => $user->id,
                'title' => 'Special Discount',
                'content' => 'Get 20% off on your next purchase. Use code: WELCOME20',
                'status' => 'unread',
            ]);
        }
    }
} 