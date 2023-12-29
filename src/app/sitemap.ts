import { blogTopics } from "@/constans/blog";
import { hostName } from "@/constans/general";
import { allBlogs } from "contentlayer/generated";
import { url } from "inspector";

export default async function sitemap() {
    const baseUrl = hostName;

    const blogs = allBlogs;

    const blogsUrls = blogs.map((blog) => ({
        url: `${baseUrl}${blog.url}`,
        lastModified: new Date(blog.date),
    }));

    const blogTopicsUrls = blogTopics.map((topic) => ({
        url: `${baseUrl}/blog/topics/${topic.slug}`,
        lastModified: new Date(),
    }));

    return [
        { url: baseUrl, lastModified: new Date('2023-12-29') },
        { url: `${baseUrl}/blog`, lastModified: new Date() },
        { url: `${baseUrl}/blog/topics`, lastModified: new Date() },
        ...blogTopicsUrls,
        ...blogsUrls,
    ];
}
