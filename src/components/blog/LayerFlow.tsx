type LayerKey = "context" | "scratch" | "state" | "episodic" | "consolidated" | "rag";

const LAYERS: Record<LayerKey, { read: string[]; write: string[] }> = {
    context: { read: ["full conversation", "resent every call"], write: [] },
    scratch: { read: [], write: ["scratch notes", "reasoning before the answer"] },
    state: { read: ["saved state", "read from store"], write: ["updated state", "written to store"] },
    episodic: { read: ["similar past runs", "from the log"], write: ["this run", "appended to log"] },
    consolidated: { read: ["distilled lessons", "from lessons store"], write: ["lessons refined", "over time"] },
    rag: { read: ["matching chunks", "vector search over corpus"], write: [] },
};

function Slot({ label, dot, items }: { label: string; dot: string; items: string[] }) {
    const empty = items.length === 0;
    return (
        <div className="flex-1 rounded-lg border border-neutral-200 bg-white p-2.5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
                {label}
            </div>
            {empty ? (
                <p className="text-xs italic text-neutral-400 dark:text-neutral-600">nothing</p>
            ) : (
                <ul className="flex flex-col gap-1">
                    {items.map((it) => (
                        <li
                            key={it}
                            className="rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                        >
                            {it}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const arrowClass = "flex items-center justify-center text-neutral-300 dark:text-neutral-600";

export default function LayerFlow({ layer }: { layer: LayerKey }) {
    const data = LAYERS[layer];
    if (!data) return null;
    return (
        <div className="not-prose my-6 flex flex-col items-stretch gap-1 sm:flex-row sm:items-center sm:gap-2">
            <Slot label="read" dot="bg-cyan-500" items={data.read} />
            <div className={arrowClass}>
                <span className="rotate-90 sm:rotate-0">&rarr;</span>
            </div>
            <div className="flex items-center justify-center">
                <span className="rounded-md bg-cyan-600 px-3 py-1.5 text-[11px] font-bold tracking-wide text-white dark:bg-amber-500 dark:text-neutral-900">
                    MODEL
                </span>
            </div>
            <div className={arrowClass}>
                <span className="rotate-90 sm:rotate-0">&rarr;</span>
            </div>
            <Slot label="write" dot="bg-amber-500" items={data.write} />
        </div>
    );
}
