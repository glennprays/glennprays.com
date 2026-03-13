"use client";

import Image from "next/image";
import { coreExpertise, engineeringCapabilities, techStackGroups, SkillItem } from "@/constans/skills";
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

            {/* Core Expertise Section */}
            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
                className="mb-12"
            >
                <motion.h3
                    variants={Motions.fadeUp(0.1)}
                    className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6"
                >
                    Core Expertise
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coreExpertise.map((item, index) => (
                        <ExpertiseItem
                            key={item.title}
                            title={item.title}
                            description={item.description}
                            index={index}
                        />
                    ))}
                </div>
            </motion.div>

            {/* Engineering Capabilities Section */}
            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.05, 0.2)}
                className="mb-12"
            >
                <motion.h3
                    variants={Motions.fadeUp(0.1)}
                    className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6"
                >
                    Engineering Capabilities
                </motion.h3>
                <div className="flex flex-wrap gap-3">
                    {engineeringCapabilities.map((capability, index) => (
                        <CapabilityTag key={capability} label={capability} index={index} />
                    ))}
                </div>
            </motion.div>

            {/* Technology Stack Section */}
            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
            >
                <motion.h3
                    variants={Motions.fadeUp(0.1)}
                    className="text-lg font-semibold text-neutral-700 dark:text-neutral-300 mb-6"
                >
                    Technology Stack
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <TechStackGroup label="Languages" items={techStackGroups.languages} />
                    <TechStackGroup label="Frontend" items={techStackGroups.frontend} />
                    <TechStackGroup label="Backend" items={techStackGroups.backend} />
                    <TechStackGroup label="Databases" items={techStackGroups.databases} />
                    <TechStackGroup label="Cloud & Infra" items={techStackGroups.cloudInfra} />
                    <TechStackGroup label="Tooling" items={techStackGroups.tooling} />
                </div>
            </motion.div>
        </section>
    );
}

const ExpertiseItem = ({
    title,
    description,
    index,
}: {
    title: string;
    description: string;
    index: number;
}) => {
    return (
        <motion.div
            variants={Motions.fadeUp(0.1 + index * 0.05)}
            className="card hover-lift"
        >
            <h4 className="text-base font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
                {title}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    );
};

const CapabilityTag = ({ label, index }: { label: string; index: number }) => {
    return (
        <motion.span
            variants={Motions.fadeUp(0.05 + index * 0.02)}
            className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors cursor-default"
        >
            {label}
        </motion.span>
    );
};

const TechStackGroup = ({
    label,
    items,
}: {
    label: string;
    items: SkillItem[];
}) => {
    return (
        <div className="card">
            <h4 className="text-sm font-semibold text-neutral-500 dark:text-neutral-500 uppercase tracking-wide mb-4">
                {label}
            </h4>
            <div className="flex flex-wrap gap-3">
                {items.map(({ name, icon, alt }) => (
                    <TechItem key={name} name={name} icon={icon} alt={alt} />
                ))}
            </div>
        </div>
    );
};

const TechItem = ({
    name,
    icon,
    alt,
}: {
    name: string;
    icon: SkillItem["icon"];
    alt: string;
}) => {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 transition-colors cursor-default">
            <Image src={icon} alt={alt} width={18} height={18} />
            <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {name}
            </span>
        </div>
    );
};
