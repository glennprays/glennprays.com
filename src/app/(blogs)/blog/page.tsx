import Pagination from "@/components/element/Pagination";
import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { AiOutlineCompass } from "react-icons/ai";
import { pagination } from "@/constans/blog";
import BlogCard from "@/components/element/BlogCard";

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
            <div className="mb-9 flex flex-col gap-4">
                <h1 className="text-5xl font-bold">Blogs</h1>
                <span className="text-sm">
                    This is my blog, talking about software engineering and data
                    science.
                </span>
                <div className="w-full flex">
                    <Link
                        href={`/blog/topics`}
                        className="flex gap-2 items-center rounded-full py-1 px-2 bg-neutral-300 dark:bg-neutral-700"
                    >
                        <AiOutlineCompass /> Topics
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-16">
                {blogs.map((blog) => (
                    <BlogCard blog={blog} key={blog.url} />
                ))}
            </div>
            <div className="w-full flex justify-center">
                <Pagination
                    firstPagePath={firstPagePath}
                    basePath={basePath}
                    currentPage={1}
                    totalPages={totalPages}
                    showedPages={showedPages}
                />
            </div>
            {blogs ? null : (
                <span className="font-mono text-lg w-full">No blog yet</span>
            )}
        </div>
    );
}
