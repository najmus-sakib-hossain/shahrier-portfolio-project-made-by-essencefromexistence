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
        Schema::create('index_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('title_text')->default('SHAHRIAR');
            $table->string('hero_image');
            $table->string('button_text')->default('Play Now');
            $table->string('button_link')->default('/home');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('index_page_logos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('index_page_setting_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('logo_path');
            $table->integer('display_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('index_page_logos');
        Schema::dropIfExists('index_page_settings');
    }
};
