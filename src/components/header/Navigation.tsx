'use client'
import { ThemeSwicher } from "@/components/theme/ThemeSwicher";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { navItems } from "@/constans/navigation";

export const Navigation = () => {
    const [isOnTop, setIsOnTop] = useState(true);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [prevY, setPrevY] = useState(0);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    useEffect(() => {
        if (isHamburgerOpen) {
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
    }, [isHamburgerOpen])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollingDown = prevY < currentScrollPos;
            setIsOnTop(currentScrollPos === 0);
            setIsScrollingDown(scrollingDown && currentScrollPos > 100);
            setPrevY(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [prevY])

    return (
        <motion.nav
            initial={{ y: 0 }}
            transition={{
                duration: 0.23,
                type: 'tween'
            }}
            animate={{ y: isScrollingDown ? -100 : 0 }}
            className={`fixed top-0 left-0 w-full py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between z-50 select-none transition-all duration-300 ${isOnTop
                ? 'bg-transparent'
                : 'bg-neutral-200/80 dark:bg-neutral-900/80 backdrop-blur-md'
                }`}
        >
            <Link
                id="logo"
                href='/'
                className="font-mono font-bold text-xl md:text-2xl select-none hover:text-cyan-600 dark:hover:text-amber-500 transition-colors"
            >
                glennprays;
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-amber-500 transition-colors min-h-[44px] flex items-center"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <ThemeSwicher />
                <div className="lg:hidden">
                    <Hamburger isOpen={isHamburgerOpen} setIsOpen={setIsHamburgerOpen} />
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isHamburgerOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-full left-0 w-full bg-neutral-200/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800"
                    >
                        <div className="flex flex-col py-4 px-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsHamburgerOpen(false)}
                                    className="py-3 text-lg font-medium text-neutral-700 dark:text-neutral-200 hover:text-cyan-600 dark:hover:text-amber-500 transition-colors min-h-[44px] flex items-center border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
};
