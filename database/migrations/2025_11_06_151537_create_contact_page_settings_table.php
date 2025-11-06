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
        Schema::create('contact_page_settings', function (Blueprint $table) {
            $table->id();
            $table->string('page_title')->default('Contact');
            $table->string('heading')->default("Let's talk over a cup of coffee!");
            $table->text('description')->default("Ready to elevate your brand with unforgettable experiential events?\n\nWhether you're a brand looking to create a unique brand experience or a creative professional seeking collaboration, we're here to bring your vision to life.");
            $table->string('contact_email')->default('mdshahriar.khan@gmail.com');
            $table->string('form_title')->default('Drop Your Message');
            $table->string('background_image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_page_settings');
    }
};
