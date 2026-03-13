'use client'
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export function ThemeSwicher() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    const isDark = resolvedTheme === 'dark';
    const toggleSwitch = () => setTheme(isDark ? 'light' : 'dark');

    return (
        <div
            id="theme-switcher"
            className="w-9 sm:w-14 border-black bg-slate-400 rounded-full flex items-center cursor-pointer"
            onClick={toggleSwitch}
        >
            <div
                className={`
                    bg-sky-600 dark:bg-orange-600
                    w-7 h-7 max-sm:w-9 max-sm:h-9
                    rounded-full shadow-md
                    flex items-center justify-center max-sm:text-2xl
                    transition-transform duration-300 ease-in-out
                    ${isDark ? 'translate-x-0' : 'translate-x-0 sm:translate-x-7'}
                `}
            >
                {isDark ? <MdOutlineDarkMode className="text-white" /> : <MdOutlineLightMode className="text-white" />}
            </div>
        </div>
    );
}