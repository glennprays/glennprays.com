import Pagination from "@/components/element/Pagination";
import { allBlogs, Blog } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";
import { AiOutlineCompass } from "react-icons/ai";
import { paginationConfig } from "@/constans/blog";

function BlogCard({ blog }: { blog: Blog }) {
    return (
        <div>
            <Link href={blog.url} passHref className="flex flex-col gap-1">
                <div className="text-3xl font-semibold hover:underline">
                    {blog.title}
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <time dateTime={blog.date} className="">
                        {format(parseISO(blog.date), "LLLL d, yyyy")}
                    </time>
                </div>
                <div className="line-clamp-3">{blog.description}</div>
            </Link>
            <div className="flex gap-2 items-center text-xs mt-4">
                <Link
                    href={`blog/topics/${blog.flattened_tag}`}
                    className="py-1 px-2 rounded-full bg-neutral-300 dark:bg-neutral-700"
                >
                    {blog.tag}
                </Link>
                ·<span className="">{blog.reading_time} min read</span>
            </div>
        </div>
    );
}

export default function Page() {
    const { firstPagePath, basePath, totalPages, showedPages, blogsPerPage } =
        paginationConfig;
    const blogs = allBlogs.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date))
    );

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
                {blogs.slice(0, blogsPerPage).map((blog) => (
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
