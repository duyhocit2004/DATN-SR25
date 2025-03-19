<?php

use App\Models\User;
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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
              // Thêm cột guest_id để hỗ trợ khách vãng lai
              $table->string('guest_id')->nullable()->unique();
              // Thêm cột để lưu giỏ hàng (dạng JSON)
              $table->json('cart_items')->nullable();

            $table->foreignIdFor(User::class)->nullable()->constrained()->onDelete('cascade');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
