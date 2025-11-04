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
import { update } from '@/routes/admin/product';
import { BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: 'product',
    },
    {
        title: 'Edit Produk',
        href: 'product.edit',
    },
];

interface ProductFormData {
    product_category_id: string;
    name: string;
    description: string;
    price: string;
    is_active: boolean;
    images: File[];
    primary_image_index: number;
    deleted_image_ids: number[];
    _method?: string;
}

export default function EditProduct() {
    const { props }: any = usePage();
    const { product, categories } = props;

    const [existingImages] = useState<any[]>(product?.images || []);
    const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

    const { data, setData, post, processing, errors } =
        useForm<ProductFormData>({
            product_category_id: product?.product_category_id?.toString() || '',
            name: product?.name || '',
            description: product?.description || '',
            price: product?.price?.toString() || '',
            is_active: product?.is_active ?? true,
            images: [] as File[],
            primary_image_index: product?.primary_image_index || 0,
            deleted_image_ids: [],
            _method: 'PUT',
        });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setData('images', [...data.images, ...files]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewImagePreviews((prev) => [
                    ...prev,
                    reader.result as string,
                ]);
            };
            reader.readAsDataURL(file);
        });

        e.target.value = '';
    };

    const removeNewImage = (index: number) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = newImagePreviews.filter((_, i) => i !== index);
        setData('images', newImages);
        setNewImagePreviews(newPreviews);

        const totalExisting =
            existingImages.length - data.deleted_image_ids.length;
        const adjustedIndex = data.primary_image_index - totalExisting;

        if (adjustedIndex > index) {
            setData('primary_image_index', data.primary_image_index - 1);
        } else if (adjustedIndex === index) {
            setData('primary_image_index', 0);
        }
    };

    const removeExistingImage = (imageId: number, imageIndex: number) => {
        setData('deleted_image_ids', [...data.deleted_image_ids, imageId]);

        if (data.primary_image_index === imageIndex) {
            setData('primary_image_index', 0);
        } else if (data.primary_image_index > imageIndex) {
            setData('primary_image_index', data.primary_image_index - 1);
        }
    };

    const setPrimaryImage = (index: number) => {
        setData('primary_image_index', index);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(update(product.id).url, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                console.log('Product updated successfully');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    const allImages = [
        ...existingImages
            .filter((img) => !data.deleted_image_ids.includes(img.id))
            .map((img) => ({
                id: img.id,
                url: img.url || img.image_url || img,
                path: img.path || img.url?.path,
                isNew: false,
            })),
        ...newImagePreviews.map((preview, i) => ({
            url: preview,
            isNew: true,
            newIndex: i,
        })),
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Produk" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div>
                    <CardTitle className="text-4xl">Edit Produk</CardTitle>
                    <CardDescription>
                        Ubah data produk sesuai kebutuhan
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
                                    {categories.map((category: any) => (
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
                                Nama Produk
                                <span className="text-red-600">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
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
                                type="text"
                                value={data.price}
                                onChange={(e) => {
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        '',
                                    );
                                    setData('price', value);
                                }}
                            />
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
                                        Tambah Gambar
                                    </Label>
                                </div>

                                {allImages.length > 0 && (
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {allImages.map((img: any, index) => (
                                            <div
                                                key={img.id || index}
                                                className="group relative"
                                            >
                                                <img
                                                    src={
                                                        img.isNew
                                                            ? img.url
                                                            : `/storage/${img.path}`
                                                    }
                                                    alt={`Preview ${index + 1}`}
                                                    className="h-32 w-full rounded-lg border object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        img.isNew
                                                            ? removeNewImage(
                                                                  img.newIndex,
                                                              )
                                                            : removeExistingImage(
                                                                  img.id,
                                                                  index,
                                                              )
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

                    <div className="flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                        >
                            Batal
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Menyimpan...' : 'Update Produk'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
