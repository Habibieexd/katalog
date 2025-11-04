import RelatedProductsCard from '@/components/reusable/guest/related-products-card';
import { Button } from '@/components/ui/button';
import GuestLayout from '@/layouts/guest-layout';
import { usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export default function Index() {
    const { products } = usePage().props;
    return (
        <GuestLayout>
            <div className="bg-[#FFFEFB] px-6 py-12 sm:px-6 md:px-8 md:py-20">
                <div className="container mx-auto w-full max-w-7xl">
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col space-y-10">
                            <h1 className="text-center font-['Poppins'] text-4xl font-bold text-[#3e2308]">
                                Semua koleksi
                            </h1>
                            <div className="flex w-full justify-between">
                                <div className="flex w-full space-x-[6px]">
                                    <Button
                                        variant={'outline'}
                                        className="rounded-full border-[#3e2308]"
                                    >
                                        Kategori
                                        <ChevronDown />
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className="rounded-full border-[#3e2308]"
                                    >
                                        Warna
                                        <ChevronDown />
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className="rounded-full border-[#3e2308]"
                                    >
                                        Harga
                                        <ChevronDown />
                                    </Button>
                                </div>
                                <Button
                                    variant={'outline'}
                                    className="rounded-full border-[#3e2308]"
                                >
                                    Urutkan
                                    <ChevronDown />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 px-0 sm:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-8">
                            <RelatedProductsCard products={products} />
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
