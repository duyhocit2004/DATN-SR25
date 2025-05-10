<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('location', function (Blueprint $table) {
            $table->boolean('is_default')->default(false)->after('status');
        });
    }

    public function down()
    {
        Schema::table('location', function (Blueprint $table) {
            $table->dropColumn('is_default');
        });
    }
}; 