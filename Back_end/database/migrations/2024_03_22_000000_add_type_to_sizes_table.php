Hey, Cortana. Hey, Cortana. No. Hey, Cortana. Hey, Cortana. Hey, Cortana. Nelly, my cousin location. Open alarm. Hey, Cortana. Youtube. Hey, Cortana.<?php
Hey, Cortana. Hey, Cortana. No. Hey, Cortana. Hey Cortana, I'm bored. Hey, Cortana. Hey, Cortana. Play the way. Hey, Cortana. Hey, Cortana. Hey, Cortana. I. Am. Cortana. Hey, Cortana, open. Hey, Cortana. Hey, Cortana. Play. Hey, Cortana. I'm sorry I'm alive. Cortana volume. Down. Hey Cortana, how old is? Hey, Cortana. Hey Cortana, who is well? Hey, Cortana. Hey, Cortana. Hey, Cortana play. Hey, Cortana. Hey, Cortana. Hey Cortana, I see new London points. Oh. Hey, Cortana. Why not? Hey, Cortana. Hey, Cortana. Up. Hey, Cortana. Hey, Cortana. Hey, Cortana. Turn it off. Hey, Cortana. Play. How much? Call my mom, my daughter. Hey, Cortana. Hey, Cortana. Call Matt. Read it. Hey, Cortana. Hey, Cortana. Hey, Cortana. Zoom out. Hi. Hey, Cortana. Hey Cortana, search your time. ICEOMMPING. Hey, Cortana. Hey, Cortana play. My naha my nice how to buy. Yes. Hey, Cortana. Hey, Cortana. Hey, Cortana. 
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
        Schema::table('sizes', function (Blueprint $table) {
            $table->enum('type', ['numeric', 'text'])->default('numeric')->after('size');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sizes', function (Blueprint $table) {
            $table->dropColumn('type');
        });
    }
}; 