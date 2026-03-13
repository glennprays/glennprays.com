"use client"
import Image from 'next/image';
import photoProfile from 'public/images/profile-transparent-bg.png';
import { motion } from "framer-motion";
import { Motions } from '@/utils/motion';

export default function HomePage() {
    return (
        <section className="section-container min-h-[calc(100vh-150px)] flex items-center">
            <motion.div
                viewport={{ once: true, amount: 0.3 }}
                whileInView="show"
                initial="hidden"
                variants={Motions.staggerContainer(0.1, 0.1)}
                className="w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-20"
            >
                <motion.div
                    variants={Motions.fadeUp(0)}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl"
                >
                    <motion.span
                        variants={Motions.fadeUp(0.1)}
                        className="text-lg text-neutral-600 dark:text-neutral-400 mb-2"
                    >
                        Hi, I&apos;m
                    </motion.span>
                    <motion.h1
                        variants={Motions.fadeUp(0.2)}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold text-cyan-600 dark:text-amber-500 mb-6"
                    >
                        Glenn Pray
                    </motion.h1>
                    <motion.p
                        variants={Motions.fadeUp(0.3)}
                        className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-md"
                    >
                        Software Engineering enthusiast with a practical mindset and a strong drive for continuous growth. Experienced in building scalable and efficient software systems.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={Motions.scaleIn(0.2)}
                    className="relative flex-shrink-0"
                >
                    <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-neutral-200 dark:border-neutral-700 shadow-soft bg-neutral-500/20">
                        <Image
                            src={photoProfile}
                            alt="Glenn Pray"
                            priority
                            className="w-full h-full object-cover top-[-10%] relative scale-[1.3]"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}