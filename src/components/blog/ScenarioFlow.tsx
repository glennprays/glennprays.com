"use client";

import { motion, useReducedMotion } from "framer-motion";

type Tone = "muted" | "danger" | "warn" | "success";

const TONE: Record<Tone, { bar: string; pill: string }> = {
    muted: {
        bar: "border-l-neutral-400 dark:border-l-neutral-600",
        pill: "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300",
    },
    danger: {
        bar: "border-l-red-500",
        pill: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
    },
    warn: {
        bar: "border-l-amber-500",
        pill: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-500",
    },
    success: {
        bar: "border-l-cyan-600 dark:border-l-emerald-500",
        pill: "bg-cyan-100 text-cyan-700 dark:bg-emerald-950/50 dark:text-emerald-400",
    },
};

type Step = { label: string; text: string };
type Scenario = {
    tag: string;
    steps: Step[];
    outcome: string;
    tone: Tone;
};

const SCENARIOS: Scenario[] = [
    {
        tag: "Context only",
        tone: "muted",
        steps: [
            { label: "Setup", text: "The AI has your card, your calendar, and the ticket link." },
            { label: "Action", text: "It reads everything, checks your schedule, and says: \"Found a seat, ordering it now.\"" },
            { label: "Result", text: "Nothing happens. It's a chatbot. It has no hands to actually click checkout." },
        ],
        outcome: "All talk, no action",
    },
    {
        tag: "+ Harness",
        tone: "danger",
        steps: [
            { label: "Setup", text: "Now it gets a browser tool. It opens the link, fills the form, and orders." },
            { label: "Action", text: "The session expires mid-loop. It retries, refills, clicks checkout, but the price already glitched to $300." },
            { label: "Result", text: "It buys the $300 ticket and drains your account. Hands, but no judgment." },
        ],
        outcome: "Account drained",
    },
    {
        tag: "+ Guardrails",
        tone: "warn",
        steps: [
            { label: "Setup", text: "You hardcode one rule: max spend $50." },
            { label: "Action", text: "Same glitch, same retry, it clicks checkout at $300." },
            { label: "Guardrail", text: "The click is blocked instantly: \"price exceeds $50, transaction cancelled.\"" },
            { label: "Result", text: "Your money is safe, but the task is dead." },
        ],
        outcome: "Safe, but stuck",
    },
    {
        tag: "+ Workflow",
        tone: "success",
        steps: [
            { label: "Setup", text: "You wrap the agent in a real plan: verify price against budget; if blocked, loop back, find a cheaper seat, ask a human if needed." },
            { label: "Action", text: "It hits $300 at checkout and doesn't give up. It goes back to seat selection and picks a $30 seat one row over." },
            { label: "Result", text: "Ticket booked. Money 100% safe. The goal, finally reached." },
        ],
        outcome: "Done, and safe",
    },
];

export default function ScenarioFlow() {
    const reduce = useReducedMotion();
    return (
        <div className="not-prose my-8 flex flex-col gap-4">
            {SCENARIOS.map((s, i) => (
                <motion.div
                    key={s.tag}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: reduce ? 0 : i * 0.08 }}
                    className={`rounded-xl border border-neutral-200 border-l-4 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900 ${TONE[s.tone].bar}`}
                >
                    <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="font-mono text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                            {s.tag}
                        </span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${TONE[s.tone].pill}`}>
                            {s.outcome}
                        </span>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {s.steps.map((step) => (
                            <li key={step.label} className="flex gap-3 text-sm">
                                <span className="w-[68px] shrink-0 font-mono text-xs uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                                    {step.label}
                                </span>
                                <span className="text-neutral-700 dark:text-neutral-300">
                                    {step.text}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
    );
}
