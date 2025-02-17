<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('posts')->insert([
            [
                'title' => 'Tiêu đề 1',
                'content' => 'Nội dung của bài viết 1.',
                'author' => 'Tác giả 1',
                'image' => 'path/to/image1.jpg',
                'publish_date' => '2025-02-16',
            ],
            [
                'title' => 'Tiêu đề 2',
                'content' => 'Nội dung của bài viết 2.',
                'author' => 'Tác giả 2',
                'image' => 'path/to/image2.jpg',
                'publish_date' => '2025-02-17',
            ],
            // Thêm nhiều bài viết nếu cần
        ]);
    }
}
