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
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->json('social_link_settings')->nullable()->after('social_links');
            $table->json('font_settings')->nullable()->after('social_link_settings');
            $table->integer('subtitle_max_length')->default(200)->after('subtitle');
            $table->integer('tagline_max_length')->default(50)->after('tagline');
            $table->integer('description_max_length')->default(150)->after('description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hero_sections', function (Blueprint $table) {
            $table->dropColumn([
                'social_link_settings',
                'font_settings',
                'subtitle_max_length',
                'tagline_max_length',
                'description_max_length'
            ]);
        });
    }
};
