"use client";

import { Blog } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";
import { FiClock } from "react-icons/fi";

interface BlogCardProps {
    blog: Blog;
    index?: number;
    showBorder?: boolean;
}

export default function BlogCard({ blog, index = 0, showBorder = true }: BlogCardProps) {
    return (
        <motion.div
            variants={Motions.fadeUp(index * 0.1)}
            initial="hidden"
            animate="show"
            className={`${showBorder ? "border-b border-neutral-200 dark:border-neutral-700 pb-8" : ""}`}
        >
            <Link href={blog.url} passHref className="card hover-lift hover-glow block">
                <h2 className="text-2xl font-semibold hover:text-cyan-600 dark:hover:text-amber-500 transition-colors">
                    {blog.title}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-2">
                    {blog.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                    <time dateTime={blog.date}>
                        {format(parseISO(blog.date), "MMMM d, yyyy")}
                    </time>
                    <span className="text-neutral-300 dark:text-neutral-600">·</span>
                    <div className="flex items-center gap-1.5 bg-neutral-100 dark:bg-neutral-700/50 rounded-full px-2 py-0.5 w-fit">
                        <FiClock className="text-xs" />
                        <span>{blog.reading_time} min read</span>
                    </div>
                </div>
            </Link>
            <div className="flex gap-2 items-center text-xs mt-4">
                <Link
                    href={`/blog/topics/${blog.flattened_tag}`}
                    className="py-1 px-3 rounded-full bg-neutral-100 dark:bg-neutral-700/50 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                    {blog.tag}
                </Link>
            </div>
        </motion.div>
    );
}
