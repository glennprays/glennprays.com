"use client";
import Image from "next/image";
import { BiSolidRightArrowCircle, BiCodeAlt } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { MdMoreHoriz } from "react-icons/md";
import { useEffect, useState } from "react";
import { portfolioItems, PortfolioItem } from "@/constans/portfolio";
import BackdropModal from "@/components/modal/BackdropModal";
import Link from "next/link";
import { SkillItem } from "@/constans/skills";

export default function Portfolio() {
    const [screenWidth, setScreenWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );
    const [overflow, setOverflow] = useState(false);
    const [open, setOpen] = useState(false);
    const [closeY, setCloseY] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const parent = document.getElementById("portfolio");
        const child = document.getElementById("portfolio-content");

        if (parent && child && !open) {
            setOverflow(parent.clientHeight < child.clientHeight);
        }
    }, [screenWidth, open]);

    useEffect(() => {
        if (overflow) {
            setOpen(false);
        }
    }, [overflow]);

    function handleOpen() {
        if (open) {
            window.scroll(window.scrollX, closeY);
        } else {
            setCloseY(window.scrollY);
        }
        setOpen(!open);
    }

    return (
        <div
            id="portfolio"
            className={`container mx-auto flex flex-col items-center justify-start py-20 gap-5 overflow-y-hidden transition-all relative ${open ? "h-fit" : "h-screen"
                }`}
        >
            <h2 className="text-5xl font-bold">Portfolio</h2>
            <div id="portfolio-content">
                <div className="py-5 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-5 w-full">
                    {portfolioItems.map((item, index) => (
                        <PortfolioItemDiv key={item.title} item={item} />
                    ))}
                </div>
            </div>
            <div className="p-10 h-32 w-full absolute bottom-0 bg-gradient-to-t from-neutral-200 dark:from-neutral-900 to-transparent flex justify-center items-center">
                <button
                    className={`rounded-full py-1 px-3 text-white text-lg font-medium bg-sky-600 dark:bg-orange-600 flex gap-1 items-center ${overflow ? "visible" : "invisible"
                        }`}
                    onClick={handleOpen}
                >
                    {open ? (
                        <>
                            Show less <IoMdArrowDropup />
                        </>
                    ) : (
                        <>
                            Show more <IoMdArrowDropdown />
                        </>
                    )}
                </button>
            </div>
        </div>
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
                <div className="xl:w-[550px] sm:w-[330px] w-[300px] flex flex-col justify-start items-center gap-3 my-3">
                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[420px]">
                        <section>
                            <Image
                                src={tumbnail}
                                width="0"
                                height="0"
                                alt={title}
                                className="w-full rounded-lg border border-neutral-400 dark:border-neutral-200"
                            />
                        </section>
                        <div className="flex gap-1 flex-wrap">
                            {stacks?.map((stack, index) => (
                                <StackItem key={stack.name} stack={stack} />
                            ))}
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <span className="font-semibold text-xl">
                                Description
                            </span>
                            <div className="w-full rounded-lg border-neutral-400">
                                {description}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-3 bg-neutral-200 border-t-2 border-neutral-400 dark:border-neutral-500 w-full dark:bg-neutral-900">

                        {
                            moreUrl &&
                            <Link href={moreUrl} target="_blank" className="pb-0 pt-4 flex justify-end">
                                <button className="rounded-full py-2 xl:py-2 px-3 text-sm xl:text-lg font-semibold bg-sky-600 hover:bg-sky-800 dark:bg-orange-600 dark:hover:bg-orange-800 text-white flex gap-1 items-center">
                                    More <MdMoreHoriz />
                                </button>
                            </Link>
                        }
                        {
                            resourceUrl &&
                            <Link href={resourceUrl} target="_blank" className="pb-0 pt-4 flex justify-end">
                                <button className="rounded-full py-2 xl:py-2 px-3 text-sm xl:text-lg font-semibold bg-sky-600 hover:bg-sky-800 dark:bg-orange-600 dark:hover:bg-orange-800 text-white flex gap-1 items-center">
                                    Resource <BiCodeAlt />
                                </button>
                            </Link>
                        }


                    </div>
                </div>
            </BackdropModal >
            <div className="w-[295px] sm:w-[390px] py-7 px-5 sm:px-8 border mx-auto shadow-md border-slate-400 dark:border-zinc-800 dark:shadow-zinc-800 rounded-xl flex flex-col items-center gap-3 cursor-pointer">
                <div className="w-[240px] h-[130px] sm:w-[320px] sm:h-[185px] rounded-md overflow-hidden border-2 border-slate-500 dark:border-zinc-800 relative select-none">
                    <Image src={tumbnail} alt={title} fill />
                </div>
                <span className="font-semibold text-2xl">{title}</span>
                <div className="w-full flex flex-wrap gap-2 justify-center">
                    {stacks?.map((stack, index) => (
                        <StackItem key={stack.name} stack={stack} />
                    ))}
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className=" mt-3 rounded-lg px-4 py-2 border border-gray-500 flex items-center text-xl gap-1 transition-colors hover:bg-sky-600 hover:dark:bg-orange-600 hover:border-transparent hover:text-white"
                >
                    Details <BiSolidRightArrowCircle />
                </button>
            </div>
        </>
    );
};

const StackItem = ({ stack: { name, icon, alt } }: { stack: SkillItem }) => {
    return (
        <div
            key={name}
            className=" bg-neutral-100 dark:bg-neutral-600 rounded-full px-2 py-0.5 select-none flex gap-1"
        >
            <Image src={icon} alt={alt} width="20" height="20" />
            {name}
        </div>
    );
};