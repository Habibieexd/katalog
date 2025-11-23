<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    //

    public function index(Request $request)
    {
        $query = Product::with(['images' => function ($q) {
            $q->where('is_primary', true);
        }]);

        // Filter by category
        if ($request->filled('category') && $request->category !== 'semua') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        // Filter by price range
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'terbaru');

        switch ($sortBy) {
            case 'harga_terendah':
                $query->orderBy('price', 'ASC');
                break;
            case 'harga_tertinggi':
                $query->orderBy('price', 'DESC');
                break;
            case 'terbaru':
            default:
                $query->orderBy('created_at', 'DESC');
                break;
        }

        $products = $query->get();
        $categories = ProductCategory::select('name', 'slug')->get();

        return Inertia::render('guest/products/index', compact('products', 'categories'));
    }

    public function show($slug)
    {
        $product = Product::with(['category', 'images' => function ($query) {
            $query->orderBy('is_primary', 'desc');
        }])->where('slug', $slug)->first();

        $related_products = Product::with(['category', 'images'])
            ->where('id', '!=', $product->id) // Exclude produk yang sedang dilihat
            ->whereHas('images')
            ->inRandomOrder()
            ->limit(10) // Batasi jumlah produk
            ->get();



        return Inertia::render('guest/products/detail', [
            'product' => $product,
            'related_products' => $related_products
        ]);
    }
}
