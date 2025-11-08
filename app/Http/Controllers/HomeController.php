<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller
{
    //
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');

        // Query products dengan memanfaatkan INDEX
        $query = Product::with([
            'images' => function ($query) {
                $query->select(['id', 'product_id', 'path', 'placeholder'])
                    ->where('is_primary', true) // ambil primary image saja
                    ->limit(1);
            },
            'category:id,name,slug'
        ])
            ->select(['id', 'name', 'slug', 'price', 'description', 'product_category_id', 'is_active', 'created_at'])
            ->where('is_active', true); // ⭐ Memanfaatkan INDEX is_active

        if ($categorySlug && $categorySlug !== 'semua') {
            // Ambil category_id dulu, lalu filter by ID (lebih cepat)
            $category = ProductCategory::where('slug', $categorySlug)->first(['id']);

            if ($category) {
                // ⭐ Memanfaatkan COMPOSITE INDEX (product_category_id, is_active)
                $query->where('product_category_id', $category->id);
            }
        }

        // ⭐ Memanfaatkan INDEX created_at untuk sorting
        $products = $query->orderBy('created_at', 'desc') // terbaru dulu lebih umum
            ->limit(6)
            ->get()
            ->makeHidden(['product_category_id', 'is_active', 'created_at']); // hide field yang tidak perlu di frontend

        // Optimasi categories - hanya ambil yang punya produk aktif
        $categories = ProductCategory::withCount('products')
            ->select(['id', 'name', 'slug'])
            ->get()
            ->sortByDesc('products_count')
            ->take(5)
            ->makeHidden('id')
            ->values();

        return Inertia::render('welcome', compact('products', 'categories'));
    }
}
