import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogCard from "@/components/element/BlogCard";
import Pagination from "@/components/element/Pagination";
import { paginationConfig } from "../../page";

type Props = {
    params: {
        number: number;
    };
};

export async function generateStaticParams() {
    const { totalPages } = paginationConfig;
    const paths = Array.from({ length: totalPages - 1 }, (_, i) => ({
        number: (i + 2).toString(),
    }));
    return paths;
}

export default async function Page({ params }: Props) {
    const { firstPagePath, basePath, totalPages, showedPages, blogsPerPage } =
        paginationConfig;
    const firstBlogIndex = (params.number - 1) * showedPages;
    const blogs = allBlogs
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .slice(firstBlogIndex, firstBlogIndex + blogsPerPage);
    return (
        <div className="w-full mx-auto md:w-[650px]">
            <div className="mb-9 flex flex-col gap-4">
                <h1 className="text-5xl font-bold">Blogs page {params.number}</h1>
                {/* <span className="">
                    Page {params.number}
                </span> */}
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
                    currentPage={params.number}
                    totalPages={totalPages}
                    showedPages={showedPages}
                />
            </div>
        </div>
    );
}
