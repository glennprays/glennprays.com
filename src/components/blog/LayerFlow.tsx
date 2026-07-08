type LayerKey = "context" | "scratch" | "state" | "episodic" | "consolidated" | "rag";

type IO = { what: string; where: string } | null;

const LAYERS: Record<LayerKey, { read: IO; write: IO }> = {
    context: {
        read: { what: "The full conversation", where: "resent on every call" },
        write: null,
    },
    scratch: {
        read: null,
        write: { what: "Reasoning and scratch notes", where: "into the window, before it answers" },
    },
    state: {
        read: { what: "Saved task state", where: "from your datastore" },
        write: { what: "Updated task state", where: "back to your datastore" },
    },
    episodic: {
        read: { what: "Similar past runs", where: "pulled from the journal" },
        write: { what: "This run's outcome", where: "appended to the journal" },
    },
    consolidated: {
        read: { what: "Distilled lessons", where: "from the lessons store" },
        write: { what: "Refined lessons", where: "merged in over time" },
    },
    rag: {
        read: { what: "Matching chunks", where: "vector search over the corpus" },
        write: null,
    },
};

function Slot({ kind, io }: { kind: "read" | "write"; io: IO }) {
    const isRead = kind === "read";
    const dot = isRead ? "bg-cyan-500" : "bg-amber-500";
    const label = isRead ? "Reads in" : "Writes out";
    return (
        <div className="flex-1 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
                {label}
            </div>
            {io ? (
                <div>
                    <div className="text-sm font-medium leading-snug text-neutral-800 dark:text-neutral-200">
                        {io.what}
                    </div>
                    <div className="mt-0.5 text-xs leading-snug text-neutral-500 dark:text-neutral-400">
                        {io.where}
                    </div>
                </div>
            ) : (
                <p className="text-xs italic text-neutral-400 dark:text-neutral-600">
                    {isRead ? "nothing new read in" : "nothing written out"}
                </p>
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
            <Slot kind="read" io={data.read} />
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
            <Slot kind="write" io={data.write} />
        </div>
    );
}
