<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_status_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id'); // ID đơn hàng
            $table->string('old_status')->nullable(); // Trạng thái cũ
            $table->string('new_status'); // Trạng thái mới
            $table->string('name_change'); // Tên người thay đổi
            $table->string('role_change'); // Vai trò người thay đổi
            $table->text('note')->nullable(); // Ghi chú
            $table->timestamp('change_at')->useCurrent(); // Thời gian thay đổi

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_status_histories');
    }
};