import Pagination from "@/components/element/Pagination";
import BlogCard from "@/components/element/BlogCard";
import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { AiOutlineCompass } from "react-icons/ai";
import { pagination } from "@/constans/blog";
import AnimatedSection from "@/components/element/AnimatedSection";

export const paginationConfig = new pagination(
    "/blog",
    "/blog/page",
    allBlogs.length,
    5
);

export default function Page() {
    const { firstPagePath, basePath, totalPages, showedPages, blogsPerPage } =
        paginationConfig;
    const blogs = allBlogs
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .slice(0, blogsPerPage);

    return (
        <div className="w-full mx-auto md:w-[650px]">
            <AnimatedSection className="mb-12 flex flex-col gap-4">
                <h1 className="text-5xl font-bold">Blog</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    Thoughts on software engineering, data science, and technology.
                </p>
                <div className="w-full flex">
                    <Link
                        href={`/blog/topics`}
                        className="flex gap-2 items-center rounded-full py-1.5 px-3 bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
                    >
                        <AiOutlineCompass className="w-4 h-4" />
                        Browse Topics
                    </Link>
                </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="flex flex-col gap-8">
                {blogs.map((blog, index) => (
                    <BlogCard blog={blog} key={blog.url} index={index} />
                ))}
            </AnimatedSection>

            <div className="w-full flex justify-center mt-12">
                <Pagination
                    firstPagePath={firstPagePath}
                    basePath={basePath}
                    currentPage={1}
                    totalPages={totalPages}
                    showedPages={showedPages}
                />
            </div>
            {blogs.length === 0 && (
                <span className="font-mono text-lg w-full text-center block text-neutral-500">
                    No blog posts yet
                </span>
            )}
        </div>
    );
}
