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
        Schema::table('videos', function (Blueprint $table) {
            // Add publish_date column if it doesn't exist
            if (!Schema::hasColumn('videos', 'publish_date')) {
                $table->date('publish_date')->nullable()->after('is_short');
            }
            // Add order column if it doesn't exist
            if (!Schema::hasColumn('videos', 'order')) {
                $table->integer('order')->default(0)->after('publish_date');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('videos', function (Blueprint $table) {
            $table->dropColumn(['publish_date', 'order']);
        });
    }
};
