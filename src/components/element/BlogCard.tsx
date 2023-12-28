import { Blog } from "contentlayer/generated";
import { format, parseISO, compareDesc } from "date-fns";
import Link from "next/link";

export default function BlogCard({ blog }: { blog: Blog }) {
    
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