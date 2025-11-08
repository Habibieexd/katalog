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
        Schema::table('products', function (Blueprint $table) {
            // Ubah name menjadi unique (ini otomatis membuat index juga)
            $table->string('name')->unique()->change();

            // Index lainnya
            $table->index('is_active');
            $table->index('price');
            $table->index(['product_category_id', 'is_active']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Rollback: hapus unique constraint dari name
            $table->string('name')->change();

            // Drop index lainnya
            $table->dropIndex(['is_active']);
            $table->dropIndex(['price']);
            $table->dropIndex(['product_category_id', 'is_active']);
            $table->dropIndex(['created_at']);
        });
    }
};
