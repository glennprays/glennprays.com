import { blogTopics } from "@/constans/blog";
import { hostName } from "@/constans/general";
import { allBlogs } from "contentlayer/generated";

export default async function sitemap() {
    const baseUrl = hostName;

    const blogs = allBlogs;

    const blogsUrls = blogs.map((blog) => ({
        url: `${baseUrl}${blog.url}`,
        lastModified: new Date(blog.date),
        priority: 0.7,
    }));

    const blogTopicsUrls = blogTopics.map((topic) => ({
        url: `${baseUrl}/blog/topics/${topic.slug}`,
        lastModified: new Date(),
        priority: 0.8,
    }));

    return [
        { url: baseUrl, lastModified: new Date("2024-04-29"), priority: 1 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.9 },
        {
            url: `${baseUrl}/blog/topics`,
            lastModified: new Date(),
            priority: 0.9,
        },
        ...blogTopicsUrls,
        ...blogsUrls,
    ];
}
