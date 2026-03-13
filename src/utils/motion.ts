class Motion {
    slideIn(direction: string, type: string, delay: number, duration: number) {
        return {
            hidden: {
                x:
                    direction === "right"
                        ? "200%"
                        : direction === "left"
                        ? "-200%"
                        : 0,
                y:
                    direction === "up"
                        ? "200%"
                        : direction === "down"
                        ? "-200%"
                        : 0,
            },
            show: {
                x: 0,
                y: 0,
                transition: {
                    type,
                    delay,
                    duration,
                    ease: "easeOut",
                },
            },
        };
    }

    fadeIn(direction: string, type: string, delay: number, duration: number) {
        return {
            hidden: {
                x:
                    direction === "left"
                        ? 100
                        : direction === "right"
                        ? -100
                        : 0,
                y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
                opacity: 0,
            },
            show: {
                x: 0,
                y: 0,
                opacity: 1,
                transition: {
                    type,
                    delay,
                    duration,
                    ease: "easeOut",
                },
            },
        };
    }

    textVariants(delay: number) {
        return {
            hidden: {
                y: 50,
                opacity: 0,
            },
            show: {
                y: 0,
                opacity: 1,
                transition: {
                    type: "spring",
                    duration: 1.25,
                    delay,
                },
            },
        };
    }

    fadeUp(delay: number = 0, duration: number = 0.5) {
        return {
            hidden: {
                y: 30,
                opacity: 0,
            },
            show: {
                y: 0,
                opacity: 1,
                transition: {
                    type: "tween",
                    delay,
                    duration,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            },
        };
    }

    staggerContainer(staggerChildren: number = 0.1, delayChildren: number = 0) {
        return {
            hidden: { opacity: 0 },
            show: {
                opacity: 1,
                transition: {
                    staggerChildren,
                    delayChildren,
                },
            },
        };
    }

    scaleIn(delay: number = 0, duration: number = 0.3) {
        return {
            hidden: {
                scale: 0.95,
                opacity: 0,
            },
            show: {
                scale: 1,
                opacity: 1,
                transition: {
                    type: "tween",
                    delay,
                    duration,
                    ease: [0.25, 0.1, 0.25, 1],
                },
            },
        };
    }
}

export const Motions = new Motion();
