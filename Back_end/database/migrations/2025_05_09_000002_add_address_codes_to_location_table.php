<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('location', function (Blueprint $table) {
            $table->string('province_code', 20)->nullable()->after('location_detail');
            $table->string('district_code', 20)->nullable()->after('province_code');
            $table->string('ward_code', 20)->nullable()->after('district_code');
        });
    }
    public function down()
    {
        Schema::table('location', function (Blueprint $table) {
            $table->dropColumn(['province_code', 'district_code', 'ward_code']);
        });
    }
}; 