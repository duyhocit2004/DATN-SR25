<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); 
            $table->enum('discount_type', ['percent', 'fixed']); 
            $table->decimal('discount_value', 10, 2); 
            $table->decimal('min_order_value', 10, 2)->nullable();
            $table->decimal('max_discount', 10, 2)->nullable(); 
            $table->integer('quantity')->default(1); 
            $table->integer('used')->default(0); 
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->dateTime('start_date')->nullable()->index(); 
            $table->dateTime('end_date')->nullable()->index(); 
            $table->enum('status', ['active', 'expired', 'used_up', 'disabled'])->default('active'); 
            $table->timestamps();
        });

      
        DB::statement('ALTER TABLE vouchers ADD CONSTRAINT check_dates CHECK (start_date <= end_date)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
