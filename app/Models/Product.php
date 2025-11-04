<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_category_id',
        'name',
        'slug',
        'description',
        'price',
        'is_active',
    ];

    /**
     * Relasi ke kategori produk
     */
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id');
    }

    /**
     * Relasi ke gambar produk
     */
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
