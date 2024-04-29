import { flattenText } from "../utils/formater";
import { allBlogs } from "contentlayer/generated";
type BlogCategory = {
    name: string;
    description: string;
    slug?: string;
};

const blogCategories: BlogCategory[] = [
    {
        name: "Software Engineering",
        description:
            "Software engineering is like building a well-structured and reliable digital tool or program. It involves planning, designing, and coding to make sure the software works well and does what people need it to do. Think of it as constructing a solid bridge, but in the world of computers.",
    },
    {
        name: "Data Science",
        description:
            "Data science is an interdisciplinary field that combines techniques from statistics, mathematics, computer science, and domain expertise to extract knowledge and insights from data. It involves collecting, cleaning, and processing large datasets to uncover hidden patterns, trends, and valuable information. ",
    },
];

export const blogTopics = blogCategories.map((category, index) => {
    category.slug = flattenText(category.name.toLocaleLowerCase());
    return category;
});

export class pagination {
    firstPagePath: string;
    basePath: string;
    totalPages: number;
    showedPages: number;
    blogsPerPage: number;

    constructor(
        firstPagePath: string,
        basePath: string,
        totalBlogs: number,
        showedPages: number,
        blogsPerPage: number = 5
    ) {
        this.firstPagePath = firstPagePath;
        this.basePath = basePath;
        this.showedPages = showedPages;
        this.blogsPerPage = blogsPerPage;
        this.totalPages = Math.ceil(totalBlogs / this.blogsPerPage);
    }
}
