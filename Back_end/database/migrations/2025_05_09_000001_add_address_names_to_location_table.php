<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('location', function (Blueprint $table) {
            $table->string('province_name', 100)->nullable()->after('province_code');
            $table->string('district_name', 100)->nullable()->after('district_code');
            $table->string('ward_name', 100)->nullable()->after('ward_code');
        });
    }
    public function down()
    {
        Schema::table('location', function (Blueprint $table) {
            $table->dropColumn(['province_name', 'district_name', 'ward_name']);
        });
    }
}; 