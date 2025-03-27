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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();//mã code
            $table->enum('discount_type', ['percent', 'fixed']); // giảm giá theo phần trăm hoặc cố định
            $table->decimal('discount_value', 10, 2);//
            $table->decimal('min_order_value', 10, 2)->nullable();//Giá trị đơn hàng tối thiểu để áp dụng voucher
            $table->decimal('max_discount', 10, 2)->nullable();// mức giảm dối ta
            $table->integer('quantity')->default(1);// số lượng giá voucher
            $table->integer('used')->default(0);// số lần đã sử dụng
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references(columns: 'id')->on('users')->onDelete('cascade');
            $table->dateTime('start_date')->nullable();// ngày bắt đầu
            $table->dateTime('end_date')->nullable();//ngày kết thúc
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
