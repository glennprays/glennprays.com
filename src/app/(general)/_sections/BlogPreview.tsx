"use client";

import { allBlogs } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";
import { FaArrowRight } from "react-icons/fa";

export default function BlogPreview() {
    const recentBlogs = allBlogs
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .slice(0, 3);

    return (
        <section id="blog" className="section-container">
            <motion.h2
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeUp()}
                className="section-title"
            >
                Latest Posts
            </motion.h2>

            <motion.div
                viewport={{ once: true, amount: 0.1 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            >
                {recentBlogs.map((blog, index) => (
                    <motion.div
                        key={blog.slug}
                        variants={Motions.fadeUp(index * 0.1)}
                    >
                        <BlogCard blog={blog} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeUp(0.4)}
                className="flex justify-center mt-12"
            >
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-medium transition-colors group"
                >
                    View All Posts
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
        </section>
    );
}

const BlogCard = ({ blog }: { blog: typeof allBlogs[number] }) => {
    return (
        <Link href={blog.url} className="card hover-lift hover-glow group block h-full">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
                    <time dateTime={blog.date}>
                        {format(parseISO(blog.date), "MMM d, yyyy")}
                    </time>
                    <span>·</span>
                    <span>{blog.reading_time} min read</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 group-hover:text-cyan-600 dark:group-hover:text-amber-500 transition-colors line-clamp-2">
                    {blog.title}
                </h3>

                <p className="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-4 flex-grow">
                    {blog.description}
                </p>

                <span className="inline-flex items-center text-xs bg-neutral-100 dark:bg-neutral-700 rounded-full px-3 py-1 w-fit">
                    {blog.tag}
                </span>
            </div>
        </Link>
    );
};
