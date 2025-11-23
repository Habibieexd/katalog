import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { formatRupiah } from '@/lib/formatRupiah';
import { edit } from '@/routes/admin/product';
import { Link, router } from '@inertiajs/react';
import { DisplayDescription } from '../display-description';

export default function ({ product }: { product: any }) {
    const handleDelete = () => {
        router.delete(`product/${product.id}`, {
            onSuccess: () => {
                // Optional: tampilkan notifikasi atau toast di sini
                console.log('Produk berhasil dihapus');
            },
        });
    };
    return (
        <Card className="flex h-full flex-col justify-between shadow-lg">
            <div className="space-y-4">
                <CardHeader className="relative">
                    <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-md bg-gray-100">
                        {/* Category badge di pojok */}
                        {product.category && (
                            <Badge
                                className="absolute top-2 left-6 z-10"
                                variant="default"
                            >
                                {product.category.name}
                            </Badge>
                        )}

                        {product?.images.length > 0 ? (
                            <img
                                src={`https://res.cloudinary.com/daif5nsos/image/upload/w_800,c_limit,q_auto,f_auto/${product.images[0].path}`}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <span className="font-bold text-gray-500">
                                400 x 225
                            </span>
                        )}
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    {product.category && (
                        <Badge variant="secondary" className="w-fit">
                            {product.category.name}
                        </Badge>
                    )}
                    <CardDescription className="line-clamp-3">
                        <DisplayDescription description={product.description} />
                    </CardDescription>
                    <Badge variant="outline">
                        {formatRupiah(product.price)}
                    </Badge>
                </CardContent>
            </div>

            <CardFooter className="justify-end space-x-2">
                <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-primary/50"
                >
                    <Link href={edit(product.id)}>Edit</Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="cursor-pointer"
                            size="sm"
                        >
                            Hapus
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Produk?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan. Produk
                                <span className="font-semibold text-primary">
                                    {' '}
                                    {product.name}{' '}
                                </span>
                                akan dihapus secara permanen dari sistem.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}
