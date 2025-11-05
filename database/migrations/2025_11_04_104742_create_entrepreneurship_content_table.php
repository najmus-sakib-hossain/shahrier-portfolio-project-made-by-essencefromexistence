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
        Schema::create('entrepreneurship_content', function (Blueprint $table) {
            $table->id();
            $table->string('type'); // blog, quote, event, innovation
            $table->string('title');
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('author')->nullable();
            $table->date('publish_date')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entrepreneurship_content');
    }
};
