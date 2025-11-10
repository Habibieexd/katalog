import { About } from '@/components/home/about';
import { Contact } from '@/components/home/contact';
import { Faq } from '@/components/home/faq';
import { Gallery } from '@/components/home/gallert';
import { Hero } from '@/components/home/home';
import { Process } from '@/components/home/process';
import GuestLayout from '@/layouts/guest-layout';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { products, categories } = usePage().props;
    const currentCategory = new URLSearchParams(window.location.search).get(
        'category',
    );

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <GuestLayout>
                <Hero />
                <About />
                <Gallery
                    products={products}
                    categories={categories}
                    currentCategory={currentCategory}
                />
                <Process />
                <Faq />
                <Contact />
            </GuestLayout>
        </>
    );
}
