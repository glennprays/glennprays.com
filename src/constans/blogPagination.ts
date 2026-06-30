import { allBlogs } from "contentlayer/generated";
import { pagination } from "@/constans/blog";

// Shared blog pagination config for the index and numbered pages. Lives outside
// the page files because Next App Router pages may only have the default export
// plus a known set of named exports (not arbitrary consts).
export const paginationConfig = new pagination(
    "/blog",
    "/blog/page",
    allBlogs.length,
    5
);
