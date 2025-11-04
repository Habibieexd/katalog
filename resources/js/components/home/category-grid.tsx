import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CategoryGrid() {
    const items = [
        {
            title: 'Peralatan Rumah',
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
        },
        {
            title: 'Gaya Hidup',
            img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
        },
        {
            title: 'Dapur',
            img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
        },
        {
            title: 'Perawatan Diri',
            img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
        },
    ];
    return (
        <section id="koleksi" className="container mx-auto px-4 py-12 md:py-16">
            <div className="flex items-end justify-between">
                <h2 className="text-2xl font-semibold text-pretty md:text-3xl">
                    Telusuri kategori pilihan
                </h2>
                <span className="text-sm text-muted-foreground">
                    Koleksi dikurasi mingguan
                </span>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {items.map((it) => (
                    <Card key={it.title} className="group overflow-hidden">
                        <CardHeader className="p-0">
                            <img
                                src={it.img || '/placeholder.svg'}
                                alt={`Kategori ${it.title}`}
                                className="h-44 w-full object-cover transition-transform group-hover:scale-[1.03] md:h-56"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="text-base">
                                {it.title}
                            </CardTitle>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
