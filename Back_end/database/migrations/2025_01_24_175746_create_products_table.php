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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('categories_id')->constrained('categories')->onDelete('cascade');
            $table->string('name_product');
            $table->string('SKU');
            $table->string('image')->nullable();
            $table->unsignedBigInteger('base_stock')->default(0);    // Số lượng tồn kho
            $table->unsignedBigInteger('price_regular');                    // Giá thường
            $table->unsignedBigInteger('price_sale')->nullable();           // Giá sale
            $table->string('description')->nullable();                      // Mô tả
            $table->integer('views')->default(0);                    // Lượt xem
            $table->text('content')->nullable();                            // Nội dung
            $table->timestamps();
            $table->softDeletes();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
