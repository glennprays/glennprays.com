"use client";

import { motion, useReducedMotion } from "framer-motion";

const CELLS = [
    { term: "Context", role: "the goal", desc: "What you're trying to do, and everything the model needs to know about it." },
    { term: "Harness", role: "the power", desc: "The hands and senses to actually act in the world." },
    { term: "Guardrails", role: "the safety", desc: "The hard limits that stop the agent before it does damage." },
    { term: "Workflow", role: "the strategy", desc: "The plan that routes around failure and reaches the goal anyway." },
];

export default function ConceptGrid() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CELLS.map((c, i) => (
                <motion.div
                    key={c.term}
                    initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.35, delay: reduce ? 0 : i * 0.07 }}
                    className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                >
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-neutral-800 dark:text-neutral-100">
                            {c.term}
                        </span>
                        <span className="font-mono text-xs text-cyan-600 dark:text-amber-500">
                            {c.role}
                        </span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {c.desc}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}
