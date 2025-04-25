<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->boolean('is_refunded')->default(false);
            $table->text('refund_reason')->nullable();
            $table->unsignedBigInteger('refunded_by')->nullable();
            $table->timestamp('refunded_at')->nullable();
            $table->foreign('refunded_by')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropForeign(['refunded_by']);
            $table->dropColumn(['is_refunded', 'refund_reason', 'refunded_by', 'refunded_at']);
        });
    }
}; 