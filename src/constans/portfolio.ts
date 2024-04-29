import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { stackList, SkillItem } from "./skills";
import personalWebsite from "public/images/portfolio/personal-website.jpg";
import ipac from "public/images/portfolio/3ipac.jpg";
import quoteGenerator from "public/images/portfolio/quote-generator.jpg";
import pomodoroTimer from "public/images/portfolio/pomodoro-timer.jpg";
import markdownPreviewer from "public/images/portfolio/markdown-previewer.jpg";
import calculator from "public/images/portfolio/calculator.jpg";
import drumMachine from "public/images/portfolio/drum-machine.jpg";
import tixid from "public/images/portfolio/tix-id.jpg";
import twitterClone from "public/images/portfolio/twitter-clone.jpg";
import trafficSignDetection from "public/images/portfolio/traffic-sign-detection.jpg";
import documentationPage from "public/images/portfolio/documentation-page.jpg";
import productLanding from "public/images/portfolio/product-landing.jpg";
import sentimentAnalysis from "public/images/portfolio/sentimen-analysis.jpg";
import surveyForm from "public/images/portfolio/survey-form.jpg";
import tributePage from "public/images/portfolio/tribute-page.jpg";
import findYourLove from "public/images/portfolio/find-your-love.jpg";
import cariQuy from "public/images/portfolio/cari-aja-quy.jpg";
import dengerin from "public/images/portfolio/dengerin-music-discovery.jpg";
import cariHati from "public/images/portfolio/cari-hati.jpg"
import { filesHostName } from "./general";


export interface PortfolioItem {
    title: string;
    tumbnail: StaticImport;
    stacks: SkillItem[] | undefined;
    description: string;
    url: string;
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
    {   title: "Cari Hati Dating App",
        tumbnail: cariHati,
        stacks: getSkillItems(["Nest JS", "Next JS", "PostgreSQL", "MongoDB", "Redis", "Nginx"]),
        description: "Cari Hati, like Tinder, used PostgreSQL, MongoDB, and Redis databases to boost efficiency, while Xendit ensured smooth transactions and K-Means enabled precise matchmaking.",
        url: "https://github.com/glennprays/cari-hati-server",
    },
    {   title: "Dengerin Music Discovery",
        tumbnail: dengerin,
        stacks: getSkillItems(["Flask", "Next JS", "Nginx"]),
        description: "Introducing a  Music Discovery Web Application (API and user-friendly interface). The platform is enhanced with Google API integration for song detection.",
        url: "https://github.com/glennprays/music-discovery-server",
    },
    {   title: "Cari Quy Search Engine",
        tumbnail: cariQuy,
        stacks: getSkillItems(["Flask", "Next JS", "Nginx"]),
        description: "Cari Quy is a search engine that utilizes TF-IDF and Cosine Similarity methods for information retrieval.",
        url: "https://github.com/glennprays/search-engine-server",
    },
    {   title: "Find Your Love AI",
        tumbnail: findYourLove,
        stacks: getSkillItems(["Python"]),
        description: "This is a python game using pygame library. Implementing Breadth First Search (BFS), Depth First Search (DFS), and Uniform Cost Search (UCS) algorithm.",
        url: "https://github.com/glennprays/find-your-love",
    },
     
