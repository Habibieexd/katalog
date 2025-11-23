import BlurImage from '@/components/blur-image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatRupiah } from '@/lib/formatRupiah';
import { detail } from '@/routes/products';
import { Link } from '@inertiajs/react';
import { DisplayDescription } from '../display-description';

export default function RelatedProductsCard({ products }: any) {
    return (
        <>
            {products.map((item: any, index: any) => (
                <Card
                    key={index}
                    className="group border-none bg-transparent p-0 shadow-none"
                >
                    <CardHeader className="p-0">
                        <div className="relative overflow-hidden rounded-md">
                            <Link href={detail(item.slug)}>
                                <div className="flex aspect-[3/4] w-full items-center justify-center bg-gray-100">
                                    {item?.images?.length > 0 ? (
                                        <BlurImage
                                            src={`https://res.cloudinary.com/daif5nsos/image/upload/w_800,c_limit,q_auto,f_auto/${item.images[0].path}`}
                                            alt={item.name}
                                            placeholder={
                                                item.images[0].placeholder
                                            }
                                            blurhash={item.images[0].blurhash}
                                            className="h-full w-full transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="flex w-full items-center justify-center">
                                            <span className="font-bold text-gray-500">
                                                1080 x 1920
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="flex flex-col space-y-px">
                            {/* <h3 className="text-sm font-medium text-gray-600">
                                {item.category?.name}
                            </h3> */}
                            <p className="mt-1 font-['Playfair_Display'] text-xl font-semibold text-[#3e2308]">
                                {item.name}
                            </p>
                            <div className="mt-1 line-clamp-2 text-[#5A4A3A]">
                                <DisplayDescription
                                    description={item.description}
                                />
                            </div>
                            <p className="text-xl font-bold text-[#3e2308]">
                                {formatRupiah(item.price)}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
