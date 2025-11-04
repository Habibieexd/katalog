import ProductsCard from '@/components/reusable/admin/products-card';
import EmptyState from '@/components/reusable/state/empty-state';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/admin/product';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: 'product',
    },
];

export default function Product({ products }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Button className="w-fit" asChild>
                    {/* <Link href={route('admin.product.create')}> */}
                    <Link href={create.url()}>Tambah Produk</Link>
                </Button>
                <EmptyState
                    data={products}
                    emptyFallback={
                        <div className="rounded border p-4 text-center">
                            Data tidak ada atau kosong
                        </div>
                    }
                >
                    <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2 xl:grid-cols-3">
                        {products.map((product: any) => (
                            <ProductsCard product={product} key={product.id} />
                        ))}
                    </div>
                </EmptyState>
            </div>
        </AppLayout>
    );
}
