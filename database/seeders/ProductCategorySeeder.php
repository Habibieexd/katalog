<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;
use Illuminate\Support\Str;

class ProductCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Kopi',
                'slug' => Str::slug('Kopi'),
                'description' => 'Berbagai jenis kopi pilihan terbaik.',
            ],
            [
                'name' => 'Teh',
                'slug' => Str::slug('Teh'),
                'description' => 'Aneka teh hijau dan teh hitam berkualitas.',
            ],
            [
                'name' => 'Snack',
                'slug' => Str::slug('Snack'),
                'description' => 'Camilan ringan untuk menemani waktu santai.',
            ],
        ];

        foreach ($categories as $category) {
            ProductCategory::create($category);
        }
    }
}
