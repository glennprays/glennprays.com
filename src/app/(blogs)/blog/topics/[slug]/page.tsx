import { blogTopics } from "@/constans/blog";
import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
import Link from "next/link";
import { AiOutlineCompass } from "react-icons/ai";
import BlogCard from "@/components/element/BlogCard";
import AnimatedSection from "@/components/element/AnimatedSection";

type Props = {
    params: {
        slug: string;
    };
};

export function generateStaticParams() {
    const paths = blogTopics.map((topic) => ({ slug: topic.slug }));
    return paths;
}

export function generateMetadata({ params }: Props) {
    const topic = blogTopics.find((topic) => topic.slug === params.slug);
    const metadata: Metadata = {
        title: topic?.name + " | glennprays;",
        description: `My blogs talking about ${topic?.name}`,
    };
    return metadata;
}

export default function Page({ params }: Props) {
    const topic = blogTopics.find((topic) => topic.slug === params.slug);
    const blogs = allBlogs
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .filter((blog) => blog.flattened_tag === params.slug);

    return (
        <div className="w-full mx-auto md:w-[650px]">
            <AnimatedSection className="flex flex-col gap-3 mb-12">
                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    Blog Topic
                </div>
                <h1 className="font-bold text-5xl">{topic?.name}</h1>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {topic?.description}
                </p>
                <div className="w-full flex mt-2">
                    <Link
                        href={`/blog/topics`}
                        className="flex gap-2 items-center rounded-full py-1.5 px-3 bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm"
                    >
                        <AiOutlineCompass className="w-4 h-4" />
                        More Topics
                    </Link>
                </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="flex flex-col gap-8">
                {blogs.map((blog, index) => (
                    <BlogCard key={blog.title} blog={blog} index={index} />
                ))}
            </AnimatedSection>

            {blogs.length === 0 && (
                <p className="text-neutral-500 text-center py-12">
                    No posts in this topic yet.
                </p>
            )}
        </div>
    );
}
