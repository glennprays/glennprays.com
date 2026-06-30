"use client";

import { HTMLAttributes, useRef } from "react";
import CopyCodeButton from "./CopyCodeButton";

// Wraps the <pre> emitted by rehype-pretty-code so the code block gets a
// hover copy button. The button reads the rendered text via a ref, so it works
// regardless of how shiki tokenized the source.
export default function Pre({
    children,
    ...props
}: HTMLAttributes<HTMLPreElement>) {
    const ref = useRef<HTMLPreElement>(null);
    return (
        <div className="group relative">
            <pre ref={ref} {...props}>
                {children}
            </pre>
            <CopyCodeButton targetRef={ref} />
        </div>
    );
}
