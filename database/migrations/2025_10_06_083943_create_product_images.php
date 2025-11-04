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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade'); // relasi ke product
            $table->string('path'); // path atau URL gambar
            $table->string('blurhash')->nullable(); // kode blurhash
            $table->text('placeholder')->nullable(); // data blur image (base64)
            $table->boolean('is_primary')->default(false); // apakah ini gambar utama
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
