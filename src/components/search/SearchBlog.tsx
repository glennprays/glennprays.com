"use client";

import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import {
    ChangeEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX, FiClock, FiTag } from "react-icons/fi";

type BlogData = {
    title: string;
    url: string;
    reading_time: string;
    tag: string;
    description: string;
};

const allBlogsData: BlogData[] = allBlogs.map((blog) => ({
    title: blog.title,
    url: blog.url,
    reading_time: blog.reading_time,
    tag: blog.tag,
    description: blog.description,
}));

export function SearchBlog() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<BlogData[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const delayTime = 150;

    // Handle search when query changes
    useEffect(() => {
        if (query) {
            setLoading(true);
            setSelectedIndex(0);

            const timeoutId = setTimeout(() => {
                setOpen(true);
                const lowerQuery = query.toLowerCase();
                const results = allBlogsData.filter(
                    (blog) =>
                        blog.title.toLowerCase().includes(lowerQuery) ||
                        blog.description.toLowerCase().includes(lowerQuery) ||
                        blog.tag.toLowerCase().includes(lowerQuery)
                );
                setSuggestions(results);
                setLoading(false);
            }, delayTime);

            return () => clearTimeout(timeoutId);
        } else {
            setOpen(false);
            setSuggestions([]);
        }
    }, [query]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!open) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex((prev) =>
                        prev < suggestions.length - 1 ? prev + 1 : prev
                    );
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
                    break;
                case "Enter":
                    e.preventDefault();
                    if (suggestions[selectedIndex]) {
                        window.location.href = suggestions[selectedIndex].url;
                    }
                    break;
                case "Escape":
                    setOpen(false);
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, suggestions, selectedIndex]);

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setQuery(e.target.value);
    }

    const clearQuery = () => {
        setQuery("");
        setOpen(false);
    };

    function highlightMatch(text: string, query: string) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        const parts = text.split(regex);
        return parts.map((part, i) =>
            part.toLowerCase() === query.toLowerCase() ? (
                <mark key={i} className="bg-cyan-200 dark:bg-amber-500/30 rounded px-0.5">
                    {part}
                </mark>
            ) : (
                part
            )
        );
    }

    return (
        <div className="relative">
            <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
                <input
                    type="text"
                    className="py-2 pl-10 pr-8 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 bg-white rounded-full w-[280px] text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:focus:ring-amber-500/50 focus:border-transparent transition-all"
                    placeholder="Search blog posts..."
                    onChange={handleInput}
                    value={query}
                    onFocus={() => query && setOpen(true)}
                />
                {query && (
                    <button
                        onClick={clearQuery}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
                    >
                        <FiX className="w-4 h-4" />
                    </button>
                )}
            </div>
            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 w-full bg-white dark:bg-neutral-800 rounded-xl shadow-soft-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden z-50"
                    >
                        {loading ? (
                            <div className="py-8 text-center text-sm text-neutral-500">
                                <div className="animate-pulse">Searching...</div>
                            </div>
                        ) : suggestions.length > 0 ? (
                            <ul className="max-h-[40vh] overflow-y-auto">
                                {suggestions.map((blog, index) => (
                                    <li
                                        key={blog.url}
                                        className={`border-b border-neutral-100 dark:border-neutral-700 last:border-0 ${
                                            index === selectedIndex ? "bg-neutral-50 dark:bg-neutral-700/50" : ""
                                        }`}
                                    >
                                        <Link
                                            href={blog.url}
                                            className="block px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                                        >
                                            <div className="font-medium text-sm line-clamp-1">
                                                {highlightMatch(blog.title, query)}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                                                <span className="flex items-center gap-1">
                                                    <FiClock className="w-3 h-3" />
                                                    {blog.reading_time} min
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FiTag className="w-3 h-3" />
                                                    {blog.tag}
                                                </span>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="py-8 text-center">
                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    No results found for &quot;{query}&quot;
                                </p>
                                <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">
                                    Try searching for a topic or keyword
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
