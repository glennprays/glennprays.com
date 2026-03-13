"use client";

import { motion } from "framer-motion";
import { Motions } from "@/utils/motion";
import { MdMail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa6";
import Link from "next/link";

export default function Resume() {
    // Email configuration (from existing contact.ts)
    const email = "glennsagala@gmail.com";
    const linkedInUrl = "https://www.linkedin.com/in/glennprays/";

    // Pre-filled email template with URL encoding
    const subject = encodeURIComponent("Resume Request — Glenn");
    const body = encodeURIComponent(`Hello Glenn,

I would like to request your resume.

Name:
Company / Organization:
Role or Opportunity:
Location (if applicable):

Purpose of contact:
[Recruitment / Collaboration / Networking / Other]

Additional details:
[Optional message]

Best regards,
[Your Name]`);

    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

    return (
        <section id="resume" className="section-container">
            <motion.h2
                viewport={{ once: true, amount: 0.3 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.fadeUp()}
                className="section-title"
            >
                Resume
            </motion.h2>

            <motion.div
                viewport={{ once: true, amount: 0.2 }}
                initial="hidden"
                whileInView="show"
                variants={Motions.staggerContainer(0.1, 0.2)}
                className="max-w-2xl mx-auto text-center"
            >
                {/* Context explanation */}
                <motion.p
                    variants={Motions.fadeUp(0.1)}
                    className="text-neutral-600 dark:text-neutral-400 mb-8 text-lg"
                >
                    To ensure I provide the most relevant version, my resume is shared upon request.
                </motion.p>

                {/* Primary CTA button */}
                <motion.div variants={Motions.fadeUp(0.2)} className="mb-6">
                    <Link
                        href={mailtoLink}
                        className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors duration-300"
                    >
                        <MdMail className="text-2xl" />
                        Request Resume
                    </Link>
                </motion.div>

                {/* Secondary LinkedIn link */}
                <motion.div variants={Motions.fadeUp(0.3)}>
                    <Link
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors duration-300"
                    >
                        <FaLinkedin className="text-lg" />
                        <span>Or connect with me on LinkedIn</span>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
