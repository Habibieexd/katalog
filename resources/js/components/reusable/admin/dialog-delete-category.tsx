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
import { Button } from '@/components/ui/button';
import { destroy } from '@/routes/admin/category-product';
import { useForm } from '@inertiajs/react';

export default function DialogDeleteCategory({ category }: any) {
    const { delete: del, processing } = useForm();

    const handleDelete = () => {
        del(destroy(category.id).url, {
            preserveScroll: true,
        });
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    Hapus
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Hapus Kategori</AlertDialogTitle>
                    <AlertDialogDescription>
                        Apakah kamu yakin ingin menghapus kategori{' '}
                        <span className="font-semibold">{category.name}</span>?
                        Tindakan ini tidak dapat dibatalkan.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={processing}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {processing ? 'Menghapus...' : 'Hapus'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
