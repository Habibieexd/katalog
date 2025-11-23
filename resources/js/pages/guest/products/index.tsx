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
import { Separator } from '@/components/ui/separator';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import GuestLayout from '@/layouts/guest-layout';
import { index } from '@/routes/products';
import { Head, router, usePage } from '@inertiajs/react';
import { ChevronDown, Filter, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index() {
    const { products, categories } = usePage<any>().props;

    const [modalPrice, setModalPrice] = useState(false);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
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
        <>
            <Head title="Semua produk">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <GuestLayout>
                <div className="bg-[#FFFEFB] px-6 py-12 sm:px-6 md:px-8 md:py-20">
                    <div className="container mx-auto w-full max-w-7xl">
                        <div className="flex flex-col gap-y-8">
                            <div className="flex flex-col gap-y-10 md:gap-y-12">
                                <h1 className="text-center font-['Poppins'] text-4xl font-bold text-[#3e2308]">
                                    Semua koleksi
                                </h1>
                                <div className="mobile flex gap-x-6 sm:hidden">
                                    <Label htmlFor="search" className="sr-only">
                                        Cari sesuatu
                                    </Label>
                                    <Input
                                        id="search"
                                        name="search"
                                        placeholder="Cari koleksi songket anda..."
                                        className="border-[#3e2308]"
                                    />
                                    <Sheet
                                        open={isSheetOpen}
                                        onOpenChange={setIsSheetOpen}
                                    >
                                        <SheetTrigger asChild>
                                            <Button
                                                variant={'ghost'}
                                                className="cursor-pointer rounded-full border border-[#3e2308]"
                                            >
                                                <Filter />
                                                Filters
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent
                                            onOpenAutoFocus={(e) =>
                                                e.preventDefault()
                                            }
                                        >
                                            <SheetHeader>
                                                <SheetTitle className="text-xl">
                                                    Filter
                                                </SheetTitle>
                                                <Separator />
                                            </SheetHeader>
                                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                                <div className="grid gap-3">
                                                    <Label className="text-base">
                                                        Price
                                                    </Label>
                                                    <div className="flex gap-x-3">
                                                        <div className="flex flex-col gap-y-2">
                                                            <Label htmlFor="min_price">
                                                                Dari
                                                            </Label>
                                                            <Input
                                                                id="min_price"
                                                                name="min_price"
                                                                type="number"
                                                                className="text-sm"
                                                                placeholder="Rp Min"
                                                                value={minPrice}
                                                                onChange={(e) =>
                                                                    setMinPrice(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-y-2">
                                                            <Label htmlFor="max_price">
                                                                Sampai
                                                            </Label>
                                                            <Input
                                                                id="max_price"
                                                                name="max_price"
                                                                type="number"
                                                                className="text-sm"
                                                                placeholder="Rp Max"
                                                                value={maxPrice}
                                                                onChange={(e) =>
                                                                    setMaxPrice(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        className="w-full cursor-pointer"
                                                        onClick={() => {
                                                            handlePriceFilter();
                                                            setIsSheetOpen(
                                                                false,
                                                            );
                                                        }}
                                                    >
                                                        Terapkan
                                                    </Button>
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label className="text-base">
                                                        Kategori
                                                    </Label>
                                                    {categories.map(
                                                        (e: any) => (
                                                            <Button
                                                                variant={
                                                                    'ghost'
                                                                }
                                                                key={e.slug}
                                                                className={`cursor-pointer justify-start py-2 font-medium text-muted-foreground ${
                                                                    selectedCategory ===
                                                                    e.slug
                                                                        ? 'bg-[#3e2308]/10'
                                                                        : ''
                                                                }`}
                                                                onClick={() => {
                                                                    handleCategorySelect(
                                                                        e.slug,
                                                                    );
                                                                    setIsSheetOpen(
                                                                        false,
                                                                    );
                                                                }}
                                                            >
                                                                {e.name}
                                                            </Button>
                                                        ),
                                                    )}
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label className="text-base">
                                                        Urutkan
                                                    </Label>
                                                    <div className="flex flex-wrap gap-2">
                                                        <Button
                                                            variant={
                                                                sortBy ===
                                                                'terbaru'
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            onClick={() => {
                                                                handleSortChange(
                                                                    'terbaru',
                                                                );
                                                                setIsSheetOpen(
                                                                    false,
                                                                );
                                                            }}
                                                            className="text-sm font-medium"
                                                        >
                                                            Terbaru
                                                        </Button>
                                                        <Button
                                                            variant={
                                                                sortBy ===
                                                                'harga_terendah'
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            onClick={() => {
                                                                handleSortChange(
                                                                    'harga_terendah',
                                                                );
                                                                setIsSheetOpen(
                                                                    false,
                                                                );
                                                            }}
                                                            className="text-sm font-medium"
                                                        >
                                                            Harga: Rendah ke
                                                            Tinggi
                                                        </Button>
                                                        <Button
                                                            variant={
                                                                sortBy ===
                                                                'harga_tertinggi'
                                                                    ? 'default'
                                                                    : 'outline'
                                                            }
                                                            onClick={() => {
                                                                handleSortChange(
                                                                    'harga_tertinggi',
                                                                );
                                                                setIsSheetOpen(
                                                                    false,
                                                                );
                                                            }}
                                                            className="text-sm font-medium"
                                                        >
                                                            Harga: Tinggi ke
                                                            Rendah
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SheetFooter>
                                                {hasActiveFilters && (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            resetFilters();
                                                            setIsSheetOpen(
                                                                false,
                                                            );
                                                        }}
                                                        className="cursor-pointer"
                                                    >
                                                        Reset Filter
                                                    </Button>
                                                )}
                                                <SheetClose asChild>
                                                    <Button>Close</Button>
                                                </SheetClose>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </div>
                                <div className="desktop hidden sm:flex sm:flex-col sm:gap-y-6">
                                    <div className="flex w-full items-center justify-center space-x-6">
                                        <Label
                                            className="sr-only"
                                            htmlFor="search_desktop"
                                        >
                                            Search
                                        </Label>
                                        <Input
                                            id="search_desktop"
                                            name="search_desktop"
                                            className="rounded-full border-[#3e2308]"
                                            placeholder="Cari koleksi songket anda..."
                                        />
                                        <Button>
                                            <Search /> Cari
                                        </Button>
                                    </div>
                                    <div className="flex w-full flex-col gap-y-4 sm:flex-row sm:justify-between sm:gap-y-0">
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
                                                        {selectedCategory &&
                                                            ` (1)`}
                                                        <ChevronDown />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    side="bottom"
                                                    className="min-w-[300px]"
                                                    align="start"
                                                >
                                                    {categories.map(
                                                        (e: any) => (
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
                                                                    e.slug &&
                                                                    ' ✓'}
                                                            </DropdownMenuItem>
                                                        ),
                                                    )}
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
                                                    className="flex min-w-[300px] flex-col gap-y-4 p-6"
                                                    align="start"
                                                >
                                                    <div className="flex gap-x-4">
                                                        <div className="flex flex-col gap-y-2">
                                                            <Label
                                                                className="text-base"
                                                                htmlFor="min_price"
                                                            >
                                                                Dari
                                                            </Label>
                                                            <Input
                                                                id="min_price"
                                                                name="min_price"
                                                                type="number"
                                                                placeholder="Rp Min"
                                                                value={minPrice}
                                                                onChange={(e) =>
                                                                    setMinPrice(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex flex-col gap-y-2">
                                                            <Label
                                                                className="text-base"
                                                                htmlFor="max_price"
                                                            >
                                                                Sampai
                                                            </Label>
                                                            <Input
                                                                id="max_price"
                                                                name="max_price"
                                                                type="number"
                                                                placeholder="Rp Max"
                                                                value={maxPrice}
                                                                onChange={(e) =>
                                                                    setMaxPrice(
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <Button
                                                        className="w-full cursor-pointer"
                                                        onClick={
                                                            handlePriceFilter
                                                        }
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
                                                    onValueChange={
                                                        handleSortChange
                                                    }
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
                                                {parseInt(
                                                    minPrice,
                                                ).toLocaleString('id-ID')}
                                            </span>
                                        )}
                                        {maxPrice && (
                                            <span className="rounded-full bg-[#3e2308] px-3 py-1 text-sm text-white">
                                                Max: Rp{' '}
                                                {parseInt(
                                                    maxPrice,
                                                ).toLocaleString('id-ID')}
                                            </span>
                                        )}

                                        {hasActiveFilters && (
                                            <Button
                                                variant="ghost"
                                                onClick={resetFilters}
                                                className="cursor-pointer rounded-full border border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 sm:hidden"
                                            >
                                                Reset Filter
                                            </Button>
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
        </>
    );
}
