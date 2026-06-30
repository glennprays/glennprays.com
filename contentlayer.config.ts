import { flattenText } from "./src/utils/formater";
import { blogTopics } from "./src/constans/blog";
import { estimateReadingTime } from "./src/utils/reading";
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

const prettyCodeOptions = {
    theme: "github-dark",
    keepBackground: true,
    // Ensure empty lines keep height and highlighted lines/words get a class.
    onVisitLine(node: { children: unknown[] }) {
        if (node.children.length === 0) {
            node.children = [{ type: "text", value: " " }];
        }
    },
    onVisitHighlightedLine(node: { properties: { className?: string[] } }) {
        node.properties.className = ["line--highlighted"];
    },
    onVisitHighlightedChars(node: { properties: { className?: string[] } }) {
        node.properties.className = ["word--highlighted"];
    },
};

const topicsList = blogTopics.map((blog) => blog.name);

// Background motifs available for the generated OG card (see scripts/og-lib.mjs).
const ogMotifs = [
    "network", "ripple", "signal", "minimal", "blueprint", "aurora",
    "flowfield", "perspective", "contour", "hexgrid", "circuit", "orbit", "isostack",
];

const Blog = defineDocumentType(() => ({
    name: "Blog",
    filePathPattern: `**/*.mdx`,
    contentType: "mdx",
    fields: {
        title: {
            type: "string",
            description: "The title of the blog",
            required: true,
        },
        short_title: {
            type: "string",
            description: "The short title of the blog",
            required: true,
        },
        date: {
            type: "date",
            description: "The date of the blog",
            required: true,
        },
        description: {
            type: "string",
            description: "The Description of the blog",
            required: true,
        },
        author: {
            type: "string",
            description: "The author of the blog",
            required: true,
        },
        tag: {
            type: "enum",
            options: topicsList,
            default: topicsList[0],
            description: "The category of the blog",
            required: true,
        },
        ogTitle: {
            type: "string",
            description: "Short title drawn on the generated OG card (falls back to title)",
            required: false,
        },
        ogVariant: {
            type: "enum",
            options: ogMotifs,
            description: "Background motif for the generated OG card",
            required: false,
        },
    },
    computedFields: {
        url: {
            type: "string",
            resolve: (doc) => `/blog/${doc._raw.flattenedPath}`,
        },
        slug: {
            type: "string",
            resolve: (doc) => doc._raw.flattenedPath,
        },
        reading_time: {
            type: "string",
            resolve: (doc) => estimateReadingTime(doc.body.raw),
        },
        flattened_tag: {
            type: "string",
            resolve: (doc) => flattenText(doc.tag.toLocaleLowerCase()),
        },
        ogImage: {
            type: "string",
            resolve: (doc) => `/og/${doc._raw.flattenedPath}.png`,
        },
    },
}));

export default makeSource({
    contentDirPath: "src/blogs",
    documentTypes: [Blog],
    mdx: {
        rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            // Cast: rehype-pretty-code@0.12 bundles an older vfile whose types
            // don't structurally match unified's Plugin signature (runtime is fine).
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [rehypePrettyCode as any, prettyCodeOptions],
        ],
    },
});
