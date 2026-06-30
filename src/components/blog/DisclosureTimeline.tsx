type Item = { when: string; event: string };

export default function DisclosureTimeline({ items }: { items: Item[] }) {
    return (
        <ol className="not-prose my-8 list-none space-y-0 pl-0">
            {items.map((item, i) => (
                <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
                    {/* rail */}
                    {i !== items.length - 1 && (
                        <span className="absolute left-[5px] top-3 h-full w-px bg-neutral-200 dark:bg-neutral-700" />
                    )}
                    <span className="mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-cyan-600 bg-white dark:border-amber-500 dark:bg-neutral-950" />
                    <div className="min-w-0">
                        <div className="font-mono text-xs uppercase tracking-wider text-cyan-600 dark:text-amber-500">
                            {item.when}
                        </div>
                        <div className="mt-0.5 text-sm text-neutral-700 dark:text-neutral-300">
                            {item.event}
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}
