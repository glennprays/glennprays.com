import { allBlogs } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import { hostName } from "@/constans/general";
import ShareGroup from "@/components/header/ShareGroup";
import Link from "next/link";
import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import AnimatedPostContent from "@/components/blog/AnimatedPostContent";
import { extractHeadings } from "@/utils/extractHeadings";
import TableOfContents from "@/components/blog/TableOfContents";
import { mdxComponents } from "@/components/blog/mdx";

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const paths = allBlogs.map((blog) => ({ slug: blog.slug }));
    return paths;
}

export async function generateMetadata({ params }: Props) {
    const blog = allBlogs.find((blog) => blog.slug === params.slug);
    const ogPath = blog?.ogImage ?? `/og/${params.slug}.png`;
    const postUrl = `${hostName}/blog/${params.slug}`;
    const ogImage = { url: ogPath, width: 1200, height: 630, alt: `${blog?.title} blog cover` };
    const metadata: Metadata = {
        title: blog?.title + " | glennprays",
        description: blog?.description,
        robots: {
            index: true,
            nocache: false,
        },
        openGraph: {
            type: "article",
            url: postUrl,
            siteName: "glennprays",
            title: blog?.title,
            description: blog?.description ?? "",
            images: [ogImage],
        },
        twitter: {
            card: "summary_large_image",
            title: blog?.title,
            description: blog?.description ?? "",
            images: [ogImage],
        },
        authors: { name: blog?.author },
    };
    return metadata;
}

export default async function Page({ params }: Props) {
    const blog = allBlogs.find((blog) => blog.slug === params.slug);

    const Content = getMDXComponent(blog?.body.code || "");
    const blogCoverPath = blog?.ogImage ?? `/og/${blog?.slug}.png`;
    const headings = extractHeadings(blog?.body.raw || "");

    const blogUrl = `${hostName}/blog/${blog?.slug}`;
    const shareQuote = blog?.description || "";
    const routeNav = [
        {
            name: "Blog",
            href: "/blog",
        },
        {
            name: "Topics",
            href: "/blog/topics",
        },
        {
            name: blog?.tag,
            href: `/blog/topics/${blog?.flattened_tag}`,
        },
    ];
    return (
        <div className="mx-auto w-full max-w-6xl px-1 xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-12">
            <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate prose-i dark:prose-invert mx-auto w-full min-w-0 prose-h1:my-1 prose-h1:font-bold prose-h2:mt-7 prose-h2:mb-2 prose-img:w-full md:prose-img:w-[500px] prose-video:w-full md:prose-video:w-[500px] prose-li:m-0 prose-code:text-base prose-code:whitespace-pre-wrap  ">
                <div className="flex gap-3 items-center not-prose text-xs mb-4">
                    {routeNav.map((route, index) => (
                        <React.Fragment key={route.name}>
                            <Link
                                href={route.href}
                                className="font-medium hover:underline"
                            >
                                {route.name}
                            </Link>
                            {index !== routeNav.length - 1 ? (
                                <MdArrowForwardIos />
                            ) : null}
                        </React.Fragment>
                    ))}
                </div>
                <div className="flex items-center gap-2 my-2 text-xs text-gray-600 dark:text-neutral-100">
                    <time dateTime={blog?.date} className="">
                        {format(parseISO(blog?.date || ""), "LLLL d, yyyy")}
                    </time>
                    ·<span className="">{blog?.reading_time} min read</span>
                </div>
                <h1>{blog?.title}</h1>

                <div
                    id="share_group"
                    className=" flex w-full justify-end items-center gap-2 not-prose"
                >
                    <ShareGroup shareUrl={blogUrl} caption={shareQuote} />
                </div>
                <Image
                    src={blogCoverPath}
                    alt={`${blog?.title} blog cover`}
                    width={1200}
                    height={630}
                    className="mx-auto h-auto w-full rounded-xl"
                />
                <TableOfContents variant="mobile" headings={headings} />
                <AnimatedPostContent>
                    <Content components={mdxComponents} />
                </AnimatedPostContent>
                <span className="text-sm">Author: {blog?.author}</span>
            </article>
            <aside className="hidden self-start sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto xl:block">
                <TableOfContents variant="sidebar" headings={headings} />
            </aside>
        </div>
    );
}
