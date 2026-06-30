import GithubSlugger from "github-slugger";

export interface Heading {
    id: string;
    text: string;
    level: 2 | 3;
}

// Strip the inline markdown that rehype removes before slugging, so the TOC's
// display text and id match the rendered headings.
function stripInlineMarkdown(text: string): string {
    return text
        .replace(/`([^`]+)`/g, "$1") // inline code
        .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
        .replace(/\*([^*]+)\*/g, "$1") // italic
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links
        .trim();
}

export function extractHeadings(mdxContent: string): Heading[] {
    const headings: Heading[] = [];
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    // Same slugger rehype-slug uses, fresh per document so de-duping matches.
    const slugger = new GithubSlugger();
    let match;

    while ((match = headingRegex.exec(mdxContent)) !== null) {
        const level = match[1].length as 2 | 3;
        const text = stripInlineMarkdown(match[2]);
        headings.push({ id: slugger.slug(text), text, level });
    }

    return headings;
}
