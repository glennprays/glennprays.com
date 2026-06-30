import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import Pre from "./Pre";
import Callout from "./Callout";
import Figure from "./Figure";
import { StatBand, Stat } from "./StatBand";
import CountUp from "./CountUp";
import DisclosureTimeline from "./DisclosureTimeline";

function A({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
        return (
            <Link href={href} {...props}>
                {children}
            </Link>
        );
    }
    return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
            {children}
        </a>
    );
}

// Passed to contentlayer's <Content components={...} />. Element overrides
// (a, pre) plus custom authoring components usable directly in .mdx posts.
export const mdxComponents = {
    a: A,
    pre: Pre,
    Callout,
    Figure,
    StatBand,
    Stat,
    CountUp,
    DisclosureTimeline,
};
