"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";

interface AnimatedPostContentProps {
    children: ReactNode;
    className?: string;
}

export default function AnimatedPostContent({
    children,
    className = "",
}: AnimatedPostContentProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
