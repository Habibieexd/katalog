export function Testimonials() {
    const quotes = [
        {
            q: 'Pengalaman belanja yang terasa seperti membaca majalah premium.',
            a: 'Alya — Jakarta',
        },
        {
            q: 'Kurasi yang bikin yakin. Setiap produk ada ceritanya.',
            a: 'Reno — Bandung',
        },
        {
            q: 'Packaging rapi, pengiriman kilat. Pasti repeat order.',
            a: 'Sari — Surabaya',
        },
    ];
    return (
        <section className="container mx-auto px-4 py-12 md:py-16">
            <div className="rounded-xl border bg-card p-6 md:p-10">
                <h2 className="text-2xl font-semibold md:text-3xl">
                    Apa kata mereka
                </h2>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                    {quotes.map((it) => (
                        <figure
                            key={it.q}
                            className="rounded-lg bg-secondary p-6"
                        >
                            <blockquote className="text-pretty">
                                “{it.q}”
                            </blockquote>
                            <figcaption className="mt-3 text-sm text-muted-foreground">
                                {it.a}
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    );
}
