"use client";

import { contactList } from "@/constans/contact";
import Link from "next/link";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";

export default function Contact() {
    return (
        <section id="contact" className="section-container">
            <motion.h2
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeUp()}
                className="section-title"
            >
                Contact
            </motion.h2>

            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
                {contactList.map((item, index) => (
                    <motion.div
                        key={item.name}
                        variants={Motions.fadeUp(index * 0.1)}
                    >
                        <ContactCard item={item} />
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

const ContactCard = ({
    item,
}: {
    item: { name: string; username: string; url: string; icon: React.ComponentType };
}) => {
    const { name, username, url, icon: Icon } = item;

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="card hover-lift hover-glow flex items-center gap-4 group"
        >
            <div className="text-4xl text-neutral-600 dark:text-neutral-400 group-hover:text-cyan-600 dark:group-hover:text-amber-500 transition-colors">
                <Icon />
            </div>
            <div className="flex flex-col min-w-0">
                <span className="font-semibold text-lg">{name}</span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                    {username}
                </span>
            </div>
        </Link>
    );
};
