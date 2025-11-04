import { Button } from '@/components/ui/button';
import { CardDescription, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { formatRupiah } from '@/lib/formatRupiah';
import { store } from '@/routes/admin/product';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: 'product',
    },
    {
        title: 'Tambah Produk',
        href: 'product.create',
    },
];

interface ProductCategory {
    id: number;
    name: string;
}

interface Props {
    categories: ProductCategory[];
}

export default function Page({ categories }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        product_category_id: '',
        name: '',
        description: '',
        price: '',
        is_active: true,
        images: [] as File[],
        primary_image_index: 0,
    });

    const [previewImages, setPreviewImages] = useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setData('images', [...data.images, ...files]);

        // Create preview URLs
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = previewImages.filter((_, i) => i !== index);
        setData('images', newImages);
        setPreviewImages(newPreviews);

        // Adjust primary image index if needed
        if (data.primary_image_index === index) {
            setData('primary_image_index', 0);
        } else if (data.primary_image_index > index) {
            setData('primary_image_index', data.primary_image_index - 1);
        }
    };

    const setPrimaryImage = (index: number) => {
        setData('primary_image_index', index);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data);

        post(store.url());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <CardTitle className="text-4xl">Tambah Produk</CardTitle>
                    <CardDescription>
                        Lengkapi form di bawah untuk menambahkan produk baru
                    </CardDescription>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="space-y-6 rounded-lg border bg-card p-6">
                        {/* Product Category */}
                        <div className="space-y-2">
                            <Label htmlFor="product_category_id">
                                Kategori Produk{' '}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Select
                                value={data.product_category_id}
                                onValueChange={(value) =>
                                    setData('product_category_id', value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kategori" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.product_category_id && (
                                <p className="text-sm text-red-500">
                                    {errors.product_category_id}
                                </p>
                            )}
                        </div>

                        {/* Product Name */}
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Nama Produk{' '}
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                placeholder="Masukkan nama produk"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">
                                    {errors.name}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) =>
                                    setData('description', e.target.value)
                                }
                                placeholder="Masukkan deskripsi produk"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <Label htmlFor="price">
                                Harga <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={(e) =>
                                    setData('price', e.target.value)
                                }
                                placeholder="0"
                                min="0"
                            />
                            {data.price && (
                                <p className="font-semibold text-[#5A4A3A]">
                                    {formatRupiah(data.price)}
                                </p>
                            )}
                            {errors.price && (
                                <p className="text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Is Active */}
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked) =>
                                    setData('is_active', checked)
                                }
                            />
                            <Label
                                htmlFor="is_active"
                                className="cursor-pointer"
                            >
                                Produk Aktif
                            </Label>
                        </div>

                        {/* Product Images */}
                        <div className="space-y-2">
                            <Label>Gambar Produk</Label>
                            <div className="space-y-4">
                                {/* Upload Button */}
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="image-upload"
                                    />
                                    <Label
                                        htmlFor="image-upload"
                                        className="flex cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload Gambar
                                    </Label>
                                </div>

                                {/* Image Previews */}
                                {previewImages.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {previewImages.map((preview, index) => (
                                            <div
                                                key={index}
                                                className="group relative"
                                            >
                                                <img
                                                    src={preview}
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-32 w-full rounded-lg border object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPrimaryImage(index)
                                                    }
                                                    className={`absolute bottom-2 left-2 rounded px-2 py-1 text-xs ${
                                                        data.primary_image_index ===
                                                        index
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-white/80 text-gray-700'
                                                    }`}
                                                >
                                                    {data.primary_image_index ===
                                                    index
                                                        ? 'Utama'
                                                        : 'Set Utama'}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            {errors.images && (
                                <p className="text-sm text-red-500">
                                    {errors.images}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Simpan Produk'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
