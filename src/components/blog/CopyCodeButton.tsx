"use client";

import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface CopyCodeButtonProps {
    code: string;
}

export default function CopyCodeButton({ code }: CopyCodeButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="absolute top-3 right-3 p-2 rounded-lg bg-neutral-700/80 dark:bg-neutral-600/80 text-neutral-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-neutral-600 dark:hover:bg-neutral-500"
            aria-label={copied ? "Copied!" : "Copy code"}
        >
            {copied ? (
                <FiCheck className="w-4 h-4 text-green-400" />
            ) : (
                <FiCopy className="w-4 h-4" />
            )}
        </button>
    );
}
