import { ReactNode } from "react";

export function Stat({
    value,
    label,
    children,
}: {
    value?: ReactNode;
    label: string;
    children?: ReactNode;
}) {
    return (
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="text-3xl font-bold text-cyan-600 dark:text-amber-500">
                {children ?? value}
            </div>
            <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {label}
            </div>
        </div>
    );
}

export function StatBand({ children }: { children: ReactNode }) {
    return (
        <div className="not-prose my-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {children}
        </div>
    );
}

export default StatBand;
