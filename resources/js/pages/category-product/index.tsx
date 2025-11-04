import DialogCreateCategory from '@/components/reusable/admin/dialog-create-category';
import DialogDeleteCategory from '@/components/reusable/admin/dialog-delete-category';
import DialogEditCategory from '@/components/reusable/admin/dialog-edit-category';
import EmptyState from '@/components/reusable/state/empty-state';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: 'product',
    },
];

export default function Product({ categories }: any) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DialogCreateCategory />
                <div className="overflow-hidden rounded-md border">
                    <Table>
                        <TableHeader className="bg-secondary">
                            <TableRow>
                                <TableHead>No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <EmptyState
                                data={categories}
                                emptyFallback={
                                    <TableRow>
                                        <TableCell
                                            colSpan={100}
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                }
                            >
                                {categories.map((category: any, idx: any) => (
                                    <TableRow key={idx}>
                                        <TableCell className="font-medium">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell>
                                            {category.description}
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <DialogEditCategory
                                                category={category}
                                            />
                                            <DialogDeleteCategory
                                                category={category}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </EmptyState>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
