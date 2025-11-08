import { formatRupiah } from '@/lib/formatRupiah';
import { detail } from '@/routes/products';
import { Link, router } from '@inertiajs/react';
import { MoveRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import BlurImage from '../blur-image';
import { DisplayDescription } from '../reusable/display-description';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function Gallery({ products, categories, currentCategory }: any) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [hoveredId, setHoveredId] = useState<number | null>(null);
    const isNavigating = useRef(false);

    const handleWhatsAppClick = (motifName: string) => {
        const phoneNumber = '62895341975182';
        const message = `Halo, saya tertarik dengan ${motifName}. Bisakah saya mendapatkan informasi lebih lanjut?`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleTabChange = (value: string) => {
        if (isNavigating.current) return;

        isNavigating.current = true;

        router.get(
            '/',
            { category: value },
            {
                preserveScroll: true,
                replace: true,
                onFinish: () => {
                    isNavigating.current = false;
                },
            },
        );
    };

    return (
        <section id="galeri" ref={ref} className="bg-[#fffefb] px-6 py-24">
            <div className="mx-auto max-w-7xl space-y-16">
                <div className="text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-4 font-bold text-[#dc7202]"
                    >
                        Galeri Songket
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="mb-4 font-['Playfair_Display'] text-[clamp(2rem,4vw,3rem)] leading-[1.3] font-semibold text-[#3E2308]"
                    >
                        Koleksi Motif Pilihan
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto max-w-2xl text-[#7A6A5A]"
                    >
                        Setiap motif dirancang dengan teliti, menggabungkan
                        keindahan tradisional dengan estetika kontemporer
                    </motion.p>
                </div>
                <Tabs
                    value={currentCategory || 'semua'}
                    onValueChange={handleTabChange}
                    className="w-full space-y-6"
                >
                    <div className="flex w-full flex-row justify-between gap-0">
                        <div className="inline-flex items-center overflow-x-auto">
                            <TabsList className="inline-flex h-fit space-x-4 bg-transparent p-0">
                                <TabsTrigger
                                    value="semua"
                                    className="p-0 text-sm whitespace-nowrap text-[#3E2308] transition-colors data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-[#3E2308] data-[state=active]:shadow-none"
                                >
                                    Semua
                                </TabsTrigger>
                                {categories.map((e: any) => (
                                    <TabsTrigger
                                        key={e.slug}
                                        value={e.slug}
                                        className="p-0 text-sm whitespace-nowrap text-[#3E2308] transition-colors data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-[#3E2308] data-[state=active]:shadow-none"
                                    >
                                        {e.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                        <Button
                            asChild
                            className="hidden text-[#3E2308] md:block"
                            variant={'link'}
                        >
                            <Link href="/products">Lihat Semua</Link>
                        </Button>
                    </div>
                    <TabsContent
                        value={currentCategory || 'semua'}
                        className="w-full"
                    >
                        <div className="grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {products.map((item: any, index: number) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={
                                        isInView ? { opacity: 1, y: 0 } : {}
                                    }
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                    }}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                    className="group h-full"
                                >
                                    <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300 hover:shadow-2xl">
                                        <div className="relative h-full overflow-hidden">
                                            <Link
                                                href={detail(item.slug)}
                                                className="h-full"
                                            >
                                                <div className="flex h-full items-center justify-center overflow-hidden rounded-md bg-gray-100">
                                                    {item?.images.length > 0 ? (
                                                        <BlurImage
                                                            src={`/storage/${item.images[0].path}`}
                                                            alt={item.name}
                                                            placeholder={
                                                                item.images[0]
                                                                    .placeholder
                                                            }
                                                            blurhash={
                                                                item.images[0]
                                                                    .blurhash
                                                            }
                                                            className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <span className="font-bold text-gray-500">
                                                            1080 x 1920
                                                        </span>
                                                    )}
                                                </div>
                                                {item?.images?.length > 0 && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{
                                                            opacity:
                                                                hoveredId ===
                                                                item.id
                                                                    ? 1
                                                                    : 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                        }}
                                                        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(244,179,147,0.4),transparent)]"
                                                    />
                                                )}
                                            </Link>
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between gap-4 bg-[#FFFEFB] p-6">
                                            <div className="space-y-1">
                                                <Link
                                                    href={`products/${item.slug}`}
                                                    className="line-clamp-2 font-['Playfair_Display'] text-2xl font-semibold text-[#5A4A3A]"
                                                >
                                                    {item.name}
                                                </Link>

                                                <div className="line-clamp-2">
                                                    <DisplayDescription
                                                        description={
                                                            item.description
                                                        }
                                                    />
                                                </div>

                                                <p className="text-xl font-bold text-[#3e2308]">
                                                    {formatRupiah(item.price)}
                                                </p>
                                            </div>

                                            {/* <div className="flex gap-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full"
                                                >
                                                    <Button
                                                        onClick={() =>
                                                            handleWhatsAppClick(
                                                                item.name,
                                                            )
                                                        }
                                                        variant="outline"
                                                        className="flex w-full items-center justify-center gap-2 rounded-full border-primary bg-transparent py-5 transition-all duration-300 hover:shadow-lg"
                                                    >
                                                        <span>Detail</span>
                                                    </Button>
                                                </motion.div>

                                                <Button
                                                    onClick={() =>
                                                        handleWhatsAppClick(
                                                            item.name,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#153B25] py-5 text-[#FCFAF3] shadow-md transition-all duration-300 hover:bg-[#153B25]/80 hover:shadow-lg"
                                                >
                                                    <span>WhatsApp</span>
                                                </Button>
                                            </div> */}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
                <Button
                    asChild
                    className="w-full text-base text-[#3E2308] md:hidden"
                    variant={'link'}
                >
                    <Link href="/products">
                        Lihat semua product
                        <MoveRight />
                    </Link>
                </Button>
            </div>
        </section>
    );
}
