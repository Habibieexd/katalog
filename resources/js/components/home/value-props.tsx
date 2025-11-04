import { MessageCircle, ShieldCheck, Sparkles, Truck } from 'lucide-react';

export function ValueProps() {
    const props = [
        {
            title: 'Kurasi Editor',
            desc: 'Semua produk dipilih tangan oleh tim editorial, bukan sekadar katalog massal.',
            icon: <Sparkles className="h-6 w-6 text-[#153B25]" />,
        },
        {
            title: 'Bergaransi Asli',
            desc: 'Bekerja langsung dengan brand—jaminan produk 100% autentik.',
            icon: <ShieldCheck className="h-6 w-6 text-[#153B25]" />,
        },
        {
            title: 'Pengiriman Cepat',
            desc: 'Logistik terpercaya ke seluruh Indonesia.',
            icon: <Truck className="h-6 w-6 text-[#153B25]" />,
        },
        {
            title: 'Dukungan Ahli',
            desc: 'Chat dengan stylist/ahli produk untuk saran terbaik.',
            icon: <MessageCircle className="h-6 w-6 text-[#153B25]" />,
        },
    ];
    return (
        <section className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-semibold text-pretty md:text-3xl">
                    Apa yang membuat kami berbeda
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-4">
                    {props.map((p) => (
                        <div
                            key={p.title}
                            className="rounded-lg border bg-card p-6"
                        >
                            <div
                                className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-accent/40"
                                aria-hidden
                            >
                                {p.icon}
                            </div>
                            <h3 className="font-medium">{p.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {p.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
