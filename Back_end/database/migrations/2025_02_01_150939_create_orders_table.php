<?php

use App\Models\User;
use App\Models\Shipper;
use App\Models\Voucher;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->nullable()->unique();
            $table->foreignIdFor(User::class)->nullable()->constrained()->onDelete('cascade');
            $table->string('order_code');
            $table->double('shipping_fee')->nullable(); //phí vận chuyển
            $table->foreignId('shipper_id')->constrained('shippers')->nullable()->onDelete('cascade');
            $table->foreignIdFor(Voucher::class)->nullable()->constrained()->onDelete('cascade');
            $table->dateTime('date');
            $table->string('user_name');
            $table->string('email');
            $table->string('phone_number');
            $table->string('address', 255);
            $table->string('note', 255)->nullable();
            $table->string('status_id')->constrained('status_orders')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
