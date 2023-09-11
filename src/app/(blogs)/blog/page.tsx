import { allBlogs, Blog } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

function BlogCard({ blog }: { blog: Blog }) {
    return (
        <Link
            href={blog.url}
            passHref
            className="flex flex-col"
        >
            <div className="text-3xl font-semibold hover:underline">{blog.title}</div>
            <time dateTime={blog.date} className="text-xs">
                {format(parseISO(blog.date), "LLLL d, yyyy")}
            </time>
            <div>{blog.description}</div>
        </Link>
    );
}

export default function Page() {
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
            </div>
            <div className="flex flex-col gap-7">
                {blogs.map((blog) => (
                    <BlogCard blog={blog} key={blog.url} />
                ))}
            </div>
            {blogs ? null : (
                <span className="font-mono text-lg w-full">No blog yet</span>
            )}
        </div>
    );
}
