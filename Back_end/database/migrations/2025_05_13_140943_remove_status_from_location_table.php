<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
        Schema::table('location', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
    public function down() {
        Schema::table('location', function (Blueprint $table) {
            $table->string('status')->nullable();
        });
    }
};
