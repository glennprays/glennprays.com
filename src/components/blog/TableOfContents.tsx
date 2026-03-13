"use client";

import { Heading } from "@/utils/extractHeadings";
import { useEffect, useState, useRef } from "react";

interface TableOfContentsProps {
    headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (headings.length < 3) return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const visibleEntries = entries.filter(entry => entry.isIntersecting);
            if (visibleEntries.length > 0) {
                const topEntry = visibleEntries.reduce((prev, current) =>
                    prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
                );
                setActiveId(topEntry.target.id);
            }
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            rootMargin: "-80px 0px -70% 0px",
            threshold: 0,
        });

        const headingElements = headings
            .map(h => document.getElementById(h.id))
            .filter(Boolean) as HTMLElement[];

        headingElements.forEach(el => observerRef.current?.observe(el));

        return () => {
            headingElements.forEach(el => observerRef.current?.unobserve(el));
        };
    }, [headings]);

    if (headings.length < 3) return null;

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="sticky top-24">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-4">
                On This Page
            </h4>
            <ul className="space-y-2">
                {headings.map((heading) => (
                    <li key={heading.id}>
                        <button
                            onClick={() => scrollToHeading(heading.id)}
                            className={`toc-link w-full text-left ${
                                heading.level === 3 ? "pl-3" : ""
                            } ${activeId === heading.id ? "toc-link-active" : ""}`}
                        >
                            {heading.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
