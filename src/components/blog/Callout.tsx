import { ReactNode } from "react";
import { FiInfo, FiAlertTriangle, FiCheckCircle, FiZap } from "react-icons/fi";

type Variant = "note" | "info" | "warning" | "success";

const styles: Record<
    Variant,
    { wrap: string; icon: string; Icon: typeof FiInfo }
> = {
    note: {
        wrap: "border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800/50",
        icon: "text-neutral-500 dark:text-neutral-400",
        Icon: FiZap,
    },
    info: {
        wrap: "border-cyan-300 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/30",
        icon: "text-cyan-600 dark:text-cyan-400",
        Icon: FiInfo,
    },
    warning: {
        wrap: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
        icon: "text-amber-600 dark:text-amber-500",
        Icon: FiAlertTriangle,
    },
    success: {
        wrap: "border-emerald-300 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/30",
        icon: "text-emerald-600 dark:text-emerald-400",
        Icon: FiCheckCircle,
    },
};

export default function Callout({
    variant = "note",
    title,
    children,
}: {
    variant?: Variant;
    title?: string;
    children: ReactNode;
}) {
    const s = styles[variant];
    const Icon = s.Icon;
    return (
        <div
            className={`not-prose my-6 flex gap-3 rounded-xl border p-4 ${s.wrap}`}
        >
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.icon}`} />
            <div className="min-w-0 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                {title && (
                    <p className="mb-1 font-semibold text-neutral-900 dark:text-neutral-100">
                        {title}
                    </p>
                )}
                <div className="[&>p]:m-0 [&>p+p]:mt-2">{children}</div>
            </div>
        </div>
    );
}
