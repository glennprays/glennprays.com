import { IconType } from "react-icons";
import { FaLinkedin, FaGithub } from "react-icons/fa6";
import { MdMail } from "react-icons/md";

interface ContactItem {
    name: string;
    icon: IconType;
    username: string;
    url: string;
}

export const contactList: ContactItem[] = [
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        username: "linkedin.com/in/glennprays",
        url: "https://www.linkedin.com/in/glennprays/",
    },
    {
        name: "Email",
        icon: MdMail,
        username: "glennsagala@gmail.com",
        url: "mailto:glennsagala@gmail.com",
    },
    {
        name: "Github",
        icon: FaGithub,
        username: "github.com/glennprays",
        url: "https://github.com/glennprays",
    },
];
