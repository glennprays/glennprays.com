"use client";

import { motion, useReducedMotion } from "framer-motion";

type Row = { layer: string; when: string; up: string; down: string };

const ROWS: Row[] = [
    {
        layer: "1. Context window",
        when: "Always, it's the baseline",
        up: "Zero infra, instant",
        down: "Tiny, ephemeral, over-stuffing hurts",
    },
    {
        layer: "2. Scratchpad",
        when: "The task needs real steps, not one blind leap",
        up: "Big quality lift, still no infra",
        down: "Eats tokens, wiped on restart",
    },
    {
        layer: "3. Persistent state",
        when: "Work must survive a restart or span runs",
        up: "Continuity, you own and query it",
        down: "You maintain the schema, it's dumb storage",
    },
    {
        layer: "4. Episodic",
        when: "It repeats past mistakes, or past runs would help",
        up: "Learns from experience",
        down: "Grows fast and noisy, retrieval drags back junk",
    },
    {
        layer: "5. Consolidated",
        when: "The log's too big, you want patterns not replays",
        up: "Compact, generalizes, reusable",
        down: "Hardest to get right, bad lessons bake in",
    },
    {
        layer: "6. Retrieval / RAG",
        when: "Big external corpus, knowledge it never met",
        up: "Unbounded knowledge, no window stuffing",
        down: "Heaviest, most fragile, reached for too early",
    },
];

const TH =
    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400";
const TD = "px-4 py-3 align-top text-neutral-700 dark:text-neutral-300";

export default function CheatSheet() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
            <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-800/50">
                        <th className={TH}>Layer</th>
                        <th className={TH}>Use it when</th>
                        <th className={TH}>Upside</th>
                        <th className={TH}>Downside</th>
                    </tr>
                </thead>
                <tbody>
                    {ROWS.map((r, i) => (
                        <motion.tr
                            key={r.layer}
                            initial={reduce ? false : { opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.3, delay: reduce ? 0 : i * 0.06 }}
                            className="border-t border-neutral-100 dark:border-neutral-800"
                        >
                            <td className={`px-4 py-3 align-top font-semibold text-neutral-900 dark:text-neutral-100`}>
                                {r.layer}
                            </td>
                            <td className={TD}>{r.when}</td>
                            <td className={TD}>{r.up}</td>
                            <td className={TD}>{r.down}</td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
