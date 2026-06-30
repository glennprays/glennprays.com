"use client";

import { motion, useReducedMotion } from "framer-motion";

type Stage = { n: string; name: string; note: string; desc: string; accent?: boolean };

const STAGES: Stage[] = [
    { n: "01", name: "Prompt Engineering", note: "~4k tokens", desc: "Windows were tiny, so you fought for every word. Craft the one perfect instruction." },
    { n: "02", name: "Context Engineering", note: "~128k tokens", desc: "Windows got huge. Now you feed the model everything it needs to actually understand the situation." },
    { n: "03", name: "Harness Engineering", note: "context + constraints + feedback", desc: "Context isn't enough. You give the model a body: tools, rules, and a loop to act in.", accent: true },
];

export default function Progression() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STAGES.map((s, i) => (
                <motion.div
                    key={s.name}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.1 }}
                    className={`rounded-xl border p-5 ${
                        s.accent
                            ? "border-cyan-300 bg-cyan-50 dark:border-amber-800 dark:bg-amber-950/20"
                            : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                    }`}
                >
                    <div className="mb-2 flex items-baseline gap-2">
                        <span className={`font-mono text-xs ${s.accent ? "text-cyan-600 dark:text-amber-500" : "text-neutral-400 dark:text-neutral-500"}`}>
                            {s.n}
                        </span>
                        <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                            {s.name}
                        </span>
                    </div>
                    <div className={`mb-2 font-mono text-xs ${s.accent ? "text-cyan-600 dark:text-amber-500" : "text-neutral-500 dark:text-neutral-400"}`}>
                        {s.note}
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {s.desc}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
