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
        Log::info('Category slug: ' . $categorySlug); // Debug

        $query = Product::with(['images', 'category']);

        if ($categorySlug && $categorySlug !== 'semua') {
            $query->whereHas('category', function ($q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        $products = $query->orderBy('created_at', 'ASC')->take(6)->get();
        Log::info('Products count: ' . $products->count()); // Debug

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