    {
        title: "Personal Website",
        tumbnail: personalWebsite,
        stacks: getSkillItems(["Next JS", "Typescript", "Tailwind", "Framer", "Contentlayer"]),
        description: "This is my personal website",
        url: "https://github.com/glennprays/glennprays.com",
    },
    {
        title: "3rd IPAC 2023",
        tumbnail: ipac,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap", "Vite"]),
        description:
            "As a Frontend Web Developer, I have contributed my expertise to the development web applications tailored for registration, operational management, and service provisioning during the 3rd Indonesia Pathfinder Camporee in 2023. My role encompassed the creation of dynamic and user-centric interfaces, ensuring seamless navigation and optimal user experiences for attendees and stakeholders alike.",
        url: filesHostName + "/portfolio-3ipac.pdf",
    },
    {
        title: "Movie Ticketin API",
        tumbnail: tixid,
        stacks: getSkillItems(["Golang", "MySQL"]),
        description:
            "This project aims to develop an application similar to TIX-ID, a well-established platform for booking tickets online. The program uses go-gin as the framework, MySQL as the database.",
        url: "https://github.com/glennprays/tix-id",
    },
    {
        title: "Twitter Clone API",
        tumbnail: twitterClone,
        stacks: getSkillItems(["Golang", "Neo4j"]),
        description:
            "This project just a simple implementation of a social media platform similar to Twitter. The program uses go-gin as the framework, neo4j as the No-SQL Database (Graph Database)",
        url: "https://github.com/glennprays/twitter-clone-api",
    },
    {
        title: "Traffic Sign Detection",
        tumbnail: trafficSignDetection,
        stacks: getSkillItems(["Python"]),
        description:
            "This project presents an approach for detecting traffic signs in the unique context of Indonesia's road environment. Leveraging advanced image processing techniques, specifically the Hue-Saturation-Value (HSV) color space and morphological operations.",
        url: "https://github.com/glennprays/traffic-sign-detection",
    },
    {
        title: "Sentiment Analysis",
        tumbnail: sentimentAnalysis,
        stacks: getSkillItems(["Python"]),
        description:
            "This project presents a sophisticated sentiment analysis implementation utilizing Convolutional Neural Networks (CNN) to analyze and classify sentiments expressed in US airlines' Twitter data. The objective is to harness the power of deep learning techniques to categorize tweets as positive, negative, or neutral sentiments, thereby gaining valuable insights into customer opinions and experiences.",
        url: "https://github.com/glennprays/CNN-Sentiment-Analysis",
    },
    {
        title: "Quote Generator",
        tumbnail: quoteGenerator,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            'This project entails the creation of a "Random Quote Generator" utilizing an array of quotes. With each interaction, the application will present a randomly selected quote from the array to users',
        url: "https://codepen.io/glennpray/pen/oNJNZRv",
    },
    {
        title: "Pomodoro Timer",
        tumbnail: pomodoroTimer,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            'This timer application is designed based on the Pomodoro technique, offering two distinct timer modes: "Session" and "Break". The default duration for a session is set to 25 minutes, while the break interval is set to 5 minutes. However, users have the flexibility to customize these durations according to their preferences.',
        url: "https://codepen.io/glennpray/pen/oNJNZRv",
    },
    {
        title: "Markdown Previewer",
        tumbnail: markdownPreviewer,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            "This project serves the purpose of providing a interface for both previewing and editing Markdown text. It empowers users to create, modify, and visualize Markdown documents with ease.",
        url: "https://codepen.io/glennpray/pen/YzdXZLd",
    },
    {
        title: "Calculator",
        tumbnail: calculator,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            "This project a calculator application developed using the ReactJS. The primary objective behind this endeavor is to provide users with a feature-rich, dynamic, and visually appealing tool for performing calculations.",
        url: "https://codepen.io/glennpray/pen/ZEVGjqE",
    },
    {
        title: "Drum Machine",
        tumbnail: drumMachine,
        stacks: getSkillItems(["React JS", "Javascript", "Bootstrap"]),
        description:
            "This project implementation of a drum application, designed to with the added versatility of two distinct sound groups.",
        url: "https://codepen.io/glennpray/pen/mdaJwWM",
    },
    {
        title: "Documentation Page",
        tumbnail: documentationPage,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "Simple implementation of technical documentation page.",
        url: "https://codepen.io/glennpray/pen/WNZOaYR",
    },
    {
        title: "Product Landing",
        tumbnail: productLanding,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "This is a simple implementation of Shoes Product landing page.",
        url: "https://codepen.io/glennpray/pen/qBPrQWd",
    },
    {
        title: "Survey Form",
        tumbnail: surveyForm,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "This is a simple Survey Form aplication.",
        url: "https://codepen.io/glennpray/pen/KKXNRpa",
    },
    {
        title: "Tribute Page",
        tumbnail: tributePage,
        stacks: getSkillItems(["HTML", "CSS"]),
        description:
            "Simple webpage of Artist Tribute Page.",
        url: "https://codepen.io/glennpray/pen/eYGZrrq",
    },
];
