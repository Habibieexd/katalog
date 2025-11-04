'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export function NewsletterCta() {
    const [email, setEmail] = useState('');
    return (
        <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-4 py-12 md:flex-row md:py-16">
                <div>
                    <h3 className="text-2xl font-semibold text-balance md:text-3xl">
                        Dapatkan kurasi terbaru dan diskon khusus
                    </h3>
                    <p className="mt-1/5 text-sm opacity-90">
                        Newsletter mingguan, tanpa spam.
                    </p>
                </div>
                <form
                    className="flex w-full items-center gap-2 md:w-auto"
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log('[v0] Newsletter submitted:', email);
                        setEmail('');
                        alert(
                            'Terima kasih! Kami akan mengirimkan kurasi terbaru.',
                        );
                    }}
                >
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        required
                        placeholder="Alamat email"
                        className="bg-primary-foreground text-primary placeholder:text-muted-foreground/70"
                    />
                    <Button type="submit" variant="secondary">
                        Berlangganan
                    </Button>
                </form>
            </div>
        </section>
    );
}
