"use client";

import { blogTopics } from "@/constans/blog";
import Link from "next/link";
import { motion } from "framer-motion";

export default function TopicsList() {
    const topics = blogTopics.map((topic, index) => (
        <motion.div
            key={topic.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <Link
                href={`/blog/topics/${topic.slug}`}
                className="card hover-lift hover-glow block max-w-[285px] py-5 px-5"
            >
                <h2 className="text-xl font-semibold text-cyan-600 dark:text-amber-500">
                    {topic.name.toUpperCase()}
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2 line-clamp-3">
                    {topic.description}
                </p>
            </Link>
        </motion.div>
    ));

    return <>{topics}</>;
}
