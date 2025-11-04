<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'category_id' => 1,
                'name' => 'Kopi Arabika Gayo',
                'slug' => Str::slug('Kopi Arabika Gayo'),
                'description' => 'Kopi khas Gayo dengan cita rasa kuat dan aroma khas.',
                'price' => 85000,
                'is_active' => true,
            ],
            [
                'category_id' => 2,
                'name' => 'Teh Hijau Premium',
                'slug' => Str::slug('Teh Hijau Premium'),
                'description' => 'Teh hijau dengan aroma segar dan manfaat kesehatan tinggi.',
                'price' => 45000,
                'is_active' => true,
            ],
            [
                'category_id' => 3,
                'name' => 'Keripik Pisang Manis',
                'slug' => Str::slug('Keripik Pisang Manis'),
                'description' => 'Keripik pisang renyah dengan rasa manis alami.',
                'price' => 25000,
                'is_active' => true,
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
