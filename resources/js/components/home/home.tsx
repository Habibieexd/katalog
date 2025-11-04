import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
export function Hero() {
    return (
        <section
            id="hero"
            className="relative flex h-screen items-center justify-center overflow-hidden"
        >
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0 z-0">
                <Carousel
                    className="h-full w-full"
                    opts={{
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                >
                    <CarouselContent className="h-full">
                        <CarouselItem className="h-screen">
                            <img
                                src="https://images.unsplash.com/photo-1718002877085-defe69a18049?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHdvdmVuJTIwdGV4dGlsZSUyMHBhdHRlcm58ZW58MXx8fHwxNzYwNDI3NDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Songket Fabric"
                                className="h-full w-full object-cover"
                            />
                        </CarouselItem>
                        <CarouselItem className="h-screen">
                            <img
                                src="https://images.unsplash.com/photo-1707569615782-13f021c40eae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYWJyaWMlMjB0ZXh0dXJlJTIwZ29sZHxlbnwxfHx8fDE3NjA0Mjc0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Songket Fabric"
                                className="h-full w-full object-cover"
                            />
                        </CarouselItem>
                    </CarouselContent>
                </Carousel>

                <div className="absolute inset-0 bg-gradient-to-b from-[#3E2308]/50 via-[#3E2308]/50 to-[#5A4A3A]/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex max-w-5xl flex-col items-center px-4 text-center sm:px-6 md:px-8">
                <h1 className="mb-4 font-['Playfair_Display'] text-3xl leading-tight text-[#FFF6E5] sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                    Kemewahan Tradisi dalam Sentuhan Modern
                </h1>

                <p className="mb-6 max-w-xl text-base text-[#FFF6E5]/90 sm:mb-8 sm:text-lg md:mb-10 md:text-xl">
                    Setiap benang menceritakan kisah warisan budaya yang ditenun
                    dengan cinta dan keahlian turun-temurun
                </p>

                <Button
                    onClick={() =>
                        document
                            .getElementById('galeri')
                            ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className="rounded-full bg-[#dc720c]/80 px-6 py-5 text-sm shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#dc720c] hover:opacity-90 hover:shadow-xl sm:px-8 sm:py-5 sm:text-base md:px-10 md:py-6"
                >
                    Jelajahi Koleksi
                </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform sm:bottom-8 md:bottom-10">
                <div
                    className="flex h-8 w-5 items-start justify-center rounded-full border-2 p-1.5 sm:h-9 sm:w-5 sm:p-2 md:h-10 md:w-6"
                    style={{ borderColor: '#FFF6E5' }}
                >
                    <motion.div
                        className="h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5"
                        style={{ backgroundColor: '#F4B393' }}
                        animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
