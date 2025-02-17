<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('post', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Tiêu đề
            $table->text('content'); // Nội dung
            $table->string('author'); // Tác giả
            $table->string('image')->nullable(); // Đường dẫn ảnh (nullable)
            $table->date('publish_date')->nullable(); // Ngày đăng
            $table->unsignedInteger('views')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('post');
    }
};
