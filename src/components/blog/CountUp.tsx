"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function format(n: number) {
    return Math.round(n).toLocaleString("en-US");
}

export default function CountUp({
    to,
    prefix = "",
    suffix = "",
    duration = 1.4,
}: {
    to: number;
    prefix?: string;
    suffix?: string;
    duration?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px" });
    const reduce = useReducedMotion();

    // SSR + first paint render the final value (crawlable, no layout shift).
    const [value, setValue] = useState(to);

    useEffect(() => {
        if (reduce) return;
        // After hydration, reset to 0 so the count-up can play when in view.
        setValue(0);
    }, [reduce]);

    useEffect(() => {
        if (reduce || !inView) return;
        let raf = 0;
        let start: number | null = null;
        const tick = (ts: number) => {
            if (start === null) start = ts;
            const t = Math.min(1, (ts - start) / (duration * 1000));
            setValue(to * easeOutCubic(t));
            if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduce, to, duration]);

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {format(value)}
            {suffix}
        </span>
    );
}
