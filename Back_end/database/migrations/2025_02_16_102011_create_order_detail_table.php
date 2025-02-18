<?php

use App\Models\ProductVariants;
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
            $table->foreignId('Order_id')
                ->constrained('orders')
                ->onDelete('cascade'); // Tự động xóa khi Order bị xóa

            $table->foreignId('product_id')
                ->constrained('products')
                ->onDelete('cascade'); // Tự động xóa khi Product bị xóa

            $table->foreignIdFor(ProductVariants::class)
                ->constrained()
                ->onDelete('cascade'); // Tự động xóa khi ProductVariant bị xóa

            $table->string('color')->nullable(); // Nullable để linh hoạt hơn
            $table->string('size')->nullable();  // Nullable để linh hoạt hơn
            
            $table->integer('quantity');
            $table->double('total_price');
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
