"use client";

import Image from "next/image";
import { BiSolidRightArrowCircle, BiCodeAlt } from "react-icons/bi";
import { MdMoreHoriz } from "react-icons/md";
import { useState } from "react";
import { portfolioItems, PortfolioItem } from "@/constans/portfolio";
import BackdropModal from "@/components/modal/BackdropModal";
import Link from "next/link";
import { SkillItem } from "@/constans/skills";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";

export default function Portfolio() {
    return (
        <section id="portfolio" className="section-container">
            <motion.h2
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeUp()}
                className="section-title"
            >
                Portfolio
            </motion.h2>

            <motion.div
                viewport={{ once: true, amount: 0.1 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
                {portfolioItems.map((item, index) => (
                    <motion.div
                        key={item.title}
                        variants={Motions.fadeUp(index * 0.1)}
                    >
                        <PortfolioItemDiv item={item} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

const PortfolioItemDiv = ({ item }: { item: PortfolioItem }) => {
    const { title, tumbnail, stacks, description, resourceUrl, moreUrl } = item;
    const [open, setOpen] = useState(false);

    return (
        <>
            <BackdropModal
                open={open}
                setOpen={setOpen}
                closeButton
                backdropActive
            >
                <div className="w-[90vw] max-w-lg flex flex-col gap-4 p-4">
                    <Image
                        src={tumbnail}
                        width={0}
                        height={0}
                        alt={title}
                        sizes="(max-width: 768px) 90vw, 500px"
                        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-700"
                    />
                    <div className="flex gap-2 flex-wrap">
                        {stacks?.map((stack) => (
                            <StackItem key={stack.name} stack={stack} />
                        ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                            {description}
                        </p>
                    </div>
                    <div className="flex justify-end gap-3 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                        {moreUrl && (
                            <Link href={moreUrl} target="_blank">
                                <button className="rounded-lg py-2 px-4 text-sm font-medium bg-cyan-600 hover:bg-cyan-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white flex gap-2 items-center transition-colors">
                                    More <MdMoreHoriz />
                                </button>
                            </Link>
                        )}
                        {resourceUrl && (
                            <Link href={resourceUrl} target="_blank">
                                <button className="rounded-lg py-2 px-4 text-sm font-medium border border-neutral-300 dark:border-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex gap-2 items-center transition-colors">
                                    Resource <BiCodeAlt />
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </BackdropModal>

            <div
                className="card hover-lift hover-glow cursor-pointer group"
                onClick={() => setOpen(true)}
            >
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-700">
                    <Image
                        src={tumbnail}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <h3 className="font-semibold text-xl mb-3">{title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                    {stacks?.slice(0, 4).map((stack) => (
                        <StackItem key={stack.name} stack={stack} />
                    ))}
                    {stacks && stacks.length > 4 && (
                        <span className="text-xs text-neutral-500 self-center">
                            +{stacks.length - 4} more
                        </span>
                    )}
                </div>
                <button className="text-sm font-medium text-cyan-600 dark:text-amber-500 flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details
                    <BiSolidRightArrowCircle className="text-base" />
                </button>
            </div>
        </>
    );
};

const StackItem = ({ stack: { name, icon, alt } }: { stack: SkillItem }) => {
    return (
        <span className="inline-flex items-center gap-1 text-xs bg-neutral-100 dark:bg-neutral-700 rounded-full px-2 py-1">
            <Image src={icon} alt={alt} width={14} height={14} />
            {name}
        </span>
    );
};