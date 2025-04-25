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
        Schema::table('order_status_histories', function (Blueprint $table) {
            // Modify updated_by to be nullable
            if (Schema::hasColumn('order_status_histories', 'updated_by')) {
                $table->unsignedBigInteger('updated_by')->nullable()->change();
            }
            
            // Add new columns if they don't exist
            if (!Schema::hasColumn('order_status_histories', 'name_change')) {
                $table->string('name_change')->nullable();
            }
            if (!Schema::hasColumn('order_status_histories', 'role_change')) {
                $table->string('role_change')->nullable();
            }
            if (!Schema::hasColumn('order_status_histories', 'note')) {
                $table->text('note')->nullable();
            }
            if (!Schema::hasColumn('order_status_histories', 'change_at')) {
                $table->timestamp('change_at')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_status_histories', function (Blueprint $table) {
            $table->dropColumn(['name_change', 'role_change', 'note', 'change_at']);
            $table->unsignedBigInteger('updated_by')->nullable(false)->change();
        });
    }
}; 