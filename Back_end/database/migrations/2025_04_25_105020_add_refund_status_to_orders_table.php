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
        Schema::table('orders', function (Blueprint $table) {
            $table->string('refund_status')->nullable()->after('payment_status');
            $table->text('refund_reason')->nullable()->after('refund_status');
            $table->integer('refunded_by')->nullable()->after('refund_reason');
            $table->timestamp('refunded_at')->nullable()->after('refunded_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['refund_status', 'refund_reason', 'refunded_by', 'refunded_at']);
        });
    }
};
