import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatRupiah } from '@/lib/formatRupiah';
import { ArrowRight } from 'lucide-react';

export function FeaturedProducts({ products }: any) {
    return (
        <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="flex items-end justify-between">
                <h2 className="text-2xl font-semibold md:text-3xl">
                    Sorotan Minggu Ini
                </h2>
                <Button variant="outline">Lihat Semua</Button>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
                {products.map((p: any) => (
                    <Card key={p.name} className="border-1">
                        <CardHeader className="px-8">
                            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-md bg-gray-100">
                                {p?.images.length > 0 ? (
                                    <img
                                        src={`https://res.cloudinary.com/daif5nsos/image/upload/w_800,c_limit,q_auto,f_auto/${p.images[0].path}`}
                                        alt="image placeholder"
                                        className="w-f h-full rounded object-cover object-center"
                                        width={500}
                                        height={500}
                                    />
                                ) : (
                                    <span className="font-bold text-gray-500">
                                        400 x 225
                                    </span>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-2 px-8">
                            <CardTitle className="text-lg">{p.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {p.description}
                            </p>
                            <p className="text-sm text-foreground">
                                {formatRupiah(p.price)}
                            </p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-[#153B25]/90 text-primary-foreground hover:bg-[#153B25]">
                                WhatsApp <ArrowRight />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    );
}
