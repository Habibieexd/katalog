// resources/js/Components/BlurImage.tsx
import { useEffect, useState } from 'react';

interface BlurImageProps {
    src: string;
    alt: string;
    placeholder?: string;
    blurhash?: string;
    className?: string;
}

export default function BlurImage({
    src,
    alt,
    placeholder,
    blurhash,
    className = '',
}: BlurImageProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Reset state jika src berubah
        setIsLoaded(false);
        setIsError(false);

        // Preload gambar asli
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setIsLoaded(true);
        };

        img.onerror = () => {
            setIsError(true);
            console.error('Failed to load image:', src);
        };

        // Cleanup
        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src]);

    return (
        <div className="relative h-full w-full overflow-hidden bg-gray-100">
            {/* LQIP Placeholder - Muncul saat loading */}
            {placeholder && !isLoaded && !isError && (
                <img
                    src={placeholder}
                    alt=""
                    className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl"
                    aria-hidden="true"
                />
            )}

            {/* Main Image */}
            {!isError && (
                <img
                    src={src}
                    alt={alt}
                    className={`relative z-10 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setIsError(true)}
                />
            )}

            {/* Error State */}
            {isError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                    <div className="text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">
                            Gambar tidak dapat dimuat
                        </p>
                    </div>
                </div>
            )}

            {/* Loading Indicator - Opsional */}
            {!isLoaded && !isError && !placeholder && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
                </div>
            )}
        </div>
    );
}
