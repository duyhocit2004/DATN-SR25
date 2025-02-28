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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email',255)->unique();
            $table->string('phone_number', 10)->nullable();
            $table->enum('role',['Khách hàng', 'Quản lý'])->default('Khách hàng');
            $table->timestamp('email_verified_at')->nullable();
            $table->string('gender')->nullable();
            $table->text('user_image')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
