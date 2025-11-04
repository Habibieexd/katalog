<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    //

    public function index()
    {
        $products = Product::with(['category', 'images'])->orderBy('created_at', 'DESC')->get();
        return Inertia::render('guest/products/index', compact('products'));
    }
    public function show($slug)
    {
        $product = Product::with(['category', 'images'])->where('slug', $slug)->first();

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
