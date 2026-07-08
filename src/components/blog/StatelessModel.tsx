"use client";

import { motion, useReducedMotion } from "framer-motion";

const TURNS = [
    { n: 1, ctx: "do X", out: "result A" },
    { n: 2, ctx: "do Y", out: "result B" },
    { n: 3, ctx: "do Z", out: "result C" },
];

export default function StatelessModel() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 flex flex-col">
            {TURNS.map((t, i) => (
                <div key={t.n} className="flex flex-col">
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.1 }}
                        className="flex flex-wrap items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-neutral-500">
                            #{t.n}
                        </span>
                        <span className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            {t.ctx}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-600">&rarr;</span>
                        <span className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold tracking-wide text-white dark:bg-amber-500 dark:text-neutral-900">
                            MODEL
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-600">&rarr;</span>
                        <span className="rounded-md bg-neutral-100 px-2 py-1 font-mono text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            {t.out}
                        </span>
                    </motion.div>
                    {i < TURNS.length - 1 && (
                        <div className="flex justify-center py-1.5">
                            <span className="rounded-full border border-dashed border-neutral-300 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-neutral-400 dark:border-neutral-600 dark:text-neutral-500">
                                no memory carries over
                            </span>
                        </div>
                    )}
                </div>
            ))}
            <p className="mt-3 text-center text-sm text-neutral-500 dark:text-neutral-400">
                The model is stateless. Every call starts blank. It only knows what you feed it this turn.
            </p>
        </div>
    );
}
