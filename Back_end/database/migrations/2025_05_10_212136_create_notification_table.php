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
        Schema::create('notification', function (Blueprint $table) {
           $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->string('recipient_type')->default('user'); // 'user' hoặc 'admin'
            $table->string('message')->nullable();
            $table->string('title');
            $table->boolean('is_read')->default(false);
            $table->timestamps();

            //khóa ngoại
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notification');
    }
};
