'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';

import {
    type FancyboxOptions,
    Fancybox as NativeFancybox,
} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface Props {
    options?: Partial<FancyboxOptions>;
    delegate?: string;
}

function Fancybox(props: PropsWithChildren<Props>) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        const delegate = props.delegate || '[data-fancybox]';
        const options = props.options || {};

        NativeFancybox.bind(container, delegate, options);

        return () => {
            NativeFancybox.unbind(container);
            NativeFancybox.close();
        };
    });

    return (
        <div ref={containerRef} className="h-full w-full">
            {props.children}
        </div>
    );
}

export default Fancybox;
