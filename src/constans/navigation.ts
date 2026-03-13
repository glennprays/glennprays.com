import Home from "@/app/(general)/page"

interface NavItem {
    name: string,
    href: string,
}

export const navItems : NavItem[] = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Skills",
        href: "/#skills"
    },
    {
        name: "Resume",
        href: "/#resume"
    },
    {
        name: "Portfolio",
        href: "/#portfolio"
    },
    {
        name: "Blog",
        href: "/#blog"
    },
    {
        name: "Contact",
        href: "/#contact"
    },
]

export const navItemsBlog : NavItem[] = [
    {
        name: "Home",
        href: "/"
    },
    {
        name: "Blog",
        href: "/blog"
    }
]