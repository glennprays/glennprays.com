"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
    FiTool,
    FiBookOpen,
    FiBox,
    FiCheckSquare,
    FiAlertOctagon,
    FiActivity,
} from "react-icons/fi";
import { IconType } from "react-icons";

type Part = { Icon: IconType; body: string; name: string; desc: string };

const PARTS: Part[] = [
    { Icon: FiTool, body: "the hands", name: "Tool Registry", desc: "Lets the agent actually do things: open a link, click a button, run a command. Without it, the model is just talking." },
    { Icon: FiBookOpen, body: "the notebook", name: "State & Memory", desc: "External storage that tracks progress, so the agent survives a restart and doesn't forget what it already did." },
    { Icon: FiBox, body: "the sandbox", name: "Execution Runtime", desc: "An isolated space to run tools and code, so a bad step can't wreck the real machine or do something destructive." },
    { Icon: FiCheckSquare, body: "the critic", name: "Verification Engine", desc: "Proves the work really happened before moving on. Guardrails prevent; this one reacts and checks for hallucination." },
    { Icon: FiAlertOctagon, body: "the panic button", name: "Human-in-the-Loop", desc: "An approval gate for the high-impact, irreversible decisions. The safety net when judgment really matters." },
    { Icon: FiActivity, body: "the black box", name: "Telemetry & Cost", desc: "Logs every prompt, tool call, and dollar spent, so you can debug what happened and kill it if it blows the budget." },
];

export default function HarnessAnatomy() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PARTS.map((p, i) => {
                const Icon = p.Icon;
                return (
                    <motion.div
                        key={p.name}
                        initial={reduce ? false : { opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: reduce ? 0 : i * 0.06 }}
                        className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                    >
                        <div className="mb-3 flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-600 text-white dark:bg-amber-500 dark:text-neutral-900">
                                <Icon className="h-5 w-5" />
                            </span>
                            <div>
                                <div className="font-mono text-[11px] uppercase tracking-wider text-cyan-600 dark:text-amber-500">
                                    {p.body}
                                </div>
                                <div className="font-semibold text-neutral-800 dark:text-neutral-100">
                                    {p.name}
                                </div>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                            {p.desc}
                        </p>
                    </motion.div>
                );
            })}
        </div>
    );
}
