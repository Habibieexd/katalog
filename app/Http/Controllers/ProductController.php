<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\ProductImage;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;


class ProductController extends Controller
{
    //
    public function index()
    {
        //get all product from database
        $product = Product::with(['category', 'images'])->get();

        //render with data "product"
        return Inertia::render('product/index', [
            'products' => $product
        ]);
    }

    public function create()
    {
        $categories = ProductCategory::all();
        return Inertia::render('product/create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'product_category_id' => 'nullable|exists:product_categories,id',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'product_category_id' => $validated['product_category_id'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'is_active' => $validated['is_active'],
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');
                $fullPath = storage_path('app/public/' . $path);
                $placeholder = $this->generatePlaceholder($fullPath);

                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $path,
                    'placeholder' => $placeholder,
                    'is_primary' => $index == $request->primary_image_index,
                ]);
            }
        }

        return redirect()->route('admin.product.index')->with('success', 'Produk berhasil ditambahkan');
    }

    public function edit(Product $product)
    {
        $categories = ProductCategory::all();

        // Load relasi images dengan eager loading
        $product->load('images');

        return Inertia::render('product/edit', [
            'categories' => $categories,
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'product_category_id' => 'required|exists:product_categories,id',
            'description' => 'nullable|string',
            'price' => 'required|integer|min:0',
            'is_active' => 'boolean',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'primary_image_index' => 'nullable|integer',
            'deleted_image_ids' => 'nullable|array',
            'deleted_image_ids.*' => 'integer|exists:product_images,id',
        ]);

        // Update data produk
        $product->update([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'product_category_id' => $validated['product_category_id'],
            'description' => $validated['description'] ?? null,
            'price' => $validated['price'],
            'is_active' => $request->boolean('is_active', true),
        ]);

        // Hapus gambar yang diminta
        if ($request->has('deleted_image_ids') && is_array($request->deleted_image_ids)) {
            foreach ($request->deleted_image_ids as $imageId) {
                $image = ProductImage::where('id', $imageId)
                    ->where('product_id', $product->id)
                    ->first();

                if ($image) {
                    // Hapus file dari storage
                    Storage::disk('public')->delete($image->path);
                    // Hapus record dari database
                    $image->delete();
                }
            }
        }

        // Upload gambar baru jika ada
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('products', 'public');
                $fullPath = storage_path('app/public/' . $path);
                $placeholder = $this->generatePlaceholder($fullPath);

                ProductImage::create([
                    'product_id' => $product->id,
                    'path' => $path,
                    'placeholder' => $placeholder,
                    'is_primary' => false,
                ]);
            }
        }

        // Update primary image
        if ($request->filled('primary_image_index')) {
            // Reset semua
            ProductImage::where('product_id', $product->id)
                ->update(['is_primary' => false]);

            // Get all images yang tersisa dan set primary berdasarkan index
            $images = ProductImage::where('product_id', $product->id)
                ->orderBy('id')
                ->get();

            $primaryIndex = (int) $request->primary_image_index;
            if (isset($images[$primaryIndex])) {
                $images[$primaryIndex]->update(['is_primary' => true]);
            }
        }

        return redirect()
            ->route('admin.product.index')
            ->with('success', 'Produk berhasil diperbarui');
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return redirect()
                ->route('admin.product.index')
                ->with('error', 'Produk tidak ditemukan');
        }

        $images = ProductImage::where('product_id', $product->id)->get();
        foreach ($images as $image) {
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
            $image->delete();
        }

        $product->delete();

        return redirect()
            ->route('admin.product.index')
            ->with('success', 'Produk berhasil dihapus');
    }

    public static function generatePlaceholder(string $imagePath): ?string
    {
        try {
            // Deteksi tipe image
            $imageType = exif_imagetype($imagePath);

            switch ($imageType) {
                case IMAGETYPE_JPEG:
                    $source = imagecreatefromjpeg($imagePath);
                    break;
                case IMAGETYPE_PNG:
                    $source = imagecreatefrompng($imagePath);
                    break;
                case IMAGETYPE_GIF:
                    $source = imagecreatefromgif($imagePath);
                    break;
                default:
                    return null;
            }

            // Resize ke 20x20
            $thumb = imagecreatetruecolor(20, 20);
            imagecopyresampled(
                $thumb,
                $source,
                0,
                0,
                0,
                0,
                20,
                20,
                imagesx($source),
                imagesy($source)
            );

            // Apply blur
            for ($i = 0; $i < 5; $i++) {
                imagefilter($thumb, IMG_FILTER_GAUSSIAN_BLUR);
            }

            // Convert to base64
            ob_start();
            imagejpeg($thumb, null, 50);
            $imageData = ob_get_clean();

            imagedestroy($source);
            imagedestroy($thumb);

            return 'data:image/jpeg;base64,' . base64_encode($imageData);
        } catch (\Exception $e) {
            Log::error('Placeholder generation failed: ' . $e->getMessage());
            return null;
        }
    }
}
