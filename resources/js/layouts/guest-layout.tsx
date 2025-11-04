import { Footer } from '@/components/home/footer';
import { Navigation } from '@/components/home/navigation';
import { type ReactNode } from 'react';

interface GuestLayout {
    children: ReactNode;
}

export default ({ children }: GuestLayout) => (
    <>
        <Navigation />
        {children}
        <Footer />
    </>
);
