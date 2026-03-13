"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Motions } from "@/utils/motion";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export default function AnimatedSection({
    children,
    className = "",
    delay = 0,
}: AnimatedSectionProps) {
    return (
        <motion.div
            variants={Motions.fadeUp(delay)}
            initial="hidden"
            animate="show"
            className={className}
        >
            {children}
        </motion.div>
    );
}
