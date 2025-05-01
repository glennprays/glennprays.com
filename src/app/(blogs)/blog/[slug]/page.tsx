import { allBlogs } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";
import { format, parseISO } from "date-fns";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import Image from "next/image";
import { hostName } from "@/constans/general";
import ShareGroup from "@/components/header/ShareGroup";
import Link from "next/link";
import React from "react";
import { chromium } from 'playwright';

import { MdArrowForwardIos } from "react-icons/md";

type Props = {
    params: {
        slug: string;
    };
};

async function generateOg(shortTitle: string, slug: string): Promise<string> {
    const fileName = `${slug}.png`;
    const fileUrl = path.join('images', 'blog', '.opengraph', fileName);
    const filePath = path.join('public', fileUrl);

    if (fs.existsSync(filePath)) {
        return fileUrl;
    }

    const og = `
    <div style="width: 1200px; height: 630px; text-align: center; position: relative; display: flex; align-items: center; justify-content: center; background-image: url('https://glennprays.com/images/blog-cover.png'); background-size: cover;">
      <span style="position: absolute; z-index: 20; font-family: monospace; font-size: 75px; font-weight: bolder; word-spacing: -20px; color: white; margin-left: 40px; margin-right: 40px;">
        ${shortTitle}
      </span>
    </div>
  `;

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Set the viewport size to match the desired image dimensions
    await page.setViewportSize({ width: 1200, height: 630 });

    // Set the HTML content
    await page.setContent(og, { waitUntil: 'load' });

    // Capture the screenshot
    const imageBuffer = await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width: 1200, height: 630 },
    });

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the image to the file system
    fs.writeFileSync(filePath, imageBuffer);

    await browser.close();

    return fileUrl;
}

export async function generateStaticParams() {
    const paths = allBlogs.map((blog) => ({ slug: blog.slug }));
    return paths;
}

export async function generateMetadata({ params }: Props) {
    const blog = allBlogs.find((blog) => blog.slug === params.slug);
    const ogPath = await generateOg(blog?.short_title || "", blog?.slug || "");
    const metadata: Metadata = {
        title: blog?.title + " | glennprays;",
        description: blog?.description,
        robots: {
            index: true,
            nocache: false,
        },
        openGraph: {
            images: ogPath,
        },
        twitter: {
            images: ogPath,
        },
        authors: { name: blog?.author },
    };
    return metadata;
}

export default async function Page({ params }: Props) {
    const blog = allBlogs.find((blog) => blog.slug === params.slug);

    const Content = getMDXComponent(blog?.body.code || "");
    const blogCoverPath = path.join(
        "..",
        "..",
        "..",
        "..",
        "images",
        "blog",
        ".opengraph",
        blog?.slug + ".png"
    );

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
        <article className="prose prose-sm md:prose-base lg:prose-lg prose-slate prose-i dark:prose-invert mx-auto prose-h1:my-1 prose-h1:font-bold prose-h2:mt-7 prose-h2:mb-2 prose-img:w-full md:prose-img:w-[500px] prose-video:w-full md:prose-video:w-[500px] prose-li:m-0 prose-code:text-base prose-code:whitespace-pre-wrap  ">
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
                width={0}
                height={0}
                className="mx-auto w-full md:w-[500px]"
            />
            <Content />
            <span className="text-sm">Author: {blog?.author}</span>
        </article>
    );
}