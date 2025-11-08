import BlurImage from '@/components/blur-image';
import Fancybox from '@/components/fancybox';
import { DisplayDescription } from '@/components/reusable/display-description';
import RelatedProductsCard from '@/components/reusable/guest/related-products-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import { formatRupiah } from '@/lib/formatRupiah';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Detail({ product, related_products }: any) {
    const [quantity, setQuantity] = useState(1); // 🧩 counter state

    const handleWhatsAppClick = (motifName: string) => {
        const phoneNumber = '62895341975182';
        const message = `Halo, saya tertarik dengan ${motifName}. Saya ingin memesan ${quantity} pcs. Bisakah saya mendapatkan informasi lebih lanjut?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message,
        )}`;
        window.open(whatsappUrl, '_blank');
    };

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <GuestLayout>
            <div className="bg-[#FCFAF3] px-6 py-12 sm:px-6 md:px-8 md:py-24">
                <div className="container mx-auto h-[100%] w-full max-w-5xl">
                    <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:gap-10">
                        <div className="h-full space-y-4">
                            {/* Gambar Utama */}
                            <div
                                className={cn(
                                    'flex h-full w-full items-center justify-center overflow-hidden rounded-md',
                                    !product?.images?.length && 'bg-gray-200',
                                )}
                            >
                                {product?.images.length > 0 ? (
                                    <Fancybox
                                        options={{
                                            Carousel: {
                                                infinite: false,
                                            },
                                        }}
                                    >
                                        {product?.images[selectedImageIndex]
                                            ?.path && (
                                            <Link
                                                data-fancybox="images"
                                                href={`/storage/${product?.images[selectedImageIndex].path}`}
                                            >
                                                <BlurImage
                                                    src={`/storage/${product?.images[selectedImageIndex].path}`}
                                                    alt={
                                                        product?.images[
                                                            selectedImageIndex
                                                        ].path
                                                    }
                                                    placeholder={
                                                        product?.images[
                                                            selectedImageIndex
                                                        ].placeholder
                                                    }
                                                />
                                            </Link>
                                        )}

                                        {product.images
                                            .filter(
                                                (_: any, index: any) =>
                                                    index !==
                                                    selectedImageIndex,
                                            )
                                            .map((image: any) => (
                                                <Link
                                                    key={image.path}
                                                    data-fancybox="images"
                                                    href={`/storage/${image.path}`}
                                                    className="hidden"
                                                >
                                                    <BlurImage
                                                        src={`/storage/${image.path}`}
                                                        alt={image.name}
                                                        placeholder={
                                                            image.placeholder
                                                        }
                                                        className="h-full w-full object-cover transition-transform duration-700"
                                                    />
                                                </Link>
                                            ))}
                                    </Fancybox>
                                ) : (
                                    <span className="font-bold text-gray-500">
                                        1080 x 1920
                                    </span>
                                )}
                            </div>

                            {/* Thumbnail Gambar Lainnya */}
                            {product?.images?.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto p-2">
                                    {product.images.map(
                                        (image: any, index: number) => (
                                            <button
                                                key={image.path}
                                                onClick={() =>
                                                    setSelectedImageIndex(index)
                                                }
                                                className={cn(
                                                    'flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200',
                                                    selectedImageIndex === index
                                                        ? 'border-blue-500 ring-2 ring-blue-200'
                                                        : 'border-gray-200 hover:border-gray-300',
                                                )}
                                            >
                                                <img
                                                    src={`/storage/${image.path}`}
                                                    alt={image.path}
                                                    className="h-16 w-16 object-cover sm:h-20 sm:w-20"
                                                />
                                            </button>
                                        ),
                                    )}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex flex-col gap-4">
                                <Button
                                    size={'sm'}
                                    className="h-fit w-fit rounded-sm bg-[#3e2308] py-1 text-xs text-white hover:bg-[#3e2308]/70"
                                    asChild
                                >
                                    <Link href={'#'}>
                                        {product.category.name}
                                    </Link>
                                </Button>

                                <div>
                                    <p className="mb-4 font-['Playfair_Display'] text-3xl font-semibold text-[#3e2308] sm:text-4xl md:mb-6 md:text-5xl">
                                        {product.name}
                                    </p>
                                    <div className="mb-4 flex flex-col gap-2 md:mb-6">
                                        <Label className="text-[#3e2308]">
                                            Description
                                        </Label>
                                        <p className="leading-relaxed">
                                            <DisplayDescription
                                                description={
                                                    product.description
                                                }
                                            />
                                        </p>
                                    </div>

                                    <div className="mb-4 flex flex-col gap-2">
                                        <Label className="text-[#3e2308]">
                                            Harga
                                        </Label>
                                        <p className="text-xl font-semibold text-[#5A4A3A] sm:text-2xl">
                                            {formatRupiah(product.price)}
                                        </p>
                                    </div>

                                    {/* 🧩 Counter section */}
                                    <div className="mb-4 flex flex-col gap-2 md:mb-6">
                                        <Label className="text-[#3e2308]">
                                            Jumlah
                                        </Label>
                                        <div className="flex w-fit items-center gap-4 border border-primary px-4 py-2">
                                            <Button
                                                variant="outline"
                                                className="border-primary bg-transparent"
                                                onClick={decrement}
                                            >
                                                -
                                            </Button>
                                            <span className="font-medium text-[#5A4A3A]">
                                                {quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                className="border-primary bg-transparent"
                                                onClick={increment}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>

                                    {/* 🧩 WhatsApp button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="inline-flex w-full sm:w-[80%] md:w-full lg:w-[60%]"
                                    >
                                        <Button
                                            onClick={() =>
                                                handleWhatsAppClick(
                                                    product.name,
                                                )
                                            }
                                            className="flex w-full items-center justify-center gap-2 bg-[#153B25] py-5 text-[#FCFAF3] shadow-md transition-all duration-300 hover:bg-[#153B25]/80 hover:shadow-lg"
                                        >
                                            <MessageCircle className="size-5" />
                                            <span>Pesan</span>
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto max-w-7xl py-12 md:py-24">
                    <Card className="rounded-md border-none bg-transparent shadow-none">
                        <CardHeader className="px-0">
                            <CardTitle className="text-lg sm:text-xl">
                                Anda mungkin juga suka
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-6 px-0 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12">
                            <RelatedProductsCard products={related_products} />
                        </CardContent>
                    </Card>
                </div>

                {/* <div className="fixed bottom-0 left-0 z-30 w-full border-t-[0.5px] border-gray-200 bg-[#FCFAF3]/90 px-4 py-3.5 saturate-200 backdrop-blur-xl md:static md:border-none md:bg-[#FCFAF3] md:px-0 md:py-0">
                    <Button
                        onClick={() => handleWhatsAppClick(product.name)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0e2819] py-5 font-bold tracking-widest text-[#FCFAF3] shadow-md transition-all duration-300 hover:bg-[#153B25]/80 hover:shadow-lg"
                    >
                        <span className="text-base">Beli</span>
                    </Button>
                </div> */}
            </div>
        </GuestLayout>
    );
}
