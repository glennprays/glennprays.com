"use client";

import Image from "next/image";
import { FaCode, FaTools } from "react-icons/fa";
import { stackList, toolsList } from "@/constans/skills";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";

export default function Skills() {
    return (
        <section id="skills" className="section-container">
            <motion.h2
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeUp()}
                className="section-title"
            >
                Skills
            </motion.h2>

            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
                className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12"
            >
                <motion.div
                    variants={Motions.fadeUp(0.1)}
                    className="w-full lg:w-1/2"
                >
                    <SkillCategory
                        title="Tech Stack"
                        icon={<FaCode />}
                        items={stackList}
                    />
                </motion.div>
                <motion.div
                    variants={Motions.fadeUp(0.2)}
                    className="w-full lg:w-1/2"
                >
                    <SkillCategory
                        title="Tools"
                        icon={<FaTools />}
                        items={toolsList}
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

const SkillCategory = ({
    title,
    icon,
    items,
}: {
    title: string;
    icon: React.ReactNode;
    items: Array<{ name: string; icon: StaticImport; alt: string }>;
}) => {
    return (
        <div className="card hover-glow">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-6">
                {icon}
                {title}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-6">
                {items.map(({ name, icon, alt }) => (
                    <SkillItem key={name} name={name} icon={icon} alt={alt} />
                ))}
            </div>
        </div>
    );
};

const SkillItem = ({
    name,
    icon,
    alt,
}: {
    name: string;
    icon: StaticImport;
    alt: string;
}) => {
    return (
        <div className="flex flex-col items-center justify-center text-center hover-lift cursor-default">
            <div className="p-3 rounded-xl bg-neutral-100 dark:bg-neutral-700 mb-2">
                <Image src={icon} alt={alt} width={32} height={32} />
            </div>
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {name}
            </span>
        </div>
    );
};
