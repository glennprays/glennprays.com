"use client";

import { Heading } from "@/utils/extractHeadings";
import { useEffect, useState, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

interface TableOfContentsProps {
    headings: Heading[];
    variant: "sidebar" | "mobile";
}

export default function TableOfContents({
    headings,
    variant,
}: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        if (headings.length < 3) return;

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            const visibleEntries = entries.filter((entry) => entry.isIntersecting);
            if (visibleEntries.length > 0) {
                const topEntry = visibleEntries.reduce((prev, current) =>
                    prev.boundingClientRect.top < current.boundingClientRect.top
                        ? prev
                        : current
                );
                setActiveId(topEntry.target.id);
            }
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            rootMargin: "-80px 0px -70% 0px",
            threshold: 0,
        });

        const headingElements = headings
            .map((h) => document.getElementById(h.id))
            .filter(Boolean) as HTMLElement[];

        headingElements.forEach((el) => observerRef.current?.observe(el));

        return () => {
            headingElements.forEach((el) => observerRef.current?.unobserve(el));
        };
    }, [headings]);

    if (headings.length < 3) return null;

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    const list = (
        <ul className="space-y-1">
            {headings.map((heading) => (
                <li key={heading.id}>
                    <button
                        onClick={() => scrollToHeading(heading.id)}
                        className={`toc-link block w-full text-left ${
                            heading.level === 3 ? "pl-3" : ""
                        } ${activeId === heading.id ? "toc-link-active" : ""}`}
                    >
                        {heading.text}
                    </button>
                </li>
            ))}
        </ul>
    );

    if (variant === "mobile") {
        return (
            <details
                open
                className="group not-prose mb-8 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900 xl:hidden"
            >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-neutral-700 dark:text-neutral-300 [&::-webkit-details-marker]:hidden">
                    On this page
                    <FiChevronDown className="h-4 w-4 shrink-0 text-neutral-500 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <nav className="mt-3">{list}</nav>
            </details>
        );
    }

    return (
        <nav className="sticky top-24 hidden self-start xl:block">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                On this page
            </h4>
            {list}
        </nav>
    );
}
