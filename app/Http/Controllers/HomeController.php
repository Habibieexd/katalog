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

        // Query products - batasi jumlah images
        $query = Product::with([
            'images' => function ($query) {
                $query->select(['id', 'product_id', 'path', 'placeholder'])
                    ->limit(1); // ambil 1 image saja untuk listing
            },
            'category:id,name,slug' // select hanya kolom yang diperlukan
        ])->select(['id', 'name', 'slug', 'price', 'description', 'product_category_id', 'created_at']); // pilih kolom spesifik

        if ($categorySlug && $categorySlug !== 'semua') {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $products = $query->orderBy('created_at', 'ASC')
            ->limit(6) // gunakan limit, bukan take
            ->get();

        // Optimasi categories - sort & limit di database
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
