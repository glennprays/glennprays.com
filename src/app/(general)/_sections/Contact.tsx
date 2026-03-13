"use client";

import { contactList } from "@/constans/contact";
import Link from "next/link";
import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";

export default function Contact() {
    return (
        <section id="contact" className="section-container">
            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeIn("up", "tween", 0.2, 0.5)}
                className="text-center mb-12"
            >
                <h2 className="section-title">Contact</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mt-4 max-w-2xl mx-auto">
                    Feel free to reach out through any of these platforms. I&apos;m always open to discussing new opportunities.
                </p>
            </motion.div>

            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.3)}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
                {contactList.map((item, index) => (
                    <motion.div
                        key={item.name}
                        variants={Motions.fadeIn("up", "tween", index * 0.1, 0.5)}
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
    item: { name: string; username: string; url: string; icon: React.ComponentType<{ className?: string }> };
}) => {
    const { name, username, url, icon: Icon } = item;
    const isPrimary = name.toLowerCase() === "email";

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                group block p-6 rounded-2xl transition-all duration-300
                ${isPrimary
                    ? "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border-2 border-cyan-200 dark:border-cyan-800"
                    : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
                }
                hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/10 dark:hover:shadow-amber-500/10
            `}
        >
            <div className={`
                w-14 h-14 rounded-xl flex items-center justify-center mb-4
                ${isPrimary
                    ? "bg-gradient-to-br from-cyan-500 to-blue-500 text-white"
                    : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 group-hover:bg-cyan-100 dark:group-hover:bg-cyan-900/30 group-hover:text-cyan-600 dark:group-hover:text-amber-500"
                }
                transition-all duration-300
            `}>
                <Icon className="text-2xl" />
            </div>

            <h3 className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 mb-1">
                {name}
            </h3>

            <p className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                {username}
            </p>

            {isPrimary && (
                <span className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-cyan-600 dark:text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Preferred contact
                </span>
            )}
        </Link>
    );
};
