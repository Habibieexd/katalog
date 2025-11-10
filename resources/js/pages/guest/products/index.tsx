import RelatedProductsCard from '@/components/reusable/guest/related-products-card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import { index } from '@/routes/products';
import { router, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index() {
    const { products, categories } = usePage<any>().props;

    const [modalPrice, setModalPrice] = useState(false);
    const [sortBy, setSortBy] = useState('terbaru');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Get current filters from URL
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const category = params.get('category');
        const sort = params.get('sort_by');
        const min = params.get('min_price');
        const max = params.get('max_price');

        if (category) setSelectedCategory(category);
        if (sort) setSortBy(sort);
        if (min) setMinPrice(min);
        if (max) setMaxPrice(max);
    }, []);

    // Filter function
    const applyFilters = (filters: any = {}) => {
        const params: any = {};

        // Preserve existing filters
        if (selectedCategory && !('category' in filters)) {
            params.category = selectedCategory;
        }
        if (sortBy !== 'terbaru' && !('sort_by' in filters)) {
            params.sort_by = sortBy;
        }
        if (minPrice && !('min_price' in filters)) {
            params.min_price = minPrice;
        }
        if (maxPrice && !('max_price' in filters)) {
            params.max_price = maxPrice;
        }

        // Apply new filters
        Object.assign(params, filters);

        // Remove null/undefined values
        Object.keys(params).forEach((key) => {
            if (
                params[key] === null ||
                params[key] === undefined ||
                params[key] === ''
            ) {
                delete params[key];
            }
        });

        router.get(index.url(), params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Handle category selection
    const handleCategorySelect = (categorySlug: string) => {
        const newCategory =
            selectedCategory === categorySlug ? null : categorySlug;
        setSelectedCategory(newCategory);
        applyFilters({ category: newCategory });
    };

    // Handle sort change
    const handleSortChange = (value: string) => {
        setSortBy(value);
        applyFilters({ sort_by: value === 'terbaru' ? null : value });
    };

    // Handle price filter
    const handlePriceFilter = () => {
        applyFilters({
            min_price: minPrice || null,
            max_price: maxPrice || null,
        });
        setModalPrice(false);
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedCategory(null);
        setSortBy('terbaru');
        setMinPrice('');
        setMaxPrice('');
        router.get(
            index.url(),
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    // Check if any filter is active
    const hasActiveFilters =
        selectedCategory || minPrice || maxPrice || sortBy !== 'terbaru';
    const hasVisibleFilters = selectedCategory || minPrice || maxPrice;

    return (
        <GuestLayout>
            <div className="bg-[#FFFEFB] px-6 py-12 sm:px-6 md:px-8 md:py-20">
                <div className="container mx-auto w-full max-w-7xl">
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-12">
                            <h1 className="text-center font-['Poppins'] text-4xl font-bold text-[#3e2308]">
                                Semua koleksi
                            </h1>
                            <div className="flex w-full flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
                                <div className="flex w-full flex-wrap gap-2">
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant={'ghost'}
                                                className={`cursor-pointer rounded-full border ${
                                                    selectedCategory
                                                        ? 'border-[#3e2308] bg-[#3e2308] text-white hover:bg-[#3e2308]/90 hover:text-white'
                                                        : 'border-[#3e2308]'
                                                }`}
                                            >
                                                Kategori
                                                {selectedCategory && ` (1)`}
                                                <ChevronDown />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            side="bottom"
                                            className="min-w-[300px]"
                                            align="start"
                                        >
                                            {categories.map((e: any) => (
                                                <DropdownMenuItem
                                                    key={e.slug}
                                                    className={`cursor-pointer py-2 text-base font-medium ${
                                                        selectedCategory ===
                                                        e.slug
                                                            ? 'bg-[#3e2308]/10'
                                                            : ''
                                                    }`}
                                                    onClick={() =>
                                                        handleCategorySelect(
                                                            e.slug,
                                                        )
                                                    }
                                                >
                                                    {e.name}
                                                    {selectedCategory ===
                                                        e.slug && ' ✓'}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <DropdownMenu
                                        modal={false}
                                        open={modalPrice}
                                        onOpenChange={setModalPrice}
                                    >
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant={'ghost'}
                                                className={`cursor-pointer rounded-full border ${
                                                    minPrice || maxPrice
                                                        ? 'border-[#3e2308] bg-[#3e2308] text-white hover:bg-[#3e2308]/90 hover:text-white'
                                                        : 'border-[#3e2308]'
                                                }`}
                                            >
                                                Harga
                                                <ChevronDown />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            side="bottom"
                                            className="min-w-[300px] space-y-4 p-6"
                                            align="start"
                                        >
                                            <div className="flex space-x-4">
                                                <div className="flex flex-col space-y-2">
                                                    <Label className="text-base">
                                                        Dari
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Rp Min"
                                                        value={minPrice}
                                                        onChange={(e) =>
                                                            setMinPrice(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <Label className="text-base">
                                                        Sampai
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        placeholder="Rp Max"
                                                        value={maxPrice}
                                                        onChange={(e) =>
                                                            setMaxPrice(
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <Button
                                                className="w-full cursor-pointer"
                                                onClick={handlePriceFilter}
                                            >
                                                Terapkan
                                            </Button>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    {hasActiveFilters && (
                                        <Button
                                            variant="ghost"
                                            onClick={resetFilters}
                                            className="cursor-pointer rounded-full border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
                                        >
                                            Reset Filter
                                        </Button>
                                    )}
                                </div>
                                <DropdownMenu modal={false}>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant={'ghost'}
                                            className="cursor-pointer rounded-full border border-[#3e2308]"
                                        >
                                            Urutkan
                                            <ChevronDown />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        side="bottom"
                                        className="min-w-[300px]"
                                        align="end"
                                    >
                                        <DropdownMenuRadioGroup
                                            value={sortBy}
                                            onValueChange={handleSortChange}
                                        >
                                            <DropdownMenuRadioItem
                                                value="terbaru"
                                                className="py-2 text-base font-medium"
                                            >
                                                Terbaru
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value="harga_terendah"
                                                className="py-2 text-base font-medium"
                                            >
                                                Harga: Rendah ke Tinggi
                                            </DropdownMenuRadioItem>
                                            <DropdownMenuRadioItem
                                                value="harga_tertinggi"
                                                className="py-2 text-base font-medium"
                                            >
                                                Harga: Tinggi ke Rendah
                                            </DropdownMenuRadioItem>
                                        </DropdownMenuRadioGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {/* Active filters display */}
                            {hasVisibleFilters && (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-medium text-[#3e2308]">
                                        Filter aktif:
                                    </span>
                                    {selectedCategory && (
                                        <span className="rounded-full bg-[#3e2308] px-3 py-1 text-sm text-white">
                                            {
                                                categories.find(
                                                    (c: any) =>
                                                        c.slug ===
                                                        selectedCategory,
                                                )?.name
                                            }
                                        </span>
                                    )}
                                    {minPrice && (
                                        <span className="rounded-full bg-[#3e2308] px-3 py-1 text-sm text-white">
                                            Min: Rp{' '}
                                            {parseInt(minPrice).toLocaleString(
                                                'id-ID',
                                            )}
                                        </span>
                                    )}
                                    {maxPrice && (
                                        <span className="rounded-full bg-[#3e2308] px-3 py-1 text-sm text-white">
                                            Max: Rp{' '}
                                            {parseInt(maxPrice).toLocaleString(
                                                'id-ID',
                                            )}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6 px-0 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-8">
                            {products.length > 0 ? (
                                <RelatedProductsCard products={products} />
                            ) : (
                                <div className="col-span-full py-12 text-center">
                                    <p className="text-lg text-gray-600">
                                        Tidak ada produk yang ditemukan
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={resetFilters}
                                        className="mt-4"
                                    >
                                        Reset Filter
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
