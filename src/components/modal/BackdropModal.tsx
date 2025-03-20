import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

export default function BackdropModal({
    children,
    open,
    setOpen,
    closeButton,
    backdropActive,
}: {
    children: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
    closeButton: boolean;
    backdropActive: boolean;
}) {
    const childRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                childRef.current &&
                !childRef.current.contains(event.target as Node)
            ) {
                handleCloseModal();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (open) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [open]);

    function handleCloseModal() {
        setOpen(false);
    }
    return (
        <div
            className={`w-full h-screen fixed top-0 left-0 z-[100] bg-neutral-400/[0.7] dark:bg-black/[0.75] flex justify-center items-center ${open ? "visible" : "invisible"
                }`}
        >
            <div
                ref={childRef}
                className="py-4 px-4 max-h-[calc(100vh-100px)] max-w-full rounded-xl bg-neutral-200 dark:bg-neutral-900 flex flex-col items-center justify-start gap-3 text-black dark:text-white shadow-xl dark:shadow-md dark:shadow-neutral-950"
            >
                <header className="w-full flex justify-end">
                    {closeButton ? (
                        <span
                            className="text-[25px] p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-600 hover:bg-neutral-300 hover:dark:bg-neutral-950"
                            onClick={handleCloseModal}
                        >
                            <IoClose />
                        </span>
                    ) : null}
                </header>
                <section className="min-w-[200px]">{children}</section>
            </div>
        </div>
    );
}