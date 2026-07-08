"use client";

import { motion, useReducedMotion } from "framer-motion";

type Rung = {
    n: string;
    name: string;
    trigger: string;
    memory: string;
};

const RUNGS: Rung[] = [
    {
        n: "01",
        name: "Context window",
        trigger: "It jumps to conclusions, can't show its work.",
        memory: "Brief + live findings in the prompt",
    },
    {
        n: "02",
        name: "Scratchpad",
        trigger: "A restart wipes everything, it redoes the whole job.",
        memory: "Working hypothesis written out",
    },
    {
        n: "03",
        name: "Persistent state",
        trigger: "It repeats a mistake, last run is gone.",
        memory: "Investigation #42, step 3/6 saved, survives restart",
    },
    {
        n: "04",
        name: "Episodic memory",
        trigger: "The journal is huge and noisy, patterns are buried.",
        memory: "Recalls how investigation #17 went",
    },
    {
        n: "05",
        name: "Consolidated memory",
        trigger: "Needs the pattern, not a replay of old runs.",
        memory: "Pattern: this signal usually means X",
    },
    {
        n: "06",
        name: "Retrieval (RAG)",
        trigger: "Needs knowledge it never encountered.",
        memory: "Pulls from a knowledge base it didn't write",
    },
];

export default function MemoryLadder() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 flex flex-col gap-3">
            {RUNGS.map((r, i) => {
                const top = i === RUNGS.length - 1;
                return (
                    <motion.div
                        key={r.n}
                        initial={reduce ? false : { opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.07 }}
                        className={`flex items-stretch gap-4 rounded-xl border p-4 sm:p-5 ${
                            top
                                ? "border-cyan-600/60 bg-cyan-50/60 dark:border-amber-500/50 dark:bg-amber-500/5"
                                : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                        }`}
                    >
                        <div className="flex flex-col items-center">
                            <span
                                className={`flex h-9 w-9 items-center justify-center rounded-lg font-mono text-sm font-bold ${
                                    top
                                        ? "bg-cyan-600 text-white dark:bg-amber-500 dark:text-neutral-900"
                                        : "bg-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                                }`}
                            >
                                {r.n}
                            </span>
                            {!top && (
                                <span className="mt-1 w-px flex-1 bg-neutral-200 dark:bg-neutral-700" />
                            )}
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div className="min-w-0">
                                <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                                    {r.name}
                                </div>
                                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                    Trigger: {r.trigger}
                                </div>
                            </div>
                            <div className="shrink-0 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 font-mono text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300 sm:max-w-[55%]">
                                <span className="text-neutral-400 dark:text-neutral-500">remembers: </span>
                                {r.memory}
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
