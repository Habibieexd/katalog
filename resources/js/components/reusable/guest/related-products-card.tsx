import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatRupiah } from '@/lib/formatRupiah';
import { detail } from '@/routes/products';
import { Link } from '@inertiajs/react';

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
                                        <img
                                            src={`/storage/${item.images[0].path}`}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-90"
                                        />
                                    ) : (
                                        <div className="flex w-full items-center justify-center">
                                            <span className="font-bold text-gray-500">
                                                400 x 225
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
                            <p className="mt-1 text-xl font-semibold text-[#3e2308]">
                                {item.name}
                            </p>
                            <p className="mt-1 line-clamp-2 text-[#5A4A3A]">
                                {item.description}
                            </p>
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
