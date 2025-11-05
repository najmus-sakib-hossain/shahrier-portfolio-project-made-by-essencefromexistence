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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author')->nullable();
            $table->string('cover_image')->nullable();
            $table->text('description')->nullable();
            $table->text('summary')->nullable();
            $table->text('highlights')->nullable();
            $table->text('review')->nullable();
            $table->integer('rating')->default(0);
            $table->string('isbn')->nullable();
            $table->date('read_date')->nullable();
            $table->boolean('is_recommended')->default(false);
            $table->integer('order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
