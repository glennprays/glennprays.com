"use client";

import { motion, useReducedMotion } from "framer-motion";

// The agent loop: model decides -> harness acts on the world -> world answers
// -> back to the model. A pulse orbits the loop to show it never stops.

const CENTER = { x: 170, y: 160 };
const R = 108;
// node angles (deg), clockwise from top
const NODES = [
    { label: "Model", sub: "the brain", angle: -90 },
    { label: "Harness", sub: "the body", angle: 30 },
    { label: "Environment", sub: "the world", angle: 150 },
];

function pos(angle: number, r = R) {
    const a = (angle * Math.PI) / 180;
    return { x: CENTER.x + r * Math.cos(a), y: CENTER.y + r * Math.sin(a) };
}

export default function AgentLoop() {
    const reduce = useReducedMotion();
    return (
        <figure className="not-prose my-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <svg viewBox="0 0 340 320" className="mx-auto w-full max-w-[420px]">
                {/* loop track */}
                <circle
                    cx={CENTER.x}
                    cy={CENTER.y}
                    r={R}
                    fill="none"
                    strokeDasharray="3 7"
                    className="stroke-neutral-300 dark:stroke-neutral-700"
                    strokeWidth={2}
                />
                {/* direction arrows on the track */}
                {NODES.map((n) => {
                    const p = pos(n.angle + 60);
                    return (
                        <polygon
                            key={`arr-${n.label}`}
                            points="-5,-4 5,0 -5,4"
                            className="fill-neutral-400 dark:fill-neutral-600"
                            transform={`translate(${p.x} ${p.y}) rotate(${n.angle + 60 + 90})`}
                        />
                    );
                })}

                {/* orbiting pulse */}
                <motion.g
                    style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
                    animate={reduce ? undefined : { rotate: 360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                    <circle
                        cx={pos(-90).x}
                        cy={pos(-90).y}
                        r={7}
                        className="fill-cyan-600 dark:fill-amber-500"
                    />
                </motion.g>

                {/* nodes */}
                {NODES.map((n) => {
                    const p = pos(n.angle);
                    return (
                        <g key={n.label}>
                            <circle
                                cx={p.x}
                                cy={p.y}
                                r={34}
                                className="fill-white stroke-neutral-300 dark:fill-neutral-800 dark:stroke-neutral-700"
                                strokeWidth={1.5}
                            />
                            <text
                                x={p.x}
                                y={p.y - 2}
                                textAnchor="middle"
                                className="fill-neutral-800 text-[13px] font-semibold dark:fill-neutral-100"
                            >
                                {n.label}
                            </text>
                            <text
                                x={p.x}
                                y={p.y + 13}
                                textAnchor="middle"
                                className="fill-neutral-500 text-[10px] dark:fill-neutral-400"
                            >
                                {n.sub}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <figcaption className="mt-2 text-center text-sm text-neutral-500 dark:text-neutral-400">
                An agent is just this loop, running on its own: decide, act, observe, repeat.
            </figcaption>
        </figure>
    );
}
