"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface LazySectionProps {
    children: ReactNode;
    className?: string;
    rootMargin?: string;
    threshold?: number;
    placeholder?: ReactNode;
}

export default function LazySection({
    children,
    className = "",
    rootMargin = "200px",
    threshold = 0.1,
    placeholder = null,
}: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin, threshold]);

    return (
        <div ref={ref} className={className}>
            {isVisible ? children : placeholder}
        </div>
    );
}
