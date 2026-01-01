import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { stackList, SkillItem } from "./skills";
import personalWebsite from "public/images/portfolio/personal-website.jpg";
import ipac from "public/images/portfolio/3ipac.jpg";
import tixid from "public/images/portfolio/tix-id.jpg";
import twitterClone from "public/images/portfolio/twitter-clone.jpg";
import trafficSignDetection from "public/images/portfolio/traffic-sign-detection.jpg";
import sentimentAnalysis from "public/images/portfolio/sentimen-analysis.jpg";
import findYourLove from "public/images/portfolio/find-your-love.jpg";
import cariQuy from "public/images/portfolio/cari-aja-quy.jpg";
import dengerin from "public/images/portfolio/dengerin-music-discovery.jpg";
import cariHati from "public/images/portfolio/cari-hati.jpg"
import dbEaseBackup from "public/images/portfolio/dbeasebackup.jpg"
import theGifts from "public/images/portfolio/the-gifts.jpg"
import whatsappGateway from "public/images/portfolio/whatsapp-gateway.jpg"
import { filesHostName } from "./general";


export interface PortfolioItem {
    title: string;
    tumbnail: StaticImport;
    stacks: SkillItem[] | undefined;
    description: string;
    resourceUrl?: string;
    moreUrl?: string;
}

function getSkillItems(skillList: string[]): SkillItem[] {
    const data = stackList;

    const skillItems: SkillItem[] = skillList.flatMap((skillName, index) => {
        const foundSkill = data.find(
            (skill) =>
                skill.name.toLocaleLowerCase() === skillName.toLocaleLowerCase()
        );
        return foundSkill ? [foundSkill] : [];
    });

    return skillItems;
}

export const portfolioItems: PortfolioItem[] = [
    {
        title: "WhatsApp Gateway",
        tumbnail: whatsappGateway,
        stacks: getSkillItems(["Golang", "PostgreSQL"]),
        description: "WhatsApp Gateway is a modern messaging infrastructure service that centralizes WhatsApp state management, simplifies integration through REST APIs and webhooks, and enables scalable, secure, multi-device communication so backend systems can stay stateless and focused purely on business logic.",
        resourceUrl: "https://github.com/glennprays/whatsapp-gateway"
    },
    {
        title: "The Gifts",
        tumbnail: theGifts,
        stacks: getSkillItems(["Svelte", "PostgreSQL"]),
        description: "TheGifts is a web platform focused on guided self-discovery. It combines simple assessments and learning content to help users better understand their strengths, grow intentionally, and connect their abilities with meaningful opportunities to serve others.",
        resourceUrl: "https://github.com/glennprays/thegifts"
    },
    {
        title: "DBEase Backup",
        tumbnail: dbEaseBackup,
        stacks: getSkillItems(["Golang"]),
        description: "DBEaseBackup is a Go-powered tool that automates secure database backups, enabling scheduled storage to ensure your data is consistently protected and easily accessible when needed.",
        resourceUrl: "https://github.com/glennprays/dbeasebackup"
    },
    {
        title: "Cari Hati Dating App",
        tumbnail: cariHati,
        stacks: getSkillItems(["Nest JS", "Next JS", "PostgreSQL", "MongoDB", "Redis", "Nginx"]),
        description: "Cari Hati, a dating app, used PostgreSQL, MongoDB, and Redis databases to boost efficiency, while Xendit ensured smooth transactions and K-Means enabled precise matchmaking.",
        resourceUrl: "https://github.com/glennprays/cari-hati-server",
        moreUrl: filesHostName + "/portfolio/portfolio-cari-hati.pdf",
    },
    {
        title: "Dengerin Music Discovery",
        tumbnail: dengerin,
        stacks: getSkillItems(["Flask", "Next JS", "Nginx"]),
        description: "Introducing a  Music Discovery Web Application (API and user-friendly interface). The platform is enhanced with Google API integration for song detection.",
        resourceUrl: "https://github.com/glennprays/music-discovery-server",
        moreUrl: filesHostName + "/portfolio/portfolio-dengerin-music-discovery.pdf",
    },
    {
        title: "Cari Quy Search Engine",
        tumbnail: cariQuy,
        stacks: getSkillItems(["Flask", "Next JS", "Nginx"]),
        description: "Cari Quy is a search engine that utilizes TF-IDF and Cosine Similarity methods for information retrieval.",
        resourceUrl: "https://github.com/glennprays/search-engine-server",
        moreUrl: filesHostName + "/portfolio/portfolio-cari-aja-quy.pdf",
    },
    {
        title: "Find Your Love AI",
        tumbnail: findYourLove,
        stacks: getSkillItems(["Python"]),
        description: "This is a python game using pygame library. Implementing Breadth First Search (BFS), Depth First Search (DFS), and Uniform Cost Search (UCS) algorithm.",
        resourceUrl: "https://github.com/glennprays/find-your-love",
    },

    {
        title: "Personal Website",
        tumbnail: personalWebsite,
        stacks: getSkillItems(["Next JS", "Typescript", "Tailwind", "Framer", "Contentlayer"]),
        description: "This is my personal website",
        resourceUrl: "https://github.com/glennprays/glennprays.com",
    },
    {
        title: "3rd IPAC 2023",
        tumbnail: ipac,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap", "Vite"]),
        description:
            "As a Frontend Web Developer, I have contributed my expertise to the development web applications tailored for registration, operational management, and service provisioning during the 3rd Indonesia Pathfinder Camporee in 2023. My role encompassed the creation of dynamic and user-centric interfaces, ensuring seamless navigation and optimal user experiences for attendees and stakeholders alike.",
        moreUrl: filesHostName + "/portfolio/portfolio-3ipac.pdf",
    },
    {
        title: "Movie Ticketin API",
        tumbnail: tixid,
        stacks: getSkillItems(["Golang", "MySQL"]),
        description:
            "This project aims to develop an application similar to TIX-ID, a well-established platform for booking tickets online. The program uses go-gin as the framework, MySQL as the database.",
        resourceUrl: "https://github.com/glennprays/tix-id",
    },
    {
        title: "Twitter Clone API",
        tumbnail: twitterClone,
        stacks: getSkillItems(["Golang", "Neo4j"]),
        description:
            "This project just a simple implementation of a social media platform similar to Twitter. The program uses go-gin as the framework, neo4j as the No-SQL Database (Graph Database)",
        resourceUrl: "https://github.com/glennprays/twitter-clone-api",
    },
    {
        title: "Traffic Sign Detection",
        tumbnail: trafficSignDetection,
        stacks: getSkillItems(["Python"]),
        description:
            "This project presents an approach for detecting traffic signs in the unique context of Indonesia's road environment. Leveraging advanced image processing techniques, specifically the Hue-Saturation-Value (HSV) color space and morphological operations.",
        resourceUrl: "https://github.com/glennprays/traffic-sign-detection",
    },
    {
        title: "Sentiment Analysis",
        tumbnail: sentimentAnalysis,
        stacks: getSkillItems(["Python"]),
        description:
            "This project presents a sophisticated sentiment analysis implementation utilizing Convolutional Neural Networks (CNN) to analyze and classify sentiments expressed in US airlines' Twitter data. The objective is to harness the power of deep learning techniques to categorize tweets as positive, negative, or neutral sentiments, thereby gaining valuable insights into customer opinions and experiences.",
        resourceUrl: "https://github.com/glennprays/CNN-Sentiment-Analysis",
    },
];