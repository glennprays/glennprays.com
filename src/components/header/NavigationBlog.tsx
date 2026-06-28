"use client";
import { ThemeSwicher } from "@/components/theme/ThemeSwicher";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Hamburger from "./Hamburger";
import { navItemsBlog } from "@/constans/navigation";
import { SearchBlog } from "../search/SearchBlog";

export const NavigationBlog = () => {
    const [isOnTop, setIsOnTop] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [prevY, setPrevY] = useState(0);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

    useEffect(() => {
        if (isHamburgerOpen) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [isHamburgerOpen]);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;
            const scrollingDown = prevY < currentScrollPos;
            setIsOnTop(currentScrollPos === 0);
            setIsScrollingDown(scrollingDown);
            setPrevY(currentScrollPos);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevY]);
    return (
        <motion.nav
            initial={{ y: 0 }}
            transition={{
                duration: 0.23,
                type: "tween",
            }}
            animate={{ y: isScrollingDown ? -100 : 0 }}
            className={
                "bg-neutral-200 dark:bg-neutral-900 fixed top-0 left-0 w-full py-5 px-8 md:px-24 flex items-center justify-between z-50 bg-inherit select-none " +
                (isOnTop || isHamburgerOpen ? "opacity-100" : "opacity-90")
            }
        >
            <div className="flex gap-9 bg-neutral-200 dark:bg-neutral-900">
                <Link
                    id="logo"
                    href="/blog"
                    className="font-mono font-bold text-lg sm:text-2xl select-none"
                >
                    glennprays;
                    <span className="font-light">
                        |
                        <span className="font-sans text-base sm:text-xl">
                            Blog
                        </span>
                    </span>
                </Link>
                <div
                    className={
                        "flex gap-7 items-center px-8 md:px-24 xl:px-0 w-7/12 max-xl:w-full text-xl max-xl:absolute max-xl:left-0 max-xl:top-0 max-xl:mt-[76px] transition-all max-xl:overflow-x-hidden max-xl:overflow-y-auto max-xl:bg-inherit max-xl:flex-col max-xl:items-start max-xl:justify-start max-xl:gap-4 " +
                        (isHamburgerOpen
                            ? "max-xl:py-5 max-xl:h-[calc(100vh-76px)]"
                            : "max-xl:h-0 max-xl:py-0")
                    }
                >
                    <div className="min-[921px]:hidden justify-self-center mx-auto text-[17px]">
                        <SearchBlog />
                    </div>
                    {navItemsBlog.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsHamburgerOpen(false)}
                            className={
                                "text-base font-medium text-neutral-600 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-amber-500 transition-colors "
                            }
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <div className="hidden min-[921px]:block">
                    <SearchBlog />
                </div>
                <ThemeSwicher />
            </div>
            <Hamburger
                isOpen={isHamburgerOpen}
                setIsOpen={setIsHamburgerOpen}
            />
        </motion.nav>
    );
};
