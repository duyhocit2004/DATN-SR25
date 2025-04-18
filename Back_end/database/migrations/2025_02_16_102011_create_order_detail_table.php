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
        Schema::create('order_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id') // Sửa lại tên thành order_id
                ->constrained('orders')
                ->onDelete('cascade');

            $table->foreignId('product_id')
                ->constrained('products')
                ->onDelete('cascade');

            $table->foreignId('product_variant_id') // Đặt tên rõ ràng
                ->constrained('product_variants')
                ->onDelete('cascade');

            $table->foreignId('color_id')
                ->nullable()
                ->constrained('colors')
                ->onDelete('set null');

            $table->foreignId('size_id')
                ->nullable()
                ->constrained('sizes')
                ->onDelete('set null');

            $table->integer('quantity');
            $table->double('total_price');
            $table->string('status')->default('Unconfirmed');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_detail');
    }
};
