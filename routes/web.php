<?php

use App\Http\Controllers\Guest\ProductsController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('products', [ProductsController::class, 'index'])->name('products');
Route::get('products/{slug}', [ProductsController::class, 'show'])->name('products.detail');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('product', ProductController::class);
        Route::resource('category-product', ProductCategoryController::class);
    });
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
